import Image from "next/image"
import Link from "next/link"
import HeroPage, { type LandingData } from "../_kit/heroPage"
import Reveal from "../_kit/reveal"
import type { LandingDog } from "@/app/(frontend)/landing/_shared/data"

export const metadata = { title: "Hero L: Moving rows" }

function Row({ dogs, label, reverse = false, speed }: { dogs: LandingDog[]; label: string; reverse?: boolean; speed: string }) {
  return (
    <div className="cp-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className={`cp-marquee ${reverse ? "cp-marquee-rev" : ""} flex w-max gap-4`} style={{ "--speed": speed } as React.CSSProperties}>
        {[...dogs, ...dogs].map((d, i) => (
          <Link key={i} href={d.href} aria-hidden={i >= dogs.length} tabIndex={i >= dogs.length ? -1 : undefined}
                className="group relative shrink-0 w-40 md:w-52 aspect-[4/5] rounded-[24px] overflow-hidden">
            <Image src={d.img} alt={i < dogs.length ? d.name : ""} fill sizes="240px" priority={i < 4} className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
            <span className="absolute left-3 bottom-3 text-white text-sm"><span className="font-medium">{d.name}</span> <span className="text-white/75">{label}</span></span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Hero({ data }: { data: LandingData }) {
  const { newest, adopted, counts } = data

  return (
    <section className="pt-10 md:pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <Reveal>
          <h1 className="font-[family-name:var(--font-serif)] text-6xl md:text-[5.5rem] leading-[0.9] tracking-[-0.02em] text-balance">
            Second chances, <em className="text-[var(--accent)]">one dog</em> at a time
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-[48ch] mx-auto leading-relaxed">
            The top row is waiting for a family. The bottom row already found one. CARE Project volunteers rescued every one of them in Cyprus.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet all {counts.available} dogs</Link>
          <Link href="/more/donate" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Donate</Link>
        </Reveal>
      </div>
      <Reveal delay={200} className="mt-10 space-y-3">
        <Row dogs={newest.slice(0, 12)} label="is waiting" speed="70s"/>
        <Row dogs={adopted.slice(0, 12)} label="went home" reverse speed="85s"/>
      </Reveal>
    </section>
  )
}

export default function HeroL() {
  return <HeroPage Hero={Hero}/>
}
