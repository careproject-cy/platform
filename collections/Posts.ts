import type { CollectionConfig } from 'payload'
import { revalidateSite } from './hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  access: {
    // The site queries through the Local API (overrideAccess), so this only constrains the
    // public REST API - without it, GET /api/posts serves hidden posts to anyone.
    read: ({ req: { user } }) => Boolean(user) || { visible: { equals: true } },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'visible'],
    group: 'Content',
  },
  versions: { drafts: false, maxPerDoc: 50 },
  hooks: {
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment, e.g. "2026-07-adoptions" for /blog/2026-07-adoptions.',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck to hide the post from the site.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on cards and in search results.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { description: 'e.g. adoption, dogs, fostering' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: { description: 'Post content in Markdown.', rows: 24 },
    },
  ],
}
