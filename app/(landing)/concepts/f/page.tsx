import Image from "next/image"
import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import Spotlight from "./spotlight"

export const metadata = { title: "Concept F: Spotlight" }

const theme = {
  "--bg": "#ffffff",
  "--ink": "#0c0d10",
  "--muted": "#5e626b",
  "--line": "#e7e8eb",
  "--accent": "#2563eb",
  "--accent-soft": "#eef3ff",
} as React.CSSProperties

const dark = { "--ink": "#ffffff", "--muted": "rgba(255,255,255,.7)", "--line": "rgba(255,255,255,.14)", "--surface": "#16181c" } as React.CSSProperties

export default async function ConceptF() {
  const { newest, adopted, counts } = await getLandingData()
  const wall = [...newest, ...adopted].slice(0, 32)
  const featured = newest.slice(0, 3)

  return (
    <div className="cp min-h-screen" style={theme}>
      <div className="relative bg-[#08090b] text-[var(--ink)]" style={dark}>
        <SiteHeader overlay/>
        <div className="pt-16">
          <Spotlight dogs={wall} available={counts.available} adopted={counts.adopted}/>
        </div>
      </div>

      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05]">Now meet them properly</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">The newest dogs in our programme. Each profile has their photos and story. Write to us to arrange a visit.</p>
          </Reveal>
          <div className="mt-12 space-y-6">
            {featured.map((d, i) => (
              <Reveal key={d.href} delay={i * 60}>
                <Link href={d.href} className={`group grid md:grid-cols-2 gap-6 md:gap-12 items-center rounded-[28px] border border-[var(--line)] p-3 md:p-4 hover:border-[color-mix(in_oklab,var(--ink)_25%,transparent)] transition-colors`}>
                  <div className={`relative aspect-[16/11] rounded-[22px] overflow-hidden ${i % 2 ? "md:order-2" : ""}`}>
                    <Image src={d.img} alt={d.name} fill sizes="50vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
                  </div>
                  <div className="px-3 pb-4 md:p-6">
                    <div className="text-sm text-[var(--accent)] font-medium">{i === 0 ? "Newest arrival" : "Recently added"}</div>
                    <div className="text-5xl font-semibold tracking-[-0.04em] mt-2">{d.name}</div>
                    <div className="mt-5 flex flex-wrap gap-2 text-sm">
                      {[d.gender, d.ageText, d.size, d.breed].map(t => <span key={t} className="rounded-full border border-[var(--line)] px-3 py-1 capitalize">{t}</span>)}
                    </div>
                    <span className="inline-flex mt-8 rounded-full bg-[var(--ink)] text-[var(--bg)] px-5 py-2.5 text-sm font-medium">Read {d.name}&apos;s story</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/dogs" className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium">All {counts.available} dogs looking for a home</Link>
          </div>
        </section>

        <DonateBand title="Help us keep the lights on for them" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
