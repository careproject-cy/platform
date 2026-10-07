"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

export default function Strips({ dogs }: { dogs: LandingDog[] }) {
  const [open, setOpen] = useState(0)
  const [paused, setPaused] = useState(false)

  // Cycles through the dogs until someone points at one.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setOpen(o => (o + 1) % dogs.length), 3200)
    return () => clearInterval(t)
  }, [paused, dogs.length])

  return (
    <div className="flex flex-col md:flex-row gap-2 h-[720px] md:h-[560px]" onMouseLeave={() => setPaused(false)}>
      {dogs.map((d, i) => {
        const active = i === open
        return (
          <Link key={d.href} href={d.href}
                onMouseEnter={() => { setOpen(i); setPaused(true) }} onFocus={() => { setOpen(i); setPaused(true) }}
                className="group relative overflow-hidden rounded-[22px] min-h-0 min-w-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{ flexGrow: active ? 6 : 1, flexBasis: 0 }}>
            <Image src={d.img} alt={d.name} fill sizes="(max-width: 768px) 100vw, 50vw" priority={i < 3} className="object-cover"/>
            <div className={`absolute inset-0 transition-colors duration-500 ${active ? "bg-gradient-to-t from-black/75 via-black/10 to-transparent" : "bg-black/35"}`}/>
            <span className={`hidden md:block absolute left-1/2 bottom-6 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap text-white font-medium transition-opacity ${active ? "opacity-0" : "opacity-100"}`}>{d.name}</span>
            <div className={`absolute left-6 right-6 bottom-6 text-white transition-all duration-500 ${active ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"}`}>
              <div className="text-sm text-white/75 capitalize">{d.gender} · {d.ageText} · {d.size}</div>
              <div className="flex items-end justify-between gap-4 mt-1">
                <span className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] leading-none">{d.name}</span>
                <span className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium whitespace-nowrap">Meet {d.name}</span>
              </div>
            </div>
            {active && !paused && <span className="absolute left-0 top-0 h-1 bg-white/80 cp-progress"/>}
          </Link>
        )
      })}
    </div>
  )
}
