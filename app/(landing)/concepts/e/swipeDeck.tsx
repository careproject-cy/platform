"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

export default function SwipeDeck({ dogs }: { dogs: LandingDog[] }) {
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState<LandingDog[]>([])
  const [drag, setDrag] = useState({ x: 0, active: false })
  const [leaving, setLeaving] = useState<0 | 1 | -1>(0)
  const start = useRef(0)

  const current = dogs[index % dogs.length]
  const decide = (dir: 1 | -1) => {
    if (leaving) return
    setLeaving(dir)
    if (dir === 1 && !liked.some(d => d.href === current.href)) setLiked(l => [...l, current])
    setTimeout(() => { setIndex(i => i + 1); setLeaving(0); setDrag({ x: 0, active: false }) }, 260)
  }

  const x = leaving ? leaving * 640 : drag.x
  const stack = [0, 1, 2].map(o => dogs[(index + o) % dogs.length])

  return (
    <div className="w-full max-w-[380px] mx-auto">
      <div className="relative aspect-[3/4] select-none">
        {stack.slice().reverse().map((d, ri) => {
          const depth = stack.length - 1 - ri
          const top = depth === 0
          return (
            <div key={`${d.href}-${index + depth}`}
                 onPointerDown={top ? e => { start.current = e.clientX; setDrag({ x: 0, active: true }); e.currentTarget.setPointerCapture(e.pointerId) } : undefined}
                 onPointerMove={top ? e => drag.active && setDrag({ x: e.clientX - start.current, active: true }) : undefined}
                 onPointerUp={top ? () => (Math.abs(drag.x) > 110 ? decide(drag.x > 0 ? 1 : -1) : setDrag({ x: 0, active: false })) : undefined}
                 className={`absolute inset-0 rounded-[28px] overflow-hidden bg-[var(--line)] cp-shadow ${top ? "cursor-grab active:cursor-grabbing touch-pan-y" : ""}`}
                 style={{
                   transform: top ? `translateX(${x}px) rotate(${x / 18}deg)` : `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`,
                   transition: drag.active && !leaving ? "none" : "transform .3s cubic-bezier(.2,.8,.2,1)",
                   zIndex: 10 - depth,
                 }}>
              <Image src={d.img} alt={top ? d.name : ""} fill priority={depth === 0} sizes="380px" draggable={false} className="object-cover pointer-events-none"/>
              <div className="absolute inset-x-0 bottom-0 p-6 pt-24 bg-gradient-to-t from-black/75 to-transparent text-white">
                <div className="text-3xl font-semibold tracking-tight">{d.name}</div>
                <div className="text-sm text-white/80 capitalize mt-1">{d.gender} · {d.ageText} · {d.size}</div>
              </div>
              {top && (
                <>
                  <span className="absolute left-5 top-5 rounded-lg border-2 border-emerald-400 text-emerald-300 px-3 py-1 font-bold -rotate-12 transition-opacity" style={{ opacity: Math.max(0, x / 120) }}>SHORTLIST</span>
                  <span className="absolute right-5 top-5 rounded-lg border-2 border-white/80 text-white px-3 py-1 font-bold rotate-12 transition-opacity" style={{ opacity: Math.max(0, -x / 120) }}>NEXT</span>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={() => decide(-1)} aria-label={`Skip ${current.name}`} className="size-14 rounded-full border border-[var(--line)] bg-[var(--surface)] grid place-items-center text-xl hover:scale-105 transition-transform">✕</button>
        <Link href={current.href} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-medium">Read {current.name}&apos;s story</Link>
        <button onClick={() => decide(1)} aria-label={`Shortlist ${current.name}`} className="size-14 rounded-full bg-[var(--accent)] text-white grid place-items-center text-xl hover:scale-105 transition-transform">♥</button>
      </div>

      <div className="mt-8 min-h-16" aria-live="polite">
        {liked.length > 0 ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 flex items-center gap-3">
            <div className="flex -space-x-3">
              {liked.slice(-4).map(d => (
                <span key={d.href} className="relative size-10 rounded-full overflow-hidden ring-2 ring-[var(--surface)]"><Image src={d.img} alt={d.name} fill sizes="40px" className="object-cover"/></span>
              ))}
            </div>
            <span className="text-sm flex-1">Your shortlist: {liked.map(d => d.name).join(", ")}</span>
            <Link href="/more/adopt" className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm font-medium whitespace-nowrap">Ask about them</Link>
          </div>
        ) : (
          <p className="text-center text-sm text-[var(--muted)]">Drag the card or use the buttons. Dogs you like land in a shortlist here.</p>
        )}
      </div>
    </div>
  )
}
