import Image from "next/image"
import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import BBody, { bTheme, serif } from "./body"

export const metadata = { title: "Concept B: Editorial" }


export default async function ConceptB() {
  const data = await getLandingData()
  const { newest, counts } = data
  const [p1, p2, p3] = newest

  return (
    <div className={`cp ${serif.variable} min-h-screen`} style={bTheme}>
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

        <BBody data={data}/>

        <DonateBand title="Fund a dog's way home" dark/>
      </main>
      <SiteFooter/>
    </div>
  )
}
