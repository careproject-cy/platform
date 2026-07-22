import type { CollectionConfig } from 'payload'
import { revalidateSite } from './hooks/revalidate'

export const Dogs: CollectionConfig = {
  slug: 'dogs',
  labels: { singular: 'Dog', plural: 'Dogs' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'status', 'size', 'added'],
    group: 'Content',
  },
  versions: { drafts: false, maxPerDoc: 50 },
  // /dogs/[location]/[slug] must resolve to exactly one dog - two Ginas and two Lunas already
  // exist in different locations, so uniqueness is on the pair, not the slug alone.
  indexes: [{ fields: ['slug', 'location'], unique: true }],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment, e.g. "luna" for /dogs/germasogeia/luna. Changing it breaks existing links.',
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'germasogeia',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Germasogeia', value: 'germasogeia' },
        { label: 'Mesageitonia', value: 'mesageitonia' },
        { label: 'Other', value: 'other' },
        { label: 'Adopted (archive)', value: 'adopted' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Available',
      admin: { position: 'sidebar' },
      options: ['Available', 'Reserved', 'In foster care', 'Not available', 'Adopted'].map((s) => ({
        label: s,
        value: s,
      })),
    },
    {
      name: 'added',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      type: 'row',
      fields: [
        { name: 'breed', type: 'text', required: true },
        {
          name: 'age',
          type: 'number',
          required: true,
          admin: { description: 'Age in years, e.g. 1.5. Used only when birth date is empty.' },
        },
      ],
    },
    {
      name: 'birthDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'Optional. If set, the shown age is calculated from this and stays current.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'gender',
          type: 'select',
          required: true,
          options: [
            { label: 'Female', value: 'female' },
            { label: 'Male', value: 'male' },
          ],
        },
        {
          name: 'size',
          type: 'select',
          required: true,
          options: [
            { label: 'Small (< 10 kg)', value: 'small' },
            { label: 'Medium (10-25 kg)', value: 'medium' },
            { label: 'Large (> 25 kg)', value: 'large' },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: { description: 'First photo is used as the card and social preview image.' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Dog description in Markdown. Blank line between paragraphs.',
        rows: 16,
      },
    },
  ],
}
