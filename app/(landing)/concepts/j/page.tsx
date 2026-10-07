import Image from "next/image"
import Link from "next/link"
import HeroPage, { type LandingData } from "../_kit/heroPage"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Hero J: Photo wall" }

const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]", "aspect-[5/6]"]

function Hero({ data }: { data: LandingData }) {
  const { newest, adopted, counts } = data
  const photos = [...newest, ...adopted].slice(0, 20)
  const cols = [0, 1, 2, 3, 4].map(c => photos.filter((_, i) => i % 5 === c))

  return (
    <section className="relative px-3 pt-3">
      <div className="relative h-[620px] md:h-[780px] overflow-hidden rounded-[32px]">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {cols.map((col, c) => (
            <div key={c} className={`flex flex-col gap-3 ${c % 2 ? "-mt-16" : "-mt-4"} ${c > 2 ? "max-md:hidden" : ""}`}>
              {col.map((d, i) => (
                <Link key={d.href} href={d.href} className={`group relative ${ratios[(c + i) % ratios.length]} rounded-[22px] overflow-hidden`}>
                  <Image src={d.img} alt={d.name} fill sizes="(max-width: 768px) 33vw, 20vw" priority={i === 0} className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
                  <span className="absolute left-3 bottom-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{d.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(0deg,var(--bg)_0%,var(--bg)_42%,color-mix(in_oklab,var(--bg)_75%,transparent)_70%,transparent_100%)] pointer-events-none"/>
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-12 pb-10 md:pb-14">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <Reveal>
              <h1 className="font-[family-name:var(--font-serif)] text-6xl md:text-[6.5rem] leading-[0.9] tracking-[-0.02em] max-w-[11ch]">
                Second chances, <em className="text-[var(--accent)]">one dog</em> at a time
              </h1>
            </Reveal>
            <Reveal delay={100} className="max-w-sm">
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                {counts.available} rescued dogs are waiting for homes in Cyprus, the UK, Germany, and the Netherlands. {counts.adopted} have already found one.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
                <Link href="/more/donate" className="rounded-full border border-[var(--line)] bg-white px-6 py-3 font-medium">Donate</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HeroJ() {
  return <HeroPage Hero={Hero}/>
}
