"use client"

import Link from "next/link"
import { useState } from "react"
import Reveal from "./reveal"

const amounts = { once: [5, 25, 50, 100], monthly: [10, 25, 50] }

export default function DonateBand({ title = "Keep the next rescue possible", dark = false }: { title?: string; dark?: boolean }) {
  const [mode, setMode] = useState<"once" | "monthly">("monthly")
  const [amount, setAmount] = useState(25)
  const list = amounts[mode]

  return (
    <section className="px-4 md:px-6 py-24">
      <Reveal className={`max-w-6xl mx-auto rounded-[28px] overflow-hidden grid md:grid-cols-[1.1fr_1fr] ${dark ? "bg-[var(--ink)] text-[var(--bg)]" : "bg-[var(--accent-soft)]"}`}>
        <div className="p-8 md:p-14 flex flex-col justify-between gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] max-w-md">{title}</h2>
            <p className={`mt-5 max-w-md leading-relaxed ${dark ? "opacity-70" : "text-[var(--muted)]"}`}>
              Vet care is our biggest cost: vaccines, neutering, and months of treatment for leishmaniasis and tick-borne disease. €5 buys a deworming tablet.
            </p>
          </div>
          <ul className={`grid grid-cols-3 gap-4 text-sm ${dark ? "opacity-80" : "text-[var(--muted)]"}`}>
            <li><span className={`block text-2xl font-semibold tracking-tight ${dark ? "" : "text-[var(--ink)]"}`}>100%</span>volunteer-run</li>
            <li><span className={`block text-2xl font-semibold tracking-tight ${dark ? "" : "text-[var(--ink)]"}`}>0</span>paid staff</li>
            <li><span className={`block text-2xl font-semibold tracking-tight ${dark ? "" : "text-[var(--ink)]"}`}>Stripe</span>secure checkout</li>
          </ul>
        </div>
        <div className="p-4 md:p-6">
          <div className="h-full rounded-[20px] bg-[var(--surface)] text-[var(--ink)] p-6 md:p-8 cp-shadow flex flex-col">
            <div role="tablist" aria-label="Donation frequency" className="grid grid-cols-2 rounded-full bg-[color-mix(in_oklab,var(--ink)_6%,transparent)] p-1 text-sm font-medium">
              {(["monthly", "once"] as const).map(m => (
                <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setAmount(amounts[m][1]) }}
                        className={`rounded-full py-2 transition-colors ${mode === m ? "bg-[var(--surface)] shadow-sm" : "text-[var(--muted)]"}`}>
                  {m === "monthly" ? "Monthly" : "One time"}
                </button>
              ))}
            </div>
            <div className={`grid gap-2 mt-5 ${list.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
              {list.map(a => (
                <button key={a} onClick={() => setAmount(a)} aria-pressed={amount === a}
                        className={`rounded-xl border py-3 font-semibold transition-colors ${amount === a ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)] hover:border-[color-mix(in_oklab,var(--ink)_25%,transparent)]"}`}>
                  €{a}
                </button>
              ))}
            </div>
            <p className="text-sm text-[var(--muted)] mt-5 flex-1">
              {amount === 5 && mode === "once" ? "Buys a deworming tablet for a dog with parasites." : "Goes straight to vet bills, food, and transport for dogs in our care."}
            </p>
            <Link href="/more/donate" className="mt-6 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-center py-3.5 font-medium hover:opacity-90 transition-opacity">
              Donate €{amount}{mode === "monthly" ? " a month" : ""}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
