"use client"

import Link from "next/link"
import { useState } from "react"

// Only the €5 line is a sourced fact (data/pages/donate.md); the rest are placeholder copy for review.
const presets = {
  once: [
    { amount: 5, impact: "buys a deworming tablet for a dog with parasites" },
    { amount: 25, impact: "goes toward vaccinations for a new rescue" },
    { amount: 50, impact: "goes toward a vet exam and diagnostics" },
    { amount: 100, impact: "goes toward spay/neuter surgery" },
  ],
  monthly: [
    { amount: 10, impact: "helps keep a dog on long-term leishmaniasis treatment" },
    { amount: 25, impact: "helps cover food and bedding every month" },
    { amount: 50, impact: "helps fund ongoing vet care for dogs in our programme" },
  ],
}

export default function GiveWidget() {
  const [mode, setMode] = useState<"once" | "monthly">("monthly")
  const [pick, setPick] = useState(1)
  const options = presets[mode]
  const chosen = options[Math.min(pick, options.length - 1)]

  return (
    <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-emerald-900/10 p-7 text-slate-900">
      <div className="grid grid-cols-2 bg-emerald-50 rounded-full p-1 text-sm font-semibold">
        {(["monthly", "once"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setPick(1) }}
                  className={`rounded-full py-2.5 transition ${mode === m ? "bg-emerald-800 text-white shadow" : "text-emerald-900"}`}>
            {m === "monthly" ? "Monthly" : "One-off"}
          </button>
        ))}
      </div>
      <div className={`grid gap-2 mt-5 ${options.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {options.map((o, i) => (
          <button key={o.amount} onClick={() => setPick(i)}
                  className={`rounded-xl py-3 font-bold text-lg border-2 transition ${chosen.amount === o.amount ? "border-amber-500 bg-amber-50 text-emerald-950" : "border-slate-200 text-slate-700"}`}>
            €{o.amount}
          </button>
        ))}
      </div>
      <p className="mt-5 text-slate-700 min-h-12">
        <span className="font-bold text-emerald-900">€{chosen.amount}{mode === "monthly" ? " a month" : ""}</span> {chosen.impact}.
      </p>
      <Link href="/more/donate" className="block text-center mt-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-lg py-4">
        Donate €{chosen.amount}{mode === "monthly" ? " monthly" : ""}
      </Link>
      <p className="text-xs text-slate-500 mt-3 text-center">Secure payment via Stripe</p>
    </div>
  )
}
