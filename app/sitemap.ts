import type { MetadataRoute } from 'next'
import { fetchDogs, fetchBlogposts } from './data/fetchData'
import { domain } from './data/consts'

const baseUrl = `https://${domain}`

const staticPages = ['about', 'adopt', 'donate', 'foster', 'get-involved']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dogs, blogPosts] = await Promise.all([fetchDogs(), fetchBlogposts()])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...staticPages.map((page) => ({
      url: `${baseUrl}/more/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const dogRoutes: MetadataRoute.Sitemap = dogs.map((dog) => ({
    url: `${baseUrl}/dogs/${dog.location}/${dog.filename.replace('.md', '')}`,
    lastModified: new Date(dog.added),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const ADOPTED_PAGE_SIZE = 12
  const adoptedCount = dogs.filter((dog) => dog.status === 'Adopted').length
  const adoptedPageCount = Math.max(1, Math.ceil(adoptedCount / ADOPTED_PAGE_SIZE))
  const adoptedRoutes: MetadataRoute.Sitemap = Array.from(
    { length: adoptedPageCount },
    (_, i) => ({
      url: `${baseUrl}/adopted/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  )

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.visible)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.filename.replace('.md', '')}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...adoptedRoutes, ...dogRoutes, ...blogRoutes]
}
