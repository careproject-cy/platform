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
          <h1 className="text-5xl font-semibold tracking-tight">This page wandered off</h1>
          <p className="text-lg text-[var(--muted)]">The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90"
          >
            Open home page
          </Link>
        </main>
      </body>
    </html>
  )
}
