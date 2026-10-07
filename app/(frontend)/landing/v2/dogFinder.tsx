"use client"

import Link from "next/link"
import { useState } from "react"
import Photo from "../_shared/photo"
import type { LandingDog } from "../_shared/data"

const sizes = ["any", "small", "medium", "large"] as const
const ages = [
  { key: "any", label: "Any age" },
  { key: "young", label: "Puppy & young" },
  { key: "adult", label: "Adult" },
  { key: "senior", label: "Senior" },
] as const

const ageOk = (age: number, key: string) =>
  key === "any" || (key === "young" && age <= 3) || (key === "adult" && age > 3 && age <= 8) || (key === "senior" && age > 8)

const isNew = (d: LandingDog) => Date.now() - new Date(d.added).getTime() < 1000 * 60 * 60 * 24 * 45

function Chips<T extends string>({ value, options, onChange }: { value: T; options: { key: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button key={o.key} onClick={() => onChange(o.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${value === o.key ? "bg-teal-700 border-teal-700 text-white" : "bg-white border-slate-300 text-slate-700 hover:border-teal-700"}`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function DogFinder({ dogs }: { dogs: LandingDog[] }) {
  const [size, setSize] = useState<(typeof sizes)[number]>("any")
  const [gender, setGender] = useState<"any" | "Male" | "Female">("any")
  const [age, setAge] = useState<(typeof ages)[number]["key"]>("any")
  const shown = dogs.filter(d => (size === "any" || d.size === size) && (gender === "any" || d.gender === gender) && ageOk(d.age, age))

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-6 md:p-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Size</div>
          <Chips value={size} onChange={setSize} options={sizes.map(s => ({ key: s, label: s === "any" ? "Any size" : s[0].toUpperCase() + s.slice(1) }))}/>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Sex</div>
          <Chips value={gender} onChange={setGender} options={[{ key: "any", label: "Any" }, { key: "Female", label: "Girls" }, { key: "Male", label: "Boys" }]}/>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Age</div>
          <Chips value={age} onChange={setAge} options={ages.map(a => ({ key: a.key, label: a.label }))}/>
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-12">
        <h2 className="font-serif font-bold text-3xl text-slate-900">{shown.length} {shown.length === 1 ? "dog matches" : "dogs match"}</h2>
        <Link href="/dogs" className="text-teal-700 font-semibold">Full search →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {shown.slice(0, 12).map(d => (
          <Link key={d.href} href={d.href} className="group bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200 hover:shadow-lg transition">
            <div className="relative">
              <Photo src={d.img} alt={d.name} sizes="25vw" className="aspect-[4/3]"/>
              {isNew(d) && <span className="absolute top-3 left-3 rounded-full bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1">New</span>}
              {d.status === "In foster care" && <span className="absolute top-3 right-3 rounded-full bg-white/90 text-teal-800 text-xs font-bold px-3 py-1">In foster</span>}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xl text-slate-900">{d.name}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">{d.size}</span>
              </div>
              <div className="text-sm text-slate-500 mt-1">{d.gender} · {d.ageText}</div>
              <div className="text-sm text-slate-500 truncate">{d.breed}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
