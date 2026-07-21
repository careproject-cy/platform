import type { Access, CollectionConfig, FieldAccess } from 'payload'

/** Roles are read defensively so these stay valid before payload-types is regenerated. */
const hasAdminRole = (user: unknown): boolean => {
  const roles = (user as { roles?: unknown } | null | undefined)?.roles
  return Array.isArray(roles) && roles.includes('admin')
}

const isAdmin: Access = ({ req: { user } }) => hasAdminRole(user)
const isAdminField: FieldAccess = ({ req: { user } }) => hasAdminRole(user)

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    // Editors need the panel to manage dogs and posts; only admins manage accounts.
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => (hasAdminRole(user) ? true : { id: { equals: user?.id } }),
    create: isAdmin,
    delete: isAdmin,
    update: ({ req: { user }, id }) => (hasAdminRole(user) ? true : user?.id === id),
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Admin',
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation !== 'create') return data
        // The very first account (fork setup) must be an admin, or nobody can grant the role.
        const { totalDocs } = await req.payload.find({
          collection: 'users',
          limit: 1,
          depth: 0,
          overrideAccess: true,
        })
        return totalDocs === 0 ? { ...data, roles: ['admin'] } : data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      // Without field-level access an editor could grant themselves admin.
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: 'Admin (manages accounts)', value: 'admin' },
        { label: 'Editor (manages content)', value: 'editor' },
      ],
    },
  ],
}
