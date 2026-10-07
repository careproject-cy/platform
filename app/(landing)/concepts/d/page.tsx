import Image from "next/image"
import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import DogCard from "../_kit/dogCard"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Concept D: Photo wall" }

const theme = {
  "--ink": "#111418",
  "--muted": "#5f646d",
  "--line": "#e6e7ea",
  "--accent": "#f59e0b",
  "--accent-ink": "#111418",
  "--accent-soft": "#fff7e6",
} as React.CSSProperties

const overlay = {
  "--ink": "#ffffff",
  "--muted": "rgba(255,255,255,.75)",
  "--line": "rgba(255,255,255,.18)",
  "--surface": "#16191e",
} as React.CSSProperties

export default async function ConceptD() {
  const { newest, adopted, counts } = await getLandingData()
  const wall = [...newest, ...adopted].slice(0, 18)
  const cols = [0, 1, 2, 3].map(c => wall.filter((_, i) => i % 4 === c))
  const ways = [
    { title: "Adopt", text: "Give a rescued dog a home in Cyprus, the UK, Germany, or the Netherlands.", href: "/more/adopt", dog: adopted[0] },
    { title: "Foster", text: "Host a dog long-term so they never have to go back to a kennel.", href: "/more/foster", dog: adopted[1] },
    { title: "Volunteer", text: "Walk and socialise dogs, drive them to the vet, or share their stories.", href: "/more/get-involved", dog: adopted[2] },
  ]

  return (
    <div className="cp min-h-screen" style={theme}>
      <section className="relative h-[760px] md:h-[820px] overflow-hidden bg-[#0d0f12] text-[var(--ink)]" style={overlay}>
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-3 px-3 opacity-70">
          {cols.map((col, c) => (
            <div key={c} className={`cp-drift flex flex-col gap-3 ${c % 2 ? "pt-24" : ""} ${c > 1 ? "max-md:hidden" : ""}`} style={{ "--drift": `${70 + c * 12}s` } as React.CSSProperties}>
              {[...col, ...col].map((d, i) => (
                <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden shrink-0">
                  <Image src={d.img} alt="" fill sizes="25vw" priority={i < 2} className="object-cover"/>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,15,18,.55)_0%,rgba(13,15,18,.2)_35%,rgba(13,15,18,.92)_78%)]"/>
        <SiteHeader overlay/>
        <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-16 md:pb-20 text-white">
          <Reveal>
            <h1 className="text-5xl md:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.98] max-w-[14ch]">
              Every face here was once a stray.
            </h1>
          </Reveal>
          <Reveal delay={80} className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg text-white/75 max-w-[44ch] leading-relaxed">
              {counts.adopted} are home now. {counts.available} are still waiting. CARE Project volunteers rescue, treat, and rehome dogs across Cyprus.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-[#111418] px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
              <Link href="/more/donate" className="rounded-full border border-white/30 px-6 py-3 font-medium hover:bg-white/10">Donate</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 border-b border-[var(--line)]">
          {[[counts.available, "dogs waiting"], [counts.adopted, "dogs adopted"], ["4", "countries we rehome to"], ["0", "paid staff"]].map(([n, l], i) => (
            <Reveal key={l as string} delay={i * 50} className="py-10 pr-6 md:border-r last:border-r-0 border-[var(--line)] md:pl-6 first:pl-0">
              <div className="text-5xl font-semibold tracking-[-0.04em]">{n}</div>
              <div className="text-sm text-[var(--muted)] mt-2">{l}</div>
            </Reveal>
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05]">Still waiting</h2>
            <Link href="/dogs" className="text-sm font-medium">See all {counts.available} dogs</Link>
          </Reveal>
        </section>
        <div className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] scroll-px-4 pb-4 [scrollbar-width:thin]">
          {newest.slice(0, 10).map(d => (
            <div key={d.href} className="snap-start shrink-0 w-60 md:w-72"><DogCard dog={d} ratio="aspect-[3/4]"/></div>
          ))}
        </div>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-24 grid md:grid-cols-3 gap-5">
          {ways.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <Link href={w.href} className="group block rounded-[24px] border border-[var(--line)] overflow-hidden hover:border-[color-mix(in_oklab,var(--ink)_30%,transparent)] transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {w.dog && <Image src={w.dog.img} alt="" fill sizes="33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">{w.title}</h3>
                    <span aria-hidden="true" className="size-8 rounded-full border border-[var(--line)] grid place-items-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">↗</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{w.text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>

        <DonateBand title="Help the next one home" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
