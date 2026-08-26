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
import { cloudfront_domain, domain, platform_name } from './app/data/consts'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Without S3 credentials uploads fall back to local disk, so the app still boots in dev.
// Use || not ?? - these arrive as empty strings from .env files, which ?? would not replace.
// pg already treats sslmode=require as verify-full but warns that pg v9 will loosen it.
// Stating verify-full keeps today's behaviour and silences the warning; Neon serves a valid cert.
const connectionString = (process.env.DATABASE_URL || '').replace(
  /([?&]sslmode=)(require|prefer|verify-ca)(?=&|$)/,
  '$1verify-full',
)

const s3Enabled = Boolean(process.env.S3_BUCKET)
const mediaPrefix = process.env.S3_MEDIA_PREFIX || 'cms'
const publicBase = process.env.S3_PUBLIC_BASE_URL || `https://${cloudfront_domain}`

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || `https://${domain}`

export default buildConfig({
  serverURL,
  // Without these, csrf is empty (cookie accepted from any Origin) and password-reset links
  // would be built from the attacker-controllable Host header.
  cors: [serverURL],
  csrf: [serverURL],
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ` - ${platform_name}` },
  },
  collections: [Dogs, Posts, Media, Users],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString },
    // Dev mode otherwise auto-pushes schema changes straight into whatever DATABASE_URL points at,
    // which here is production. Schema changes go through migrations only.
    push: false,
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  // The site reads content through the Local API; no public GraphQL surface needed.
  graphQL: { disable: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      // Browser PUTs straight to S3; Vercel caps a function request body at 4.5 MB.
      clientUploads: true,
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
