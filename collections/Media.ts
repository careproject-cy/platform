import { APIError, type CollectionConfig } from 'payload'
import { revalidateSite } from './hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    group: 'Content',
  },
  upload: {
    // Explicit raster list: 'image/*' would admit SVG, whose script-stripping check is bypassable.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    focalPoint: true,
    crop: true,
    // Naming a size here yields a relative /api/media/file/... URL, which 500s because
    // disablePayloadAccessControl means no local file is ever written. Return the CDN URL instead.
    adminThumbnail: ({ doc }) => {
      const sizes = doc?.sizes as { thumbnail?: { url?: string | null } } | undefined
      return sizes?.thumbnail?.url || (doc?.url as string | undefined) || null
    },
    // Caps the stored original; hero at 1920 is the largest size ever rendered.
    resizeOptions: { width: 2560, withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 768, height: 576 },
      { name: 'gallery', width: 1200, height: undefined },
      { name: 'hero', width: 1920, height: undefined },
    ],
  },
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        // The dogs_rels FK cascades, so deleting a photo in use would silently leave a dog
        // with no images and break every page that renders images[0].
        const [dogs, posts] = await Promise.all([
          req.payload.find({
            collection: 'dogs',
            where: { images: { equals: id } },
            limit: 5,
            depth: 0,
            overrideAccess: true,
          }),
          req.payload.find({
            collection: 'posts',
            where: { coverImage: { equals: id } },
            limit: 5,
            depth: 0,
            overrideAccess: true,
          }),
        ])
        const users = [...dogs.docs.map((d) => d.name), ...posts.docs.map((p) => p.title)]
        if (users.length) {
          throw new APIError(
            `This photo is still used by: ${users.join(', ')}. Remove it there before deleting.`,
            400,
          )
        }
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        await revalidateSite(req.context?.disableRevalidate)
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await revalidateSite(req.context?.disableRevalidate)
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Describe the photo for screen readers and SEO.' },
    },
  ],
}
