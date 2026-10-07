import Link from "next/link"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import GiveWidget from "./giveWidget"

export const metadata = draftMeta("Impact & transparency")

const spend = [
  ["Medical treatment", "Our largest cost: vet exams, surgery, vaccinations, and sterilisation."],
  ["Long-term illness", "Leishmaniasis, ehrlichiosis, anaplasmosis, and giardiasis need months of costly treatment."],
  ["Food, bedding & supplies", "Blankets, chew-safe toys, and cleaning supplies for the shelter kennels."],
  ["Transport", "Trips to the vet, to foster homes, and on to adopters."],
]

export default async function ImpactLanding() {
  const { newest, adopted, counts } = await getLandingData()
  const collage = newest.slice(0, 3)

  return (
    <div className="bg-[#F6F4EE] text-slate-900">
      <section className="bg-emerald-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-bold text-6xl text-amber-400">{counts.adopted}</span>
              <span className="text-emerald-100 text-lg">dogs rehomed so far</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-6xl leading-tight mt-6">
              Every euro goes to the dogs. No paid staff.
            </h1>
            <p className="text-lg text-emerald-100/90 mt-6 max-w-xl">
              CARE Project is run by volunteers of the UANA Foundation, a registered nonprofit in Cyprus. Your gift pays for vet care, recovery, and the journey home.
            </p>
            <div className="flex -space-x-4 mt-10">
              {collage.map(d => (
                <Photo key={d.href} src={d.img} alt={d.name} sizes="96px" className="size-20 rounded-full ring-4 ring-emerald-950"/>
              ))}
              <div className="size-20 rounded-full ring-4 ring-emerald-950 bg-amber-400 text-emerald-950 grid place-items-center font-bold">+{Math.max(counts.available - collage.length, 0)}</div>
            </div>
            <p className="text-sm text-emerald-200 mt-3">{counts.available} dogs in our care need you today</p>
          </div>
          <GiveWidget/>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif font-bold text-4xl">Where your money goes</h2>
        <p className="text-slate-600 text-lg mt-3 max-w-2xl">We support a municipal shelter and help other shelters across Cyprus. Here is what donations pay for, biggest cost first.</p>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {spend.map(([t, d], i) => (
            <div key={t} className="bg-white rounded-2xl p-6 flex gap-5 ring-1 ring-slate-200">
              <div className="font-serif font-bold text-3xl text-amber-500 w-8">{i + 1}</div>
              <div>
                <div className="font-bold text-lg">{t}</div>
                <p className="text-slate-600 mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-serif font-bold text-4xl">Dogs your gift is helping now</h2>
            <Link href="/dogs" className="text-emerald-800 font-semibold">See all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            {newest.slice(0, 4).map(d => (
              <Link key={d.href} href={d.href} className="rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-[#F6F4EE]">
                <Photo src={d.img} alt={d.name} sizes="25vw" className="aspect-square"/>
                <div className="p-4">
                  <div className="font-serif font-bold text-lg">{d.name}</div>
                  <div className="text-sm text-slate-500">{d.status === "In foster care" ? "Recovering in foster" : "Waiting for a home"}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          ["Adopted", `${counts.adopted} dogs`, "in Cyprus, the UK, Germany, and the Netherlands"],
          ["Waiting", `${counts.available} dogs`, "available or recovering in foster today"],
          ["Team", "100% volunteers", "with full-time jobs and families of their own"],
        ].map(([k, v, d]) => (
          <div key={k} className="rounded-2xl bg-emerald-900 text-white p-8">
            <div className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">{k}</div>
            <div className="font-serif font-bold text-3xl mt-2">{v}</div>
            <div className="text-emerald-100/80 mt-2">{d}</div>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex gap-3 overflow-hidden rounded-3xl">
          {adopted.slice(0, 6).map(d => (
            <Photo key={d.href} src={d.img} alt={`${d.name}, adopted`} sizes="200px" className="flex-1 aspect-[3/4] min-w-0"/>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-4">A few of the {counts.adopted} dogs donors have already helped home. <Link href="/adopted/1" className="text-emerald-800 font-semibold">See them all</Link></p>
      </section>
    </div>
  )
}
