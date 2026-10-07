import Image from "next/image"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import type { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import Reveal from "../_kit/reveal"
import DogTabs from "./dogTabs"

export const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" })

export const bTheme = {
  "--accent": "#166534",
  "--accent-soft": "#eef6f0",
  "--ink": "#101a14",
  "--muted": "#5d6a62",
  "--line": "#e3e8e4",
} as React.CSSProperties

// Concept B below the hero, shared by the hero experiments.
export default function BBody({ data }: { data: Awaited<ReturnType<typeof getLandingData>> }) {
  const { available, adopted, posts, counts } = data
  const lead = posts[0]
  return (
    <>
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

    </>
  )
}
