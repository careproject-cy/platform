"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

export default function ScrollStory({ dogs, total }: { dogs: LandingDog[]; total: number }) {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!desktop || calm) return
    setPinned(true)
    let raf = 0
    const measure = () => {
      const t = track.current
      if (t) setHeight(t.scrollWidth - window.innerWidth + window.innerHeight)
    }
    // Vertical scroll inside the tall wrapper drives the track sideways.
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const o = outer.current, t = track.current
        if (!o || !t) return
        const max = t.scrollWidth - window.innerWidth
        const p = Math.min(Math.max(-o.getBoundingClientRect().top / (o.offsetHeight - window.innerHeight), 0), 1)
        t.style.transform = `translate3d(${-p * max}px,0,0)`
      })
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("resize", measure); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf) }
  }, [])

  const panels = (
    <>
      <div className="shrink-0 w-[85vw] md:w-[46vw] h-full flex flex-col justify-center p-6 md:p-14 snap-start">
        <p className="text-sm text-[var(--muted)]">Scroll to meet them →</p>
        <h1 className="mt-4 text-5xl md:text-[5.5rem] font-semibold tracking-[-0.05em] leading-[0.92]">
          {total} dogs. {total} stories. One of them is yours.
        </h1>
        <p className="mt-6 text-lg text-[var(--muted)] max-w-[40ch]">Rescued from Cyprus shelters and streets, treated by our volunteers, and ready for a family.</p>
      </div>
      {dogs.map((d, i) => (
        <Link key={d.href} href={d.href} className="group shrink-0 relative w-[80vw] md:w-[38vw] h-full py-6 md:py-10 pr-4 md:pr-6 snap-start">
          <div className="relative h-full rounded-[28px] overflow-hidden">
            <Image src={d.img} alt={d.name} fill sizes="(max-width: 768px) 80vw, 38vw" priority={i < 2} className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
            <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium tabular-nums text-black">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <div className="absolute left-6 right-6 bottom-6 text-white">
              <div className="text-6xl md:text-7xl font-semibold tracking-[-0.05em] leading-none">{d.name}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[d.gender, d.ageText, d.size].map(t => <span key={t} className="rounded-full border border-white/40 px-3 py-1 capitalize backdrop-blur-sm">{t}</span>)}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className="shrink-0 w-[80vw] md:w-[36vw] h-full flex flex-col justify-center items-start p-6 md:p-14 snap-start">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1]">Didn&apos;t find yours yet?</h2>
        <p className="mt-4 text-[var(--muted)] max-w-[34ch]">See every profile, or tell us about your home and we&apos;ll suggest a dog.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-[var(--accent-ink)] px-6 py-3 font-medium">All {total} dogs</Link>
          <Link href="/more/adopt" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium">How to adopt</Link>
        </div>
      </div>
    </>
  )

  if (!pinned) {
    return <div className="flex h-[78vh] min-h-[520px] overflow-x-auto snap-x snap-mandatory">{panels}</div>
  }
  return (
    <div ref={outer} style={{ height: height || "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={track} className="flex h-full pt-16 will-change-transform">{panels}</div>
      </div>
    </div>
  )
}
