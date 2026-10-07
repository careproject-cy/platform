import Link from "next/link"
import { Caveat, Fraunces } from "next/font/google"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import "../_shared/motion.css"

export const metadata = draftMeta("Polaroid fan")

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["SOFT", "opsz"] })
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" })

const fan = [
  { rot: -14, x: "-58%", y: "10%" },
  { rot: -6, x: "-30%", y: "-2%" },
  { rot: 3, x: "0%", y: "-6%" },
  { rot: 11, x: "30%", y: "2%" },
  { rot: 18, x: "56%", y: "14%" },
]

const steps = [
  ["Rescued", "From a municipal shelter or the street."],
  ["Treated", "Vaccines, neutering, and care for tick-borne disease."],
  ["Fostered", "Learning to trust people in a real home."],
  ["Home", "In Cyprus, the UK, Germany, or the Netherlands."],
]

export default async function PolaroidLanding() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className={`${display.variable} ${hand.variable} bg-[#D7ECF7] text-[#16324F]`}>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center overflow-hidden">
        <div className="lp-rise">
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl leading-[0.98] tracking-tight" style={{ fontVariationSettings: '"SOFT" 100' }}>
            Every one of these dogs has a name, a story, and a place on your sofa.
          </h1>
          <p className="text-xl mt-6 max-w-lg text-[#16324F]/75">
            {counts.available} rescued Cyprus dogs are vet-treated and waiting. Volunteers will help you find the one that fits.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dogs" className="rounded-2xl bg-[#16324F] text-white px-7 py-4 font-semibold shadow-[4px_4px_0_#FFCF3F] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#FFCF3F] transition-all">Meet the dogs</Link>
            <Link href="/more/donate" className="rounded-2xl bg-white border-2 border-[#16324F] px-7 py-4 font-semibold">Sponsor their care</Link>
          </div>
        </div>
        <div className="relative h-[460px] md:h-[520px]">
          {newest.slice(0, 5).map((d, i) => (
            <Link key={d.href} href={d.href}
                  className="absolute left-1/2 top-1/2 w-52 md:w-60 bg-white p-3 pb-4 shadow-[0_18px_40px_-12px_rgba(22,50,79,.35)] hover:!z-50 hover:-translate-y-3 transition-transform"
                  style={{ transform: `translate(calc(-50% + ${fan[i].x}), calc(-50% + ${fan[i].y})) rotate(${fan[i].rot}deg)`, zIndex: i === 2 ? 10 : 5 - Math.abs(2 - i) }}>
              <div className="lp-fan" style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                <Photo src={d.img} alt={d.name} priority={i === 2} sizes="240px" className="aspect-square"/>
                <div className="font-[family-name:var(--font-hand)] text-3xl mt-2 text-center">{d.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-y-2 border-[#16324F]">
        <ol className="max-w-7xl mx-auto grid md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="p-8 border-[#16324F] md:border-r-2 last:border-r-0 max-md:border-b-2 max-md:last:border-b-0">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-full border-2 border-[#16324F] grid place-items-center font-bold">{i + 1}</span>
                <span className="font-[family-name:var(--font-display)] text-3xl">{t}</span>
              </div>
              <p className="mt-3 text-[#16324F]/70">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-tight">Pinned to our board this week</h2>
          <Link href="/dogs" className="font-semibold underline decoration-[#FFCF3F] decoration-4 underline-offset-4">See all {counts.available}</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {newest.slice(5, 9).map((d, i) => (
            <Link key={d.href} href={d.href} className="bg-white p-3 pb-5 shadow-[0_10px_30px_-12px_rgba(22,50,79,.3)] hover:rotate-0 transition-transform"
                  style={{ transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)` }}>
              <span className="block mx-auto -mt-6 mb-2 w-16 h-5 bg-[#FFCF3F]/80 rotate-[-3deg]" aria-hidden="true"/>
              <Photo src={d.img} alt={d.name} sizes="25vw" className="aspect-square"/>
              <div className="font-[family-name:var(--font-hand)] text-3xl mt-3">{d.name}</div>
              <div className="text-sm text-[#16324F]/60">{d.gender}, {d.ageText}, {d.size}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#16324F] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-tight">{counts.adopted} dogs have gone home</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-12">
            {adopted.slice(0, 6).map((d, i) => (
              <div key={d.href} className="relative">
                <Photo src={d.img} alt={`${d.name}, adopted`} sizes="180px" className="aspect-[3/4] rounded-lg"/>
                {i % 2 === 0 && (
                  <span className="absolute -top-3 -right-2 rotate-12 rounded-md border-2 border-[#FFCF3F] text-[#FFCF3F] bg-[#16324F] px-2 py-0.5 text-xs font-black tracking-wider">ADOPTED</span>
                )}
                <div className="font-[family-name:var(--font-hand)] text-2xl mt-2">{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
