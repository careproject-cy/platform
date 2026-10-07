"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { LandingDog } from "../_shared/data"

export default function NameList({ dogs }: { dogs: LandingDog[] }) {
  const [active, setActive] = useState<LandingDog | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <div className="relative" onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setActive(null)}>
      <ul className="border-t border-[#10221C]">
        {dogs.map((d, i) => (
          <li key={d.href} className="border-b border-[#10221C]">
            <Link href={d.href} onMouseEnter={() => setActive(d)} onFocus={() => setActive(d)}
                  className="group flex items-center gap-6 py-3 md:py-4 focus-visible:outline-2 focus-visible:outline-[#B4642D]">
              <span className="w-8 text-sm text-[#10221C]/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <Image src={d.img} alt="" width={64} height={64} className="md:hidden size-14 rounded-full object-cover"/>
              <span className="font-[family-name:var(--font-display)] font-extrabold text-4xl md:text-7xl tracking-tight uppercase transition-colors group-hover:text-[#B4642D] flex-1">
                {d.name}
              </span>
              <span className="hidden md:flex gap-2 text-sm">
                <span className="rounded-full border border-[#10221C]/30 px-3 py-1">{d.gender}</span>
                <span className="rounded-full border border-[#10221C]/30 px-3 py-1">{d.ageText}</span>
                <span className="rounded-full border border-[#10221C]/30 px-3 py-1">{d.size}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {active && (
        <div className="hidden md:block pointer-events-none fixed z-50 w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-[left,top] duration-200 ease-out"
             style={{ left: pos.x + 24, top: pos.y - 160 }}>
          <Image key={active.href} src={active.img} alt={active.name} fill sizes="256px" className="object-cover lp-swap"/>
        </div>
      )}
    </div>
  )
}
