import type { MetadataRoute } from 'next'
import { domain } from './data/consts'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${domain}/sitemap.xml`,
    host: `https://${domain}`,
  }
}
