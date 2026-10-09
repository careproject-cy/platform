'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

const nav = [
  { href: "/dogs", text: "Dogs" },
  { href: "/more/adopt", text: "Adopt" },
  { href: "/more/foster", text: "Foster" },
  { href: "/blog", text: "Stories" },
  { href: "/more/about", text: "About" },
]

export default function Header() {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)

  // The header persists across navigations, so close the mobile menu on every route change.
  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl border-b border-[var(--line)]">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-[var(--accent)]">
          <Image src="/logo.svg" alt="" width={45} height={32} className="h-8 w-auto rounded-md"/>
          <span className="font-semibold tracking-tight text-[15px]">CARE Project</span>
        </Link>
        <nav aria-label="Main" className="hidden md:flex items-center gap-1 text-sm">
          {nav.map(n => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 transition-colors hover:text-[var(--ink)] hover:bg-[color-mix(in_oklab,var(--ink)_6%,transparent)] ${isActive(n.href) ? "text-[var(--ink)] font-medium" : "text-[var(--muted)]"}`}>
              {n.text}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/more/get-involved" className="hidden sm:inline-flex rounded-full px-3.5 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--ink)]">Volunteer</Link>
          <Link href="/more/donate" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true"><path d="M8 14.5s-6-3.6-6-8A3.5 3.5 0 0 1 8 4a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z"/></svg>
            Donate
          </Link>
          <details ref={menu} className="md:hidden relative">
            <summary aria-label="Open menu" className="list-none size-9 grid place-items-center rounded-full border border-[var(--line)] cursor-pointer">
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 4.5h12M2 8h12M2 11.5h12"/></svg>
            </summary>
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-1.5 shadow-xl">
              {[{ href: "/", text: "Home" }, ...nav, { href: "/more/get-involved", text: "Volunteer" }].map(n => (
                <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-[color-mix(in_oklab,var(--ink)_6%,transparent)]">{n.text}</Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
