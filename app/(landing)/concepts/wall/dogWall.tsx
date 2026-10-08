"use client"

import { useState } from "react"
import PhotoWall from "./photoWall"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

const tabs = [
  { key: "all", label: "All dogs", test: () => true },
  { key: "young", label: "Puppies & young", test: (d: LandingDog) => d.age <= 3 },
  { key: "adult", label: "Adults & seniors", test: (d: LandingDog) => d.age > 3 },
  { key: "small", label: "Small & medium", test: (d: LandingDog) => d.size !== "large" },
]

export default function DogWall({ dogs }: { dogs: LandingDog[] }) {
  const [tab, setTab] = useState("all")
  const shown = dogs.filter(tabs.find(t => t.key === tab)!.test).slice(0, 12)

  return (
    <>
      <div role="tablist" aria-label="Filter dogs" className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${tab === t.key ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]" : "border-[var(--line)] bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)]"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div key={tab} className="mt-14 pt-12">
        <PhotoWall dogs={shown} cols={4} labels="always"/>
      </div>
    </>
  )
}
