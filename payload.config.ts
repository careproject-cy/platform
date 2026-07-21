import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Dogs } from './collections/Dogs'
import { Posts } from './collections/Posts'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { cloudfront_domain, platform_name } from './app/data/consts'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Without S3 credentials uploads fall back to local disk, so the app still boots in dev.
// Use || not ?? - these arrive as empty strings from .env files, which ?? would not replace.
const s3Enabled = Boolean(process.env.S3_BUCKET)
const mediaPrefix = process.env.S3_MEDIA_PREFIX || 'cms'
const publicBase = process.env.S3_PUBLIC_BASE_URL || `https://${cloudfront_domain}`

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ` - ${platform_name}` },
  },
  collections: [Dogs, Posts, Media, Users],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL ?? '' },
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  // The site reads content through the Local API; no public GraphQL surface needed.
  graphQL: { disable: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      collections: {
        media: {
          prefix: mediaPrefix,
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            [publicBase, prefix ?? mediaPrefix, filename].filter(Boolean).join('/'),
        },
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        region: process.env.S3_REGION ?? '',
      },
    }),
  ],
})
