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
    adminThumbnail: 'thumbnail',
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
