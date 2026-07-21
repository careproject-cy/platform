import type { MetadataRoute } from 'next'
import { domain } from '@/app/data/consts'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `https://${domain}/sitemap.xml`,
    host: `https://${domain}`,
  }
}
