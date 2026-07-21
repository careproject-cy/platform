/**
 * One-off migration: reads the Markdown in data/dogs and data/blog and creates the
 * matching Payload documents, uploading each referenced image into the media collection.
 * Idempotent - existing slugs are skipped, so it is safe to re-run.
 *
 * Run with: npm run import-content
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { getPayload } from 'payload'
import config from '../payload.config'
import { cloudfront_domain } from '../app/data/consts'

// The npm script preloads .env and .env.local via node --env-file-if-exists, because payload.config
// reads process.env when it is first imported - loading env from inside this file would be too late.
if (!process.env.S3_BUCKET) {
  console.error(
    'S3_BUCKET is not set. Uploads would be silently skipped and every image would 404.\n' +
      'Set the S3_* variables in .env or .env.local before importing.',
  )
  process.exit(1)
}

type Payload = Awaited<ReturnType<typeof getPayload>>
type Frontmatter = Record<string, unknown>

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Must be a fresh object per operation: the cloud-storage plugin mutates the context it is given
// and sets skipCloudStorage on it, so a shared object silently skips every upload after the first.
const importContext = () => ({ disableRevalidate: true })

const DOG_STATUSES = ['Available', 'Reserved', 'In foster care', 'Not available', 'Adopted'] as const
const DOG_SIZES = ['small', 'medium', 'large'] as const
const DOG_LOCATIONS = ['germasogeia', 'mesageitonia', 'other', 'adopted'] as const
const DOG_GENDERS = ['female', 'male'] as const

/** Remote URL for a stored image path, matching the site's getImageSrc(). */
const toUrl = (src: string) =>
  src.startsWith('http') ? src : `https://${cloudfront_domain}/${src.replace(/^\/+/, '')}`

const mediaCache = new Map<string, number>()

async function uploadImage(payload: Payload, src: string, alt: string): Promise<number | null> {
  const url = toUrl(src)
  const cached = mediaCache.get(url)
  if (cached !== undefined) return cached

  const response = await fetch(url)
  if (!response.ok) {
    console.warn(`    ! image unavailable (${response.status}): ${url}`)
    return null
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: response.headers.get('content-type') ?? 'image/jpeg',
      name: decodeURIComponent(url.split('/').pop() || 'image.jpg'),
      size: buffer.length,
    },
    overrideAccess: true,
    context: importContext(),
  })

  mediaCache.set(url, doc.id)
  return doc.id
}

function pickOption<T extends readonly string[]>(
  value: unknown,
  allowed: T,
  fallback: T[number],
  label: string,
): T[number] {
  const found = allowed.find((option) => option === String(value ?? '').trim())
  if (!found) console.warn(`    ! unexpected ${label} "${String(value)}", using "${fallback}"`)
  return found ?? fallback
}

/** Dog slugs are only unique within a location - /dogs/adopted/luna and /dogs/germasogeia/luna are different dogs. */
async function alreadyExists(
  payload: Payload,
  collection: 'dogs' | 'posts',
  slug: string,
  location?: string,
) {
  const { docs } = await payload.find({
    collection,
    where: location
      ? { and: [{ slug: { equals: slug } }, { location: { equals: location } }] }
      : { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })
  return docs.length > 0
}

async function importDogs(payload: Payload) {
  const dogsDir = path.join(root, 'data', 'dogs')
  const entries = (await fs.readdir(dogsDir, { recursive: true })) as string[]
  const files = entries.filter((entry) => entry.endsWith('.md'))
  console.log(`\nDogs: ${files.length} markdown files`)

  for (const file of files) {
    const filePath = path.join(dogsDir, file)
    const slug = path.basename(file, '.md')
    const location = pickOption(
      path.basename(path.dirname(filePath)),
      DOG_LOCATIONS,
      'other',
      'location',
    )

    if (await alreadyExists(payload, 'dogs', slug, location)) {
      console.log(`  = ${location}/${slug} (exists, skipped)`)
      continue
    }

    const { data, content } = matter(await fs.readFile(filePath, 'utf-8'))
    const fm = data as Frontmatter
    const name = String(fm.name ?? slug)
    console.log(`  + ${slug}`)

    const sources = Array.isArray(fm.images) ? (fm.images as string[]) : []
    const uploaded: number[] = []
    for (const src of sources) {
      const id = await uploadImage(payload, src, `${name} the rescue dog`)
      if (id !== null) uploaded.push(id)
    }
    if (uploaded.length === 0) {
      console.warn(`    ! no usable images, skipping ${slug}`)
      continue
    }

    await payload.create({
      collection: 'dogs',
      data: {
        name,
        slug,
        location,
        breed: String(fm.breed ?? 'Mixed breed'),
        age: Number(fm.age ?? 0),
        gender: pickOption(fm.gender, DOG_GENDERS, 'female', 'gender'),
        status: pickOption(fm.status, DOG_STATUSES, 'Available', 'status'),
        size: pickOption(fm.size, DOG_SIZES, 'medium', 'size'),
        added: new Date(String(fm.added ?? Date.now())).toISOString(),
        images: uploaded,
        body: content.trim(),
      },
      overrideAccess: true,
      context: importContext(),
    })
  }
}

async function importPosts(payload: Payload) {
  const blogDir = path.join(root, 'data', 'blog')
  const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith('.md'))
  console.log(`\nBlog posts: ${files.length} markdown files`)

  for (const file of files) {
    const slug = path.basename(file, '.md')

    if (await alreadyExists(payload, 'posts', slug)) {
      console.log(`  = ${slug} (exists, skipped)`)
      continue
    }

    const { data, content } = matter(await fs.readFile(path.join(blogDir, file), 'utf-8'))
    const fm = data as Frontmatter
    const title = String(fm.title ?? slug)
    console.log(`  + ${slug}`)

    const coverImage = fm.imageSrc ? await uploadImage(payload, String(fm.imageSrc), title) : null
    if (coverImage === null) {
      console.warn(`    ! no usable cover image, skipping ${slug}`)
      continue
    }

    await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        date: new Date(String(fm.date ?? Date.now())).toISOString(),
        description: String(fm.description ?? ''),
        coverImage,
        tags: Array.isArray(fm.tags) ? (fm.tags as string[]).map(String) : [],
        visible: fm.visible !== false,
        body: content.trim(),
      },
      overrideAccess: true,
      context: importContext(),
    })
  }
}

const payload = await getPayload({ config })
await importDogs(payload)
await importPosts(payload)
console.log('\nImport complete.')
process.exit(0)
