import Image from "next/image"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import ScrollStory from "./scrollStory"

export const metadata = { title: "Concept G: Scroll story" }

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" })

const theme = {
  "--bg": "#f4f1ec",
  "--surface": "#ffffff",
  "--ink": "#171512",
  "--muted": "#6b655c",
  "--line": "#e3ddd3",
  "--accent": "#166534",
  "--accent-soft": "#e8f1ea",
} as React.CSSProperties

export default async function ConceptG() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className={`cp ${serif.variable} min-h-screen`} style={theme}>
      <SiteHeader/>
      <main>
        <ScrollStory dogs={newest.slice(0, 10)} total={counts.available}/>

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-28">
          <Reveal className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-end">
            <h2 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
              And <em className="text-[var(--accent)]">{counts.adopted}</em> who already found theirs
            </h2>
            <p className="text-[var(--muted)] leading-relaxed max-w-[44ch]">
              Adopted in Cyprus and through our partners in the UK, Germany, and the Netherlands. Run entirely by volunteers of the UANA Foundation.
            </p>
          </Reveal>
          <div className="mt-14 columns-2 md:columns-4 gap-4 [&>*]:mb-4">
            {adopted.slice(0, 12).map((d, i) => (
              <Reveal key={d.href} delay={(i % 4) * 50} className="break-inside-avoid">
                <div className={`relative rounded-2xl overflow-hidden ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                  <Image src={d.img} alt={`${d.name}, adopted`} fill sizes="25vw" className="object-cover"/>
                </div>
                <div className="mt-2 text-sm"><span className="font-medium">{d.name}</span> <span className="text-[var(--muted)]">went home</span></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/adopted/1" className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium">See all happy endings</Link>
          </div>
        </section>

        <DonateBand title="Every story starts with a vet bill" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
