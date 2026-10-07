import Link from "next/link"
import { Gabarito } from "next/font/google"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import "../_shared/motion.css"

export const metadata = draftMeta("Soft clay")

const display = Gabarito({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "900"] })

const clay = "shadow-[inset_0_2px_0_rgba(255,255,255,.7),0_14px_30px_-12px_rgba(30,27,58,.35)]"
const tints = ["#A8F0D1", "#FFC2A1", "#FFF1A8", "#C9D8FF"]

const stickers = [
  { cls: "left-[2%] top-[8%] w-36 md:w-44", r: -8, d: 0 },
  { cls: "right-[3%] top-[4%] w-32 md:w-40", r: 7, d: 1.2 },
  { cls: "left-[8%] bottom-[2%] w-28 md:w-36", r: 5, d: 2.1 },
  { cls: "right-[9%] bottom-[6%] w-36 md:w-44", r: -6, d: 0.6 },
]

export default async function ClayLanding() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className={`${display.variable} bg-[#E9E3FF] text-[#1E1B3A] overflow-hidden`}>
      <section className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 min-h-[640px] grid place-items-center">
        {newest.slice(0, 4).map((d, i) => (
          <Link key={d.href} href={d.href} className={`absolute max-md:hidden ${stickers[i].cls}`}>
            <div className="lp-float rounded-[2rem] bg-white p-2 shadow-[0_18px_40px_-14px_rgba(30,27,58,.45)]"
                 style={{ ["--r" as string]: `${stickers[i].r}deg`, animationDelay: `${stickers[i].d}s` }}>
              <Photo src={d.img} alt={d.name} sizes="180px" className="aspect-square rounded-[1.5rem]"/>
              <div className="font-[family-name:var(--font-display)] font-bold text-center py-1">{d.name}</div>
            </div>
          </Link>
        ))}
        <div className="relative z-10 text-center max-w-2xl">
          <span className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold ${clay}`}>
            <span className="size-2 rounded-full bg-[#2BB673]"/> {counts.available} dogs available
          </span>
          <h1 className="font-[family-name:var(--font-display)] font-black text-6xl md:text-8xl leading-[0.92] tracking-tight mt-8">
            Good dogs, soft landing.
          </h1>
          <p className="text-xl mt-6 text-[#1E1B3A]/70">
            Cyprus street dogs, vet-treated by volunteers and ready to swap the shelter for your sofa.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Link href="/dogs" className={`rounded-2xl bg-[#1E1B3A] text-white px-8 py-4 font-bold hover:-translate-y-0.5 transition-transform`}>Find my dog</Link>
            <Link href="/more/donate" className={`rounded-2xl bg-white px-8 py-4 font-bold hover:-translate-y-0.5 transition-transform ${clay}`}>Donate</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-12 gap-4">
          <div className={`md:col-span-5 rounded-[2.5rem] bg-white p-8 ${clay}`}>
            <h2 className="font-[family-name:var(--font-display)] font-black text-4xl">Fresh faces</h2>
            <p className="text-[#1E1B3A]/60 mt-2">Most recently added to our programme.</p>
            <ul className="mt-6 space-y-3">
              {newest.slice(4, 8).map((d, i) => (
                <li key={d.href}>
                  <Link href={d.href} className="flex items-center gap-4 rounded-3xl p-2 pr-4 hover:bg-[#F4F1FF] transition-colors">
                    <Photo src={d.img} alt={d.name} sizes="64px" className="size-16 rounded-2xl shrink-0"/>
                    <div className="flex-1">
                      <div className="font-[family-name:var(--font-display)] font-bold text-xl">{d.name}</div>
                      <div className="text-sm text-[#1E1B3A]/60">{d.ageText}</div>
                    </div>
                    <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: tints[i % 4] }}>{d.size}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className={`rounded-[2.5rem] bg-[#A8F0D1] p-8 flex flex-col justify-between ${clay}`}>
              <span className="font-semibold">Adopted</span>
              <span className="font-[family-name:var(--font-display)] font-black text-7xl">{counts.adopted}</span>
            </div>
            <Link href="/more/donate" className={`rounded-[2.5rem] bg-[#FFC2A1] p-8 flex flex-col justify-between ${clay}`}>
              <span className="font-semibold">Donate</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-2xl leading-tight">€5 buys a deworming tablet</span>
            </Link>
            <Link href="/more/foster" className={`rounded-[2.5rem] bg-[#FFF1A8] p-8 flex flex-col justify-between ${clay}`}>
              <span className="font-semibold">Foster</span>
              <span className="font-[family-name:var(--font-display)] font-bold text-2xl leading-tight">Host a dog until their family is found</span>
            </Link>
            <Link href="/adopted/1" className={`rounded-[2.5rem] bg-white p-3 grid grid-cols-2 gap-2 ${clay}`}>
              {adopted.slice(0, 4).map(d => (
                <Photo key={d.href} src={d.img} alt={`${d.name}, adopted`} sizes="120px" className="aspect-square rounded-[1.5rem]"/>
              ))}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
