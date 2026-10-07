import Image from "next/image"
import Link from "next/link"
import { getLandingData, type LandingDog } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Concept C: Board" }

const theme = {
  "--bg": "#f5f6f8",
  "--surface": "#ffffff",
  "--ink": "#0e1116",
  "--muted": "#5f6672",
  "--line": "#e4e6eb",
  "--accent": "#0f766e",
  "--accent-soft": "#e6f4f1",
} as React.CSSProperties

const faq = [
  ["Can I adopt if I live outside Cyprus?", "Yes. We rehome dogs to the UK, Germany, and the Netherlands with partner organisations. Their fees vary and transport costs may apply."],
  ["What does adoption cost in Cyprus?", "The fee is €250. It covers the dog's passport, microchip, vaccinations, and neutering."],
  ["What happens after I write to you?", "Tell us your country, home type, other pets, and the dog you like. We send the application form, then arrange a meeting and a home check."],
  ["I can't adopt. Can I still help?", "Foster a dog long-term until their family is found, volunteer with walks and vet runs, donate, or bring blankets and toys to the shelter."],
]

function MiniDog({ dog, tag }: { dog: LandingDog; tag: string }) {
  return (
    <Link href={dog.href} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 pr-3 hover:border-[color-mix(in_oklab,var(--ink)_25%,transparent)] hover:-translate-y-px transition-all">
      <span className="relative size-12 shrink-0 rounded-lg overflow-hidden"><Image src={dog.img} alt="" fill sizes="48px" className="object-cover"/></span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium truncate">{dog.name}</span>
        <span className="block text-xs text-[var(--muted)] truncate">{dog.ageText}</span>
      </span>
      <span className="text-[11px] rounded-md bg-[color-mix(in_oklab,var(--ink)_5%,transparent)] px-1.5 py-0.5 text-[var(--muted)] capitalize">{tag}</span>
    </Link>
  )
}

export default async function ConceptC() {
  const { available, reserved, adopted, counts } = await getLandingData()
  const foster = available.filter(d => d.status === "In foster care")
  const open = available.filter(d => d.status === "Available")
  const columns = [
    { title: "In foster care", dot: "#a16207", dogs: foster, total: foster.length },
    { title: "Available", dot: "#0f766e", dogs: open, total: open.length },
    { title: "Reserved", dot: "#4f46e5", dogs: reserved, total: reserved.length },
    { title: "Adopted", dot: "#64748b", dogs: adopted, total: adopted.length },
  ].filter(c => c.total > 0)

  return (
    <div className="cp min-h-screen" style={theme}>
      <SiteHeader/>
      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end">
            <Reveal>
              <h1 className="text-5xl md:text-[4.5rem] font-semibold tracking-[-0.045em] leading-[1]">
                Follow every dog from the shelter to a sofa.
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                CARE Project volunteers treat, foster, and rehome stray dogs across Cyprus. This is everyone in our care right now.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dogs" className="rounded-full bg-[var(--ink)] text-white px-5 py-2.5 font-medium hover:opacity-90">Meet the dogs</Link>
                <Link href="/more/adopt" className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 font-medium">How to adopt</Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="mt-14 rounded-[24px] border border-[var(--line)] bg-[var(--surface)] cp-shadow overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--line)]">
              <div className="flex items-center gap-2.5 text-sm font-medium">
                <span className="relative flex size-2"><span className="cp-pulse absolute inset-0 rounded-full bg-[var(--accent)]"/><span className="relative size-2 rounded-full bg-[var(--accent)]"/></span>
                Dogs in our care
              </div>
              <div className="text-xs text-[var(--muted)]">Updated from our dog profiles</div>
            </div>
            <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] overflow-x-auto bg-[color-mix(in_oklab,var(--ink)_2%,var(--surface))]">
              {columns.map(c => (
                <div key={c.title} className="border-r last:border-r-0 border-[var(--line)] p-3">
                  <div className="flex items-center justify-between px-1.5 pb-3">
                    <span className="flex items-center gap-2 text-sm font-medium"><span className="size-2 rounded-full" style={{ background: c.dot }}/>{c.title}</span>
                    <span className="text-xs text-[var(--muted)] tabular-nums">{c.total}</span>
                  </div>
                  <div className="space-y-2">
                    {c.dogs.slice(0, 4).map(d => <MiniDog key={d.href} dog={d} tag={d.size}/>)}
                    {c.total === 0 && <div className="rounded-xl border border-dashed border-[var(--line)] p-4 text-xs text-[var(--muted)] text-center">Nobody here right now</div>}
                    {c.total > 4 && <Link href={c.title === "Adopted" ? "/adopted/1" : "/dogs"} className="block rounded-xl px-2 py-2 text-xs text-[var(--muted)] hover:text-[var(--ink)]">+ {c.total - 4} more</Link>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-28 grid md:grid-cols-3 gap-4">
          <Reveal className="rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-7">
            <h3 className="font-semibold tracking-tight text-lg">Ready for a family</h3>
            <p className="text-sm text-[var(--muted)] mt-2">In Cyprus the €250 adoption fee covers it all.</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {["Pet passport", "Microchip", "Vaccinations", "Spay or neuter"].map(i => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center">
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m2.5 6.5 2 2 5-5"/></svg>
                  </span>{i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={60} className="rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-7">
            <h3 className="font-semibold tracking-tight text-lg">Adopt where you live</h3>
            <p className="text-sm text-[var(--muted)] mt-2">We work with partner organisations abroad.</p>
            <ul className="mt-6 divide-y divide-[var(--line)] text-sm">
              {[["Cyprus", "Direct with us"], ["United Kingdom", "Via partners"], ["Germany", "Via partners"], ["Netherlands", "Via partners"]].map(([c, how]) => (
                <li key={c} className="flex justify-between py-2.5"><span>{c}</span><span className="text-[var(--muted)]">{how}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[24px] bg-[var(--ink)] text-white p-7 flex flex-col justify-between">
            <h3 className="font-semibold tracking-tight text-lg">Run by volunteers</h3>
            <div>
              <div className="text-6xl font-semibold tracking-[-0.04em]">{counts.adopted}</div>
              <p className="text-sm text-white/65 mt-2">dogs adopted, with no paid staff and every euro spent on the animals.</p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-28 grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <Reveal>
            <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05]">Questions people ask before adopting</h2>
            <p className="text-[var(--muted)] mt-4">Still unsure? Email <a href="mailto:info@uanafoundation.com" className="text-[var(--ink)] underline underline-offset-4">info@uanafoundation.com</a>.</p>
          </Reveal>
          <Reveal delay={80} className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]">
            {faq.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group px-6 py-5">
                <summary className="list-none flex items-center justify-between gap-4 cursor-pointer font-medium">
                  {q}
                  <span className="size-7 shrink-0 rounded-full border border-[var(--line)] grid place-items-center transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="text-[var(--muted)] mt-3 leading-relaxed pr-10">{a}</p>
              </details>
            ))}
          </Reveal>
        </section>

        <DonateBand/>
      </main>
      <SiteFooter/>
    </div>
  )
}
