"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

function Wall({ dogs, labels = false }: { dogs: LandingDog[]; labels?: boolean }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 p-2">
      {dogs.map((d, i) => (
        <div key={`${d.href}-${i}`} className="relative aspect-[4/5] rounded-xl overflow-hidden">
          <Image src={d.img} alt="" fill sizes="(max-width: 768px) 25vw, 12vw" className="object-cover"/>
          {labels && <span className="absolute left-2 bottom-2 rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-white">{d.name}</span>}
        </div>
      ))}
    </div>
  )
}

export default function Spotlight({ dogs, available, adopted }: { dogs: LandingDog[]; available: number; adopted: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let idleSince = performance.now()
    const set = (x: number, y: number) => { el.style.setProperty("--x", `${x}px`); el.style.setProperty("--y", `${y}px`) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = el.getBoundingClientRect()
      set(e.clientX - r.left, e.clientY - r.top)
      idleSince = performance.now()
    }
    // Wanders on its own when nobody is pointing, so touch screens see it too.
    const tick = (t: number) => {
      if (t - idleSince > 2500) {
        const r = el.getBoundingClientRect()
        set(r.width * (0.5 + 0.38 * Math.sin(t / 2300)), r.height * (0.5 + 0.3 * Math.sin(t / 1700)))
      }
      raf = requestAnimationFrame(tick)
    }
    el.addEventListener("pointermove", onMove)
    raf = requestAnimationFrame(tick)
    return () => { el.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={ref} className="cp-spot relative overflow-hidden bg-[#08090b]" style={{ "--x": "50%", "--y": "45%" } as React.CSSProperties}>
      <div aria-hidden="true" className="grayscale brightness-[.28] contrast-125"><Wall dogs={dogs}/></div>
      <div aria-hidden="true" className="cp-spot-light absolute inset-0"><Wall dogs={dogs} labels/></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,9,11,.85)_100%)]"/>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1 className="text-white text-5xl md:text-[5.5rem] font-semibold tracking-[-0.05em] leading-[0.95] max-w-[14ch] [text-shadow:0_4px_40px_rgba(0,0,0,.6)]">
          In a shelter, they&apos;re easy to miss.
        </h1>
        <p className="mt-6 text-lg text-white/75 max-w-[44ch]">
          Move your cursor to meet them. {available} dogs are waiting in Cyprus, and {adopted} have already gone home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 pointer-events-auto">
          <Link href="/dogs" className="rounded-full bg-white text-black px-6 py-3 font-medium hover:opacity-90">See every dog</Link>
          <Link href="/more/donate" className="rounded-full border border-white/30 text-white px-6 py-3 font-medium hover:bg-white/10">Donate</Link>
        </div>
      </div>
    </div>
  )
}
