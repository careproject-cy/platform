import Link from "next/link"
import { Outfit } from "next/font/google"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import Matcher from "./matcher"
import "../_shared/motion.css"

export const metadata = draftMeta("Matchmaker")

const display = Outfit({ subsets: ["latin"], variable: "--font-display" })

const steps = [
  ["Email us", "Your country, home type, other pets, and the dog you like."],
  ["Meet", "Visit the shelter and get to know the dog with our volunteers."],
  ["Home check", "A volunteer makes sure your home suits the dog."],
  ["Adopt", "Fill in the application and welcome them home."],
]

export default async function MatchLanding() {
  const { available, adopted, counts } = await getLandingData()

  return (
    <div className={`${display.variable} bg-[#E3F4EA] text-[#1F3B2D]`}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-5xl md:text-7xl leading-[1] tracking-tight max-w-4xl">
          Answer three questions. Meet your rescue dog.
        </h1>
        <p className="text-xl text-[#1F3B2D]/70 mt-6 max-w-2xl">
          {counts.available} dogs rescued from Cyprus shelters are ready for homes in Cyprus, the UK, Germany, and the Netherlands.
        </p>
        <div className="mt-14">
          <Matcher dogs={available}/>
        </div>
      </section>

      <section className="bg-white rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-[2rem] bg-[#1F3B2D] text-white p-8 md:p-10">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">How adoption works</h2>
              <ol className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {steps.map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="shrink-0 size-9 rounded-full bg-[#FF7759] grid place-items-center font-bold">{i + 1}</span>
                    <div>
                      <div className="font-semibold text-lg">{t}</div>
                      <p className="text-white/65 mt-1">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[2rem] bg-[#FFE8A3] p-8 flex flex-col justify-between">
              <div className="font-[family-name:var(--font-display)] text-6xl font-semibold">€250</div>
              <p className="mt-4">Cyprus adoption fee. It covers the passport, microchip, vaccinations, and neutering.</p>
            </div>
            <Link href="/adopted/1" className="md:col-span-3 rounded-[2rem] border border-[#1F3B2D]/10 p-3 grid grid-cols-4 md:grid-cols-8 gap-2 relative group">
              {adopted.slice(0, 8).map(d => (
                <Photo key={d.href} src={d.img} alt={`${d.name}, adopted`} sizes="140px" className="aspect-square rounded-[1.25rem]"/>
              ))}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-5 py-3 font-semibold shadow-lg group-hover:bg-[#FF7759] group-hover:text-white transition-colors">
                {counts.adopted} dogs already matched
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
