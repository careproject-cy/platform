"use client"

import Link from "next/link"
import { useState } from "react"
import Photo from "../_shared/photo"
import type { LandingDog } from "../_shared/data"

type Space = "flat" | "house"
type Pace = "calm" | "lively"
type Sex = "any" | "Female" | "Male"

function Segment<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: [T, string][]; onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-[#1F3B2D]/70 mb-2">{label}</legend>
      <div className="inline-flex rounded-2xl bg-white p-1 border border-[#1F3B2D]/10">
        {options.map(([k, l]) => (
          <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7759] ${value === k ? "bg-[#1F3B2D] text-white" : "text-[#1F3B2D] hover:bg-[#E3F4EA]"}`}>
            {l}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default function Matcher({ dogs }: { dogs: LandingDog[] }) {
  const [space, setSpace] = useState<Space>("house")
  const [pace, setPace] = useState<Pace>("lively")
  const [sex, setSex] = useState<Sex>("any")
  const [offset, setOffset] = useState(0)

  const matches = dogs.filter(d =>
    (space === "house" || d.size !== "large") &&
    (pace === "lively" ? d.age <= 3 : d.age > 3) &&
    (sex === "any" || d.gender === sex))
  const dog = matches.length ? matches[offset % matches.length] : undefined
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setOffset(0) }

  return (
    <div className="grid lg:grid-cols-[1fr_440px] gap-10 items-center">
      <div className="space-y-6">
        <Segment label="Where will they live?" value={space} onChange={reset(setSpace)} options={[["flat", "Apartment"], ["house", "House with space"]]}/>
        <Segment label="What's your pace?" value={pace} onChange={reset(setPace)} options={[["calm", "Calm evenings"], ["lively", "Puppy energy"]]}/>
        <Segment label="Boy or girl?" value={sex} onChange={reset(setSex)} options={[["any", "Either"], ["Female", "Girl"], ["Male", "Boy"]]}/>
        <p className="text-sm text-[#1F3B2D]/60">{matches.length} of {dogs.length} dogs match. Our volunteers will help you decide.</p>
      </div>

      <div className="relative h-[520px]" aria-live="polite">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-[#FFE8A3]"/>
        <div className="absolute inset-0 -translate-x-2 translate-y-1 -rotate-2 rounded-[2rem] bg-[#FF7759]/80"/>
        {dog ? (
          <div key={dog.href + offset} className="lp-swap absolute inset-0 rounded-[2rem] bg-white p-3 shadow-[0_24px_60px_-20px_rgba(31,59,45,.45)] flex flex-col">
            <Photo src={dog.img} alt={dog.name} sizes="380px" className="flex-1 rounded-[1.5rem]"/>
            <div className="px-3 pt-4 pb-2 flex items-center justify-between gap-3">
              <div>
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold">{dog.name}</div>
                <div className="text-sm text-[#1F3B2D]/60">{dog.gender} · {dog.ageText} · {dog.size}</div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOffset(o => o + 1)} aria-label="Show another match"
                        className="size-12 rounded-full border border-[#1F3B2D]/15 grid place-items-center hover:bg-[#E3F4EA] text-xl">↻</button>
                <Link href={dog.href} className="h-12 whitespace-nowrap rounded-full bg-[#FF7759] text-white px-5 grid place-items-center font-semibold hover:bg-[#F2603F]">Meet {dog.name}</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 rounded-[2rem] bg-white p-8 grid place-items-center text-center">
            <div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-semibold">No exact match right now</div>
              <p className="text-[#1F3B2D]/70 mt-2">Change an answer, or email us and we&apos;ll suggest a dog.</p>
              <Link href="/more/adopt" className="inline-block mt-5 rounded-full bg-[#1F3B2D] text-white px-5 py-3 font-semibold">Ask a volunteer</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
