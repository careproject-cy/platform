import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import DogCard from "../_kit/dogCard"
import Reveal from "../_kit/reveal"
import SwipeDeck from "./swipeDeck"

export const metadata = { title: "Concept E: Swipe" }

const theme = {
  "--bg": "#fbf7f4",
  "--ink": "#1b1513",
  "--muted": "#6e625d",
  "--line": "#ece4df",
  "--accent": "#e2513a",
  "--accent-soft": "#fdebe6",
} as React.CSSProperties

export default async function ConceptE() {
  const { newest, counts } = await getLandingData()

  return (
    <div className="cp min-h-screen" style={theme}>
      <SiteHeader/>
      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-24 grid lg:grid-cols-[1fr_auto] gap-14 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 text-sm font-medium">{counts.available} dogs, one at a time</span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-6 text-5xl md:text-[5.25rem] font-semibold tracking-[-0.05em] leading-[0.95]">
                Swipe right on a rescue.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg text-[var(--muted)] max-w-[42ch] leading-relaxed">
                Every dog here was rescued, treated, and cared for by CARE Project volunteers in Cyprus. Shortlist the ones you like and we&apos;ll tell you everything about them.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-10 grid grid-cols-3 gap-6 max-w-md text-sm text-[var(--muted)]">
              <div><span className="block text-2xl font-semibold text-[var(--ink)]">1</span>Shortlist dogs</div>
              <div><span className="block text-2xl font-semibold text-[var(--ink)]">2</span>Email the volunteers</div>
              <div><span className="block text-2xl font-semibold text-[var(--ink)]">3</span>Meet and adopt</div>
            </Reveal>
          </div>
          <Reveal delay={100} className="w-full lg:w-[380px]">
            <SwipeDeck dogs={newest}/>
          </Reveal>
        </section>

        <section className="border-t border-[var(--line)]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-24">
            <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05]">Prefer to see everyone?</h2>
              <Link href="/dogs" className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium">All {counts.available} dogs</Link>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {newest.slice(0, 8).map((d, i) => <Reveal key={d.href} delay={i * 40}><DogCard dog={d}/></Reveal>)}
            </div>
          </div>
        </section>

        <DonateBand title="Can't adopt right now? Fund one." />
      </main>
      <SiteFooter/>
    </div>
  )
}
