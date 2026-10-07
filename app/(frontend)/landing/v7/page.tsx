import Link from "next/link"
import { Unbounded } from "next/font/google"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import CountUp from "./countUp"

export const metadata = draftMeta("Lantern night")

const display = Unbounded({ subsets: ["latin"], variable: "--font-display" })

const needs = ["Blankets & towels", "Tough rubber toys", "Fly traps", "Cleaning supplies"]

export default async function LanternLanding() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className={`${display.variable} bg-[#0F2A2E] text-[#F1E3C8]`}>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <h1 className="font-[family-name:var(--font-display)] font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
            The shelter lights stay on for {counts.available} dogs tonight. Help us turn them off for good.
          </h1>
          <div className="rounded-[2rem] border border-[#F1E3C8]/15 p-6 min-w-60">
            <div className="font-[family-name:var(--font-display)] text-6xl font-semibold text-[#FFB547]"><CountUp to={counts.adopted}/></div>
            <div className="text-[#F1E3C8]/70 mt-1">dogs adopted through CARE</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-10">
          <Link href="/dogs" className="rounded-full bg-[#FFB547] text-[#0F2A2E] px-7 py-4 font-bold hover:bg-[#FFC46B] transition-colors">Meet the dogs</Link>
          <Link href="/more/donate" className="rounded-full border border-[#F1E3C8]/40 px-7 py-4 font-semibold hover:border-[#F1E3C8] transition-colors">Donate to their care</Link>
        </div>
      </section>

      <section aria-label="Dogs looking for a home" className="pb-20">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 xl:px-[calc((100vw-80rem)/2+1.5rem)] scroll-px-6 pb-4 [scrollbar-width:none]">
          {newest.slice(0, 10).map(d => (
            <Link key={d.href} href={d.href} className="snap-start shrink-0 relative w-64 md:w-72 aspect-[3/4] rounded-[1.75rem] overflow-hidden group focus-visible:outline-2 focus-visible:outline-[#FFB547]">
              <Photo src={d.img} alt={d.name} sizes="300px" className="!absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A2E]/80 via-transparent"/>
              <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{d.name}</div>
                  <div className="text-sm text-white/75">{d.ageText}</div>
                </div>
                <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 text-xs font-semibold text-white">{d.size}</span>
              </div>
            </Link>
          ))}
          <Link href="/dogs" className="snap-start shrink-0 w-64 md:w-72 aspect-[3/4] rounded-[1.75rem] border border-dashed border-[#F1E3C8]/30 grid place-items-center text-center p-8 hover:border-[#FFB547]">
            <span className="font-[family-name:var(--font-display)] text-xl">See all {counts.available} dogs</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#F1E3C8] text-[#0F2A2E] rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-3xl md:text-5xl tracking-tight max-w-2xl">Four ways to keep the lights off</h2>
          <div className="grid md:grid-cols-6 gap-3 mt-12">
            <Link href="/more/adopt" className="md:col-span-4 md:row-span-2 rounded-[2rem] bg-[#0F2A2E] text-[#F1E3C8] p-8 flex flex-col justify-between min-h-80 relative overflow-hidden group">
              {adopted[0] && <Photo src={adopted[0].img} alt={adopted[0].name} sizes="40vw" className="!absolute right-0 top-0 h-full w-1/2" imgClassName="opacity-80"/>}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A2E] via-[#0F2A2E]/90 to-transparent"/>
              <span className="relative rounded-full border border-[#FFB547] text-[#FFB547] px-3 py-1 text-sm w-fit">Adopt</span>
              <div className="relative max-w-sm">
                <div className="font-[family-name:var(--font-display)] text-3xl font-semibold">Adopt in Cyprus or abroad</div>
                <p className="text-[#F1E3C8]/70 mt-3">The €250 Cyprus fee covers passport, microchip, vaccinations, and neutering. We also rehome to the UK, Germany, and the Netherlands.</p>
              </div>
            </Link>
            <Link href="/more/foster" className="md:col-span-2 rounded-[2rem] bg-[#FFB547] p-7 flex flex-col justify-between min-h-40">
              <span className="rounded-full border border-[#0F2A2E]/40 px-3 py-1 text-sm w-fit">Foster</span>
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold">Lend a dog your home while it heals</span>
            </Link>
            <Link href="/more/donate" className="md:col-span-2 rounded-[2rem] bg-[#FF6B57] text-white p-7 flex flex-col justify-between min-h-40">
              <span className="rounded-full border border-white/50 px-3 py-1 text-sm w-fit">Donate</span>
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold">€5 buys a deworming tablet</span>
            </Link>
            <Link href="/more/get-involved" className="md:col-span-3 rounded-[2rem] border-2 border-[#0F2A2E] p-7">
              <span className="rounded-full border border-[#0F2A2E]/40 px-3 py-1 text-sm">Volunteer</span>
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold mt-6">Walk, socialise, drive to the vet, or share a dog&apos;s story online.</p>
            </Link>
            <div className="md:col-span-3 rounded-[2rem] bg-white p-7">
              <span className="rounded-full border border-[#0F2A2E]/40 px-3 py-1 text-sm">Shelter wishlist</span>
              <div className="flex flex-wrap gap-2 mt-6">
                {needs.map(n => <span key={n} className="rounded-xl bg-[#F1E3C8] px-3 py-2 font-medium">{n}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
