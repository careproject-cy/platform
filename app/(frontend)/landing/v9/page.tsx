import Link from "next/link"
import { Archivo, Courier_Prime } from "next/font/google"
import { getLandingData, type LandingDog } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import "../_shared/motion.css"

export const metadata = draftMeta("Travel papers")

const display = Archivo({ subsets: ["latin"], variable: "--font-display", axes: ["wdth"] })
const typed = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-typed" })

const ink = "#14204A"
const guilloche = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='40'%3E%3Cpath d='M0 20 Q20 0 40 20 T80 20 T120 20 T160 20' fill='none' stroke='%231B2A6B' stroke-opacity='.07'/%3E%3Cpath d='M0 26 Q20 6 40 26 T80 26 T120 26 T160 26' fill='none' stroke='%231B2A6B' stroke-opacity='.05'/%3E%3C/svg%3E")`

function Stamp({ label, sub, color, rot, delay, className = "" }: { label: string; sub: string; color: string; rot: number; delay: number; className?: string }) {
  return (
    <div className={`lp-stamp absolute rounded-xl border-[3px] px-3 py-1.5 text-center leading-none ${className}`}
         style={{ color, borderColor: color, ["--r" as string]: `${rot}deg`, animationDelay: `${delay}s` }}>
      <div className="font-[family-name:var(--font-display)] font-black text-xl tracking-wide" style={{ fontStretch: "75%" }}>{label}</div>
      <div className="font-[family-name:var(--font-typed)] text-[10px] mt-1">{sub}</div>
    </div>
  )
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-[#1B2A6B]/15 py-2">
      <div className="text-[11px] text-[#1B2A6B]/55">{k}</div>
      <div className="font-[family-name:var(--font-typed)] text-lg font-bold">{v}</div>
    </div>
  )
}

function MiniPassport({ dog }: { dog: LandingDog }) {
  return (
    <Link href={dog.href} className="group rounded-2xl bg-[#1B2A6B] p-2 pb-4 text-white hover:-rotate-1 transition-transform">
      <div className="rounded-xl bg-[#EDF0F6] text-[#14204A] p-3 flex gap-3" style={{ backgroundImage: guilloche }}>
        <Photo src={dog.img} alt={dog.name} sizes="120px" className="w-24 aspect-[3/4] rounded-md shrink-0"/>
        <div className="min-w-0">
          <div className="font-[family-name:var(--font-typed)] font-bold text-lg truncate">{dog.name.toUpperCase()}</div>
          <div className="text-xs text-[#1B2A6B]/60 mt-1">{dog.gender} / {dog.size}</div>
          <div className="text-xs text-[#1B2A6B]/60">{dog.ageText}</div>
          <div className="mt-3 inline-block rounded border-2 border-dashed border-[#C8102E]/50 text-[#C8102E]/70 text-[10px] font-bold px-1.5 py-0.5 -rotate-3">AWAITING HOME</div>
        </div>
      </div>
      <div className="text-center text-xs mt-3 tracking-[0.3em] text-white/70 group-hover:text-white">OPEN FILE</div>
    </Link>
  )
}

export default async function PassportLanding() {
  const { newest, counts } = await getLandingData()
  const star = newest[0]

  return (
    <div className={`${display.variable} ${typed.variable} bg-[#EDF0F6]`} style={{ color: ink }}>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div>
          <h1 className="font-[family-name:var(--font-display)] font-black text-6xl md:text-8xl leading-[0.88] uppercase" style={{ fontStretch: "70%" }}>
            Every dog leaves with a passport.
          </h1>
          <p className="text-xl mt-8 max-w-md text-[#14204A]/75">
            We give Cyprus street dogs the vet care, microchip, and papers they need, then find a family in Cyprus, the UK, Germany, or the Netherlands to stamp them.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/dogs" className="rounded-lg bg-[#1B2A6B] text-white px-7 py-4 font-bold hover:bg-[#C8102E] transition-colors">Meet the {counts.available} dogs</Link>
            <Link href="/more/donate" className="rounded-lg border-2 border-[#1B2A6B] px-7 py-4 font-bold">Fund their journey</Link>
          </div>
        </div>

        {star && (
          <div className="relative rounded-[28px] bg-[#1B2A6B] p-3 shadow-[0_40px_80px_-30px_rgba(20,32,74,.6)] rotate-[1.5deg]">
            <div className="grid md:grid-cols-2 rounded-[20px] overflow-hidden bg-[#F7F8FB]" style={{ backgroundImage: guilloche }}>
              <div className="p-6 md:border-r border-dashed border-[#1B2A6B]/25">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B2A6B]/60">
                  <span>CARE PROJECT · TRAVEL PAPERS</span><span>CY</span>
                </div>
                <Photo src={star.img} alt={star.name} priority sizes="300px" className="aspect-[3/4] rounded-lg mt-4 grayscale-[15%]"/>
              </div>
              <div className="p-6 relative min-h-[420px]">
                <Field k="Name" v={star.name}/>
                <Field k="Sex" v={star.gender}/>
                <Field k="Age" v={star.ageText}/>
                <Field k="Size" v={star.size}/>
                <Field k="Destination" v="Your home"/>
                <Stamp label="CYPRUS" sub="RESCUED" color="#2E7D5B" rot={-9} delay={0.5} className="right-4 bottom-28"/>
                <Stamp label="VET OK" sub="CARE PROJECT" color="#1B2A6B" rot={6} delay={0.85} className="left-8 bottom-10"/>
                <Stamp label="HOME?" sub="WAITING FOR YOU" color="#C8102E" rot={-4} delay={1.2} className="right-6 bottom-4"/>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-[#1B2A6B] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          {[
            ["Departs", "Cyprus shelters"],
            ["Arrives", "Cyprus, UK, DE, NL"],
            ["Stamped so far", `${counts.adopted} dogs`],
            ["Cyprus adoption fee", "€250, incl. passport"],
          ].map(([k, v]) => (
            <div key={k} className="border-l-2 border-white/25 pl-5">
              <div className="text-sm text-white/60">{k}</div>
              <div className="font-[family-name:var(--font-display)] font-black text-3xl uppercase mt-1" style={{ fontStretch: "75%" }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24" style={{ backgroundImage: guilloche }}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--font-display)] font-black text-5xl uppercase" style={{ fontStretch: "70%" }}>Papers ready, home wanted</h2>
          <Link href="/dogs" className="font-bold underline underline-offset-4 decoration-2 decoration-[#C8102E]">All {counts.available} files</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {newest.slice(1, 9).map(d => <MiniPassport key={d.href} dog={d}/>)}
        </div>
      </section>
    </div>
  )
}
