import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import Strips from "./strips"

export const metadata = { title: "Concept H: Strips" }

const theme = {
  "--bg": "#ffffff",
  "--ink": "#101114",
  "--muted": "#5f636b",
  "--line": "#e8e9ec",
  "--accent": "#7c3aed",
  "--accent-soft": "#f3efff",
} as React.CSSProperties

const help = [
  { title: "Adopt", text: "In Cyprus the €250 fee covers passport, microchip, vaccines, and neutering.", href: "/more/adopt" },
  { title: "Foster", text: "Give a dog a long-term home until their family is found.", href: "/more/foster" },
  { title: "Volunteer", text: "Walks, socialising, vet runs, and sharing dogs' stories online.", href: "/more/get-involved" },
  { title: "Bring supplies", text: "Blankets, beds, towels, tough rubber toys, fly traps, cleaning supplies.", href: "/more/get-involved" },
]

export default async function ConceptH() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className="cp min-h-screen" style={theme}>
      <SiteHeader/>
      <main>
        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <Reveal>
              <h1 className="text-5xl md:text-[4.75rem] font-semibold tracking-[-0.05em] leading-[0.95] max-w-[13ch]">
                Who will you bring home?
              </h1>
            </Reveal>
            <Reveal delay={80} className="max-w-sm">
              <p className="text-[var(--muted)] leading-relaxed">Point at a dog to meet them. All {counts.available} were rescued, treated, and cared for by CARE Project volunteers in Cyprus.</p>
              <div className="mt-5 flex gap-3">
                <Link href="/dogs" className="rounded-full bg-[var(--ink)] text-white px-5 py-2.5 text-sm font-medium">All dogs</Link>
                <Link href="/more/donate" className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium">Donate</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Strips dogs={newest.slice(0, 8)}/>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-28">
          <Reveal>
            <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05]">{counts.adopted} already said yes</h2>
          </Reveal>
          <Reveal delay={60} className="mt-8 flex flex-wrap gap-2">
            {adopted.map(d => (
              <span key={d.href} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm hover:bg-[var(--accent-soft)] hover:border-[var(--accent)] transition-colors">{d.name}</span>
            ))}
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-28">
          <div className="grid md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[24px] overflow-hidden">
            {help.map((h, i) => (
              <Reveal key={h.title} delay={i * 50} className="bg-[var(--bg)]">
                <Link href={h.href} className="group block p-8 h-full hover:bg-[var(--accent-soft)] transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">{h.title}</h3>
                    <span aria-hidden="true" className="text-[var(--accent)] transition-transform group-hover:translate-x-1">→</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">{h.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <DonateBand/>
      </main>
      <SiteFooter/>
    </div>
  )
}
