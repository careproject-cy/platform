import type { MetadataRoute } from 'next'
import { platform_name } from '@/app/data/consts'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${platform_name} – Dog Rescue & Adoption in Cyprus`,
    short_name: platform_name,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#166534',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
