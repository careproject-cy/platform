import type { CollectionConfig } from 'payload'

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
    mimeTypes: ['image/*'],
    focalPoint: true,
    crop: true,
    // Naming a size here yields a relative /api/media/file/... URL, which 500s because
    // disablePayloadAccessControl means no local file is ever written. Return the CDN URL instead.
    adminThumbnail: ({ doc }) => {
      const sizes = doc?.sizes as { thumbnail?: { url?: string | null } } | undefined
      return sizes?.thumbnail?.url || (doc?.url as string | undefined) || null
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 768, height: 576 },
      { name: 'gallery', width: 1200, height: undefined },
      { name: 'hero', width: 1920, height: undefined },
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
