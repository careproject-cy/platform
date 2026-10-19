import type { MetadataRoute } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { fetchDogs, fetchBlogposts } from '@/app/data/fetchData'
import { domain, ADOPTED_PAGE_SIZE, morePages } from '@/app/data/consts'
import { getImageSrc } from '@/app/utils/images'

const baseUrl = `https://${domain}`

function newest(dates: Date[]): Date | undefined {
  return dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined
}

// A Markdown page changes when its file does; on Vercel the mtime is the deploy that shipped it.
async function fileModified(page: string): Promise<Date | undefined> {
  try {
    return (await fs.stat(path.join(process.cwd(), 'data/pages', `${page}.md`))).mtime
  } catch {
    return undefined
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allDogs, blogPosts] = await Promise.all([fetchDogs(), fetchBlogposts()])
  // "Not available" dogs are hidden from every listing and noindexed, so leave them out here too.
  const dogs = allDogs.filter((dog) => dog.status !== 'Not available')
  const adopted = dogs.filter((dog) => dog.status === 'Adopted')
  const visiblePosts = blogPosts.filter((post) => post.visible)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: newest([...dogs.map((d) => d.updatedAt), ...visiblePosts.map((p) => p.updatedAt)]) },
    { url: `${baseUrl}/dogs`, lastModified: newest(dogs.filter((d) => d.status !== 'Adopted').map((d) => d.updatedAt)) },
    { url: `${baseUrl}/blog`, lastModified: newest(visiblePosts.map((p) => p.updatedAt)) },
    ...(await Promise.all(
      morePages.map(async (page) => ({ url: `${baseUrl}/more/${page}`, lastModified: await fileModified(page) })),
    )),
  ]

  const dogRoutes: MetadataRoute.Sitemap = dogs.map((dog) => ({
    url: `${baseUrl}/dogs/${dog.location}/${dog.filename.replace('.md', '')}`,
    lastModified: dog.updatedAt,
    images: dog.images.slice(0, 3).map((src) => getImageSrc(src)),
  }))

  const adoptedPageCount = Math.max(1, Math.ceil(adopted.length / ADOPTED_PAGE_SIZE))
  const adoptedRoutes: MetadataRoute.Sitemap = Array.from({ length: adoptedPageCount }, (_, i) => ({
    url: `${baseUrl}/adopted/${i + 1}`,
    lastModified: newest(adopted.slice(i * ADOPTED_PAGE_SIZE, (i + 1) * ADOPTED_PAGE_SIZE).map((d) => d.updatedAt)),
  }))

  const blogRoutes: MetadataRoute.Sitemap = visiblePosts.map((post) => ({
    url: `${baseUrl}/blog/${post.filename.replace('.md', '')}`,
    lastModified: post.updatedAt,
    images: post.imageSrc ? [getImageSrc(post.imageSrc)] : undefined,
  }))

  return [...staticRoutes, ...adoptedRoutes, ...dogRoutes, ...blogRoutes]
}
