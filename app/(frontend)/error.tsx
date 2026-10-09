'use client'

import { useEffect } from 'react'

// Catches render/data errors in the frontend group (e.g. a Neon cold-start timeout) so the site
// shows branded copy with a retry instead of Next's raw 500.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-28 text-center">
      <h1 className="font-serif text-6xl md:text-7xl leading-[0.95]">Something went wrong</h1>
      <p className="mt-6 text-lg text-[var(--muted)]">We could not load this page. Please try again in a moment.</p>
      <button onClick={reset} className="mt-8 rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Try again</button>
    </div>
  )
}
