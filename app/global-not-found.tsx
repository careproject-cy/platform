import type { Metadata } from 'next'
import Link from 'next/link'
import './(frontend)/globals.css'
import { platform_name } from '@/app/data/consts'

// With two root layouts there is no root not-found to build /_not-found from, so Next would
// otherwise serve its unstyled default. This renders its own document by design.
export const metadata: Metadata = {
  title: `404 - Page Not Found | ${platform_name}`,
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
          <p className="text-lg text-gray-500">Oops! The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-5 py-2.5 font-semibold hover:bg-gray-50"
          >
            Open home page
          </Link>
        </main>
      </body>
    </html>
  )
}
