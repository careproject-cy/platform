import Image from "next/image"
import Link from "next/link"
import HeroPage, { type LandingData } from "../_kit/heroPage"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Hero K: Bento" }

// Tile spans on a 4-column, 4-row grid; the stat tile sits at index 3.
const spans = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
]

function Hero({ data }: { data: LandingData }) {
  const { newest, counts } = data
  const photos = newest.slice(0, 8)

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
      <div>
        <Reveal>
          <h1 className="font-[family-name:var(--font-serif)] text-6xl md:text-[5.25rem] leading-[0.93] tracking-[-0.02em]">
            Second chances, <em className="text-[var(--accent)]">one dog</em> at a time
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-[42ch] leading-relaxed">
            We rescue stray dogs, pay for their vet care, and stay with each one until a family takes them home.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
          <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
          <Link href="/more/foster" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Become a foster</Link>
        </Reveal>
      </div>

      <Reveal delay={100} className="grid grid-cols-4 grid-flow-dense grid-rows-[repeat(4,92px)] md:grid-rows-[repeat(4,128px)] gap-3">
        {spans.map((span, i) => {
          if (i === 3) {
            return (
              <div key="stat" className={`${span} rounded-[24px] bg-[var(--accent)] text-white p-4 flex flex-col justify-between`}>
                <span className="text-xs text-white/75">Adopted</span>
                <span className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl leading-none">{counts.adopted}</span>
              </div>
            )
          }
          const d = photos[i > 3 ? i - 1 : i]
          if (!d) return null
          return (
            <Link key={d.href} href={d.href} className={`${span} group relative rounded-[24px] overflow-hidden`}>
              <Image src={d.img} alt={d.name} fill priority={i < 2} sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80"/>
              <span className="absolute left-3 bottom-3 text-white text-sm font-medium">{d.name}</span>
              {i === 0 && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium">Newest arrival</span>}
            </Link>
          )
        })}
      </Reveal>
    </section>
  )
}

export default function HeroK() {
  return <HeroPage Hero={Hero}/>
}
