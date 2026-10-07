import Link from "next/link"
import { Bricolage_Grotesque } from "next/font/google"
import { getLandingData, type LandingDog } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import "../_shared/motion.css"

export const metadata = draftMeta("Bento harbour")

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" })

// Rough lon/lat projection; only relative positions matter.
const pt = (lon: number, lat: number) => [(lon + 8) * 13, (58 - lat) * 12] as const
const cyprus = pt(33.4, 35)
const homes = [
  { name: "UK", at: pt(-1.5, 52.5), dy: 22 },
  { name: "Netherlands", at: pt(5.3, 52.2), dy: -12 },
  { name: "Germany", at: pt(10.4, 51), dy: 22 },
]

function Tag({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${tone === "light" ? "bg-white/85 backdrop-blur border-white text-[#14213D]" : "border-[#14213D]/15 text-[#14213D]"}`}>
      {children}
    </span>
  )
}

function DogTile({ dog }: { dog: LandingDog }) {
  return (
    <Link href={dog.href} className="group block rounded-[22px] border border-[#14213D]/10 bg-white p-2 focus-visible:outline-2 focus-visible:outline-[#1D6E8C]">
      <Photo src={dog.img} alt={dog.name} sizes="(max-width: 768px) 50vw, 25vw" className="aspect-[4/5] rounded-[16px]" imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"/>
      <div className="px-2 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold">{dog.name}</span>
          <span className="text-xs text-[#14213D]/50">{dog.ageText}</span>
        </div>
        <div className="flex gap-1.5 mt-2">
          <Tag tone="dark">{dog.gender}</Tag>
          <Tag tone="dark">{dog.size}</Tag>
          {dog.status === "In foster care" && <Tag tone="dark">In foster</Tag>}
        </div>
      </div>
    </Link>
  )
}

export default async function BentoLanding() {
  const { newest, adopted, counts } = await getLandingData()
  const star = newest[0]
  const tile = "rounded-[28px] overflow-hidden relative"

  return (
    <div className={`${display.variable} bg-[#EEF3F5] text-[#14213D]`}>
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-16">
        <div className="grid gap-3 md:grid-cols-4 md:auto-rows-[minmax(200px,auto)]">
          <div className={`${tile} md:col-span-2 md:row-span-2 bg-white p-8 md:p-10 flex flex-col justify-between border border-[#14213D]/5`}>
            <div className="flex items-center gap-2 text-sm text-[#1D6E8C] font-semibold">
              <span className="relative flex size-2.5"><span className="lp-pulse absolute inset-0 rounded-full bg-[#1D6E8C]"/><span className="relative size-2.5 rounded-full bg-[#1D6E8C]"/></span>
              {counts.available} dogs looking for a home this week
            </div>
            <h1 className="font-[family-name:var(--font-display)] font-bold text-5xl md:text-[4.25rem] leading-[0.95] tracking-[-0.03em] mt-8">
              Rescued in Cyprus. Loved all over Europe.
            </h1>
            <div className="mt-8">
              <p className="text-lg text-[#14213D]/70 max-w-md">Volunteers who give stray dogs vet care, a foster home, and a ride to their family.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/dogs" className="rounded-full bg-[#14213D] text-white px-6 py-3.5 font-semibold hover:bg-[#1D6E8C] transition-colors">Meet the dogs</Link>
                <Link href="/more/donate" className="rounded-full border border-[#14213D]/20 px-6 py-3.5 font-semibold hover:border-[#14213D] transition-colors">Donate</Link>
              </div>
            </div>
          </div>

          {star && (
            <Link href={star.href} className={`${tile} md:row-span-2 min-h-[420px] group`}>
              <Photo src={star.img} alt={star.name} priority sizes="(max-width: 768px) 100vw, 25vw" className="!absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-x-3 bottom-3 rounded-[20px] bg-white/80 backdrop-blur-md p-4 border border-white">
                <div className="text-xs font-semibold text-[#1D6E8C]">Newest arrival</div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold">{star.name}</div>
                <div className="flex gap-1.5 mt-2"><Tag tone="dark">{star.gender}</Tag><Tag tone="dark">{star.ageText}</Tag></div>
              </div>
            </Link>
          )}

          <div className={`${tile} bg-[#F6A04D] p-6 flex flex-col justify-between`}>
            <span className="text-sm font-semibold">Adopted so far</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-7xl tracking-tight">{counts.adopted}</span>
          </div>

          <Link href="/more/foster" className={`${tile} bg-[#7A8B3F] text-white p-6 flex flex-col justify-between group`}>
            <span className="text-sm font-semibold text-white/80">Can&apos;t adopt?</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-3xl leading-tight">Foster a dog while it heals<span className="inline-block ml-2 transition-transform group-hover:translate-x-1">↗</span></span>
          </Link>

          <div className={`${tile} md:col-span-2 md:row-span-2 bg-[#14213D] text-white p-8 min-h-[400px] flex flex-col justify-end`}>
            <div className="relative z-10 max-w-xs">
              <div className="font-[family-name:var(--font-display)] font-bold text-3xl">Adoptions in four countries</div>
              <p className="text-white/60 mt-2">We rehome in Cyprus and with partners in the UK, Germany, and the Netherlands.</p>
            </div>
            <svg viewBox="0 0 600 300" className="absolute inset-x-0 top-0 w-full h-[78%]" aria-hidden="true">
              <defs>
                <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" opacity=".12"/></pattern>
              </defs>
              <rect width="600" height="300" fill="url(#dots)"/>
              {homes.map((h, i) => {
                const [x, y] = h.at
                const d = `M${cyprus[0]},${cyprus[1]} Q${(cyprus[0] + x) / 2},${Math.min(y, cyprus[1]) - 40} ${x},${y}`
                return (
                  <g key={h.name}>
                    <path d={d} fill="none" stroke="#F6A04D" strokeWidth="2" className="lp-route" style={{ animationDelay: `${i * 0.35}s` }}/>
                    <path d={d} fill="none" stroke="white" strokeOpacity=".35" strokeWidth="2" className="lp-route-flow"/>
                    <circle cx={x} cy={y} r="5" fill="#F6A04D"/>
                    <text x={x} y={y + h.dy} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">{h.name}</text>
                  </g>
                )
              })}
              <circle cx={cyprus[0]} cy={cyprus[1]} r="7" fill="#F6A04D" className="lp-pulse"/>
              <circle cx={cyprus[0]} cy={cyprus[1]} r="7" fill="#F6A04D"/>
              <text x={cyprus[0]} y={cyprus[1] - 14} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">Cyprus</text>
            </svg>
          </div>

          <Link href="/more/donate" className={`${tile} bg-white border border-[#14213D]/5 p-6 flex flex-col justify-between group`}>
            <span className="font-[family-name:var(--font-display)] font-bold text-5xl text-[#1D6E8C]">€5</span>
            <span className="text-[#14213D]/70">buys a deworming tablet for a dog with parasites. <span className="text-[#14213D] font-semibold underline underline-offset-4 decoration-[#F6A04D] decoration-2">Give now</span></span>
          </Link>

          <Link href="/more/get-involved" className={`${tile} bg-[#DCE8EC] p-6 flex flex-col justify-between`}>
            <span className="text-sm font-semibold text-[#1D6E8C]">Volunteer</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-2xl leading-tight">Walk dogs, drive to the vet, or share their stories</span>
          </Link>

          <Link href="/adopted/1" className={`${tile} md:col-span-2 grid grid-cols-5 gap-1 p-1 bg-white border border-[#14213D]/5`}>
            {adopted.slice(0, 5).map(d => (
              <Photo key={d.href} src={d.img} alt={`${d.name}, adopted`} sizes="120px" className="rounded-[22px] h-full min-h-32"/>
            ))}
            <span className="absolute left-3 bottom-3 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow-sm">See all {counts.adopted} happy endings</span>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight">Waiting for you</h2>
          <Link href="/dogs" className="rounded-full border border-[#14213D]/20 px-5 py-2.5 font-semibold hover:border-[#14213D]">All {counts.available} dogs</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {newest.slice(1, 5).map(d => <DogTile key={d.href} dog={d}/>)}
        </div>
      </section>
    </div>
  )
}
