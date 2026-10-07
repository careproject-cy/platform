import Image from "next/image"
import Link from "next/link"
import HeroPage, { type LandingData } from "../_kit/heroPage"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Hero I: Collage" }

// Photo slots around the headline: position, width, rotation (desktop only).
const slots = [
  { l: "2%", t: "6%", w: 170, r: -6 },
  { l: "15%", t: "-2%", w: 130, r: 4 },
  { l: "1%", t: "44%", w: 140, r: 3 },
  { l: "12%", t: "62%", w: 190, r: -3 },
  { l: "27%", t: "78%", w: 120, r: 6 },
  { l: "70%", t: "-3%", w: 150, r: -4 },
  { l: "84%", t: "8%", w: 185, r: 5 },
  { l: "88%", t: "47%", w: 140, r: -5 },
  { l: "74%", t: "60%", w: 180, r: 3 },
  { l: "61%", t: "80%", w: 125, r: -6 },
  { l: "28%", t: "6%", w: 105, r: -8 },
  { l: "62%", t: "14%", w: 100, r: 7 },
]

function Hero({ data }: { data: LandingData }) {
  const { newest, adopted, counts } = data
  const photos = [...newest, ...adopted].slice(0, slots.length)

  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 md:h-[760px] flex flex-col items-center justify-center py-14 md:py-0">
        <div className="grid grid-cols-3 gap-2 w-full max-w-sm mb-10 md:hidden">
          {photos.slice(0, 6).map(d => (
            <div key={d.href} className="relative aspect-square rounded-2xl overflow-hidden"><Image src={d.img} alt="" fill sizes="33vw" className="object-cover"/></div>
          ))}
        </div>
        {photos.map((d, i) => (
          <Reveal key={d.href} delay={i * 45} className="hidden md:block absolute inset-0 pointer-events-none">
            <Link href={d.href} className="pointer-events-auto group block absolute rounded-[22px] overflow-hidden bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(16,26,20,.45)] hover:z-20 hover:scale-105 transition-transform"
                  style={{ left: slots[i].l, top: slots[i].t, width: slots[i].w, rotate: `${slots[i].r}deg` }}>
              <span className="relative block aspect-[4/5] rounded-[16px] overflow-hidden">
                <Image src={d.img} alt={d.name} fill sizes="200px" priority={i < 4} className="object-cover"/>
              </span>
            </Link>
          </Reveal>
        ))}
        <div className="relative z-10 text-center max-w-2xl">
          <Reveal>
            <p className="text-sm text-[var(--muted)]">{counts.available} dogs waiting · {counts.adopted} already home</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 font-[family-name:var(--font-serif)] text-6xl md:text-[6rem] leading-[0.92] tracking-[-0.02em]">
              Second chances, <em className="text-[var(--accent)]">one dog</em> at a time
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg text-[var(--muted)] max-w-[44ch] mx-auto leading-relaxed">
              Every face around this page was rescued by CARE Project volunteers in Cyprus. Some are home. Some are still waiting for you.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
            <Link href="/more/donate" className="rounded-full border border-[var(--line)] bg-white px-6 py-3 font-medium hover:border-[var(--ink)]">Donate</Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function HeroI() {
  return <HeroPage Hero={Hero}/>
}
