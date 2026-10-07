import Image from "next/image"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import DogTabs from "./dogTabs"

export const metadata = { title: "Concept B: Editorial" }

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" })

const theme = {
  "--accent": "#166534",
  "--accent-soft": "#eef6f0",
  "--ink": "#101a14",
  "--muted": "#5d6a62",
  "--line": "#e3e8e4",
} as React.CSSProperties

export default async function ConceptB() {
  const { newest, available, adopted, posts, counts } = await getLandingData()
  const [p1, p2, p3] = newest
  const lead = posts[0]

  return (
    <div className={`cp ${serif.variable} min-h-screen`} style={theme}>
      <SiteHeader/>
      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-24 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <p className="text-sm text-[var(--muted)] flex items-center gap-2">
                <span className="relative flex size-2"><span className="cp-pulse absolute inset-0 rounded-full bg-[var(--accent)]"/><span className="relative size-2 rounded-full bg-[var(--accent)]"/></span>
                A volunteer dog rescue in Cyprus
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-6 font-[family-name:var(--font-serif)] text-6xl md:text-[5.5rem] leading-[0.95] tracking-[-0.02em]">
                Second chances, <em className="text-[var(--accent)]">one dog</em> at a time
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 text-lg text-[var(--muted)] max-w-[46ch] leading-relaxed">
                We rescue stray dogs, pay for their vet care, and stay with each one until a family in Cyprus, the UK, Germany, or the Netherlands takes them home.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-9 flex flex-wrap gap-3">
              <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
              <Link href="/more/foster" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Become a foster</Link>
            </Reveal>
            <Reveal delay={240} className="mt-14 grid grid-cols-3 max-w-md border-t border-[var(--line)]">
              {[[counts.available, "waiting now"], [counts.adopted, "adopted"], [4, "countries"]].map(([n, l]) => (
                <div key={l as string} className="pt-5 pr-4">
                  <div className="font-[family-name:var(--font-serif)] text-4xl">{n}</div>
                  <div className="text-sm text-[var(--muted)] mt-1">{l}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={120} className="grid grid-cols-2 grid-rows-[repeat(6,64px)] md:grid-rows-[repeat(6,88px)] gap-3">
            {p1 && (
              <Link href={p1.href} className="relative row-span-6 rounded-[28px] overflow-hidden group">
                <Image src={p1.img} alt={p1.name} fill priority sizes="(max-width: 1024px) 50vw, 300px" className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
                <span className="absolute left-3 bottom-3 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-sm font-medium">{p1.name}, {p1.ageText}</span>
              </Link>
            )}
            {p2 && (
              <Link href={p2.href} className="relative row-span-3 rounded-[28px] overflow-hidden">
                <Image src={p2.img} alt={p2.name} fill sizes="300px" className="object-cover"/>
              </Link>
            )}
            <div className="row-span-1 rounded-[20px] bg-[var(--accent-soft)] px-5 flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">Cyprus adoption fee</span>
              <span className="font-semibold">€250</span>
            </div>
            {p3 && (
              <Link href={p3.href} className="relative row-span-2 rounded-[28px] overflow-hidden">
                <Image src={p3.img} alt={p3.name} fill sizes="300px" className="object-cover"/>
              </Link>
            )}
          </Reveal>
        </section>

        <section className="border-y border-[var(--line)] bg-[var(--accent-soft)]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-24">
            <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <h2 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl tracking-[-0.02em] leading-none">Looking for a home</h2>
              <Link href="/dogs" className="text-sm font-medium underline underline-offset-4 decoration-[var(--accent)]">Browse all {counts.available} dogs</Link>
            </Reveal>
            <DogTabs dogs={available}/>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-28 grid lg:grid-cols-[1fr_1.3fr] gap-14 items-center">
          <Reveal>
            <blockquote className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl leading-[1.08] tracking-[-0.01em]">
              &ldquo;United by our passion for animal welfare and our desire to make the world a better place for stray dogs.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-[var(--muted)]">The CARE Project volunteers, all with full-time jobs and families</p>
            <Link href="/more/about" className="inline-block mt-8 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:border-[var(--ink)]">Read our story</Link>
          </Reveal>
          <Reveal delay={100} className="grid grid-cols-3 gap-3">
            {adopted.slice(0, 6).map((d, i) => (
              <div key={d.href} className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${i % 3 === 1 ? "translate-y-8" : ""}`}>
                <Image src={d.img} alt={`${d.name}, adopted`} fill sizes="200px" className="object-cover"/>
                <span className="absolute left-2 bottom-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium">{d.name}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {lead && (
          <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
            <Reveal className="flex items-end justify-between gap-6 mb-8">
              <h2 className="font-[family-name:var(--font-serif)] text-5xl tracking-[-0.02em] leading-none">From our notebook</h2>
              <Link href="/blog" className="text-sm font-medium underline underline-offset-4 decoration-[var(--accent)]">All stories</Link>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((p, i) => (
                <Reveal key={p.href} delay={i * 60}>
                  <Link href={p.href} className="group block">
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden"><Image src={p.img} alt="" fill sizes="33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/></div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight leading-snug group-hover:text-[var(--accent)]">{p.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{p.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <DonateBand title="Fund a dog's way home" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
