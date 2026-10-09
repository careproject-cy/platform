import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-28 text-center">
      <p className="text-sm text-[var(--muted)]">404</p>
      <h1 className="mt-4 font-serif text-6xl md:text-7xl leading-[0.95]">This page wandered <em className="text-[var(--accent)]">off</em></h1>
      <p className="mt-6 text-lg text-[var(--muted)]">The page you are looking for does not exist.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Open home page</Link>
        <Link href="/dogs" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Meet the dogs</Link>
      </div>
    </div>
  )
}
