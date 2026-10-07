"use client"

import { useState } from "react"
import DogCard from "../_kit/dogCard"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

const tabs = [
  { key: "all", label: "All dogs", test: () => true },
  { key: "young", label: "Puppies & young", test: (d: LandingDog) => d.age <= 3 },
  { key: "adult", label: "Adults & seniors", test: (d: LandingDog) => d.age > 3 },
  { key: "small", label: "Small & medium", test: (d: LandingDog) => d.size !== "large" },
]

export default function DogTabs({ dogs }: { dogs: LandingDog[] }) {
  const [tab, setTab] = useState("all")
  const shown = dogs.filter(tabs.find(t => t.key === tab)!.test).slice(0, 8)

  return (
    <>
      <div role="tablist" aria-label="Filter dogs" className="flex flex-wrap gap-2">
        {tabs.map(t => {
          const n = dogs.filter(t.test).length
          return (
            <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${tab === t.key ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]" : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]"}`}>
              {t.label} <span className="opacity-60 ml-1">{n}</span>
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 mt-10">
        {shown.map(d => <DogCard key={d.href} dog={d}/>)}
      </div>
    </>
  )
}
