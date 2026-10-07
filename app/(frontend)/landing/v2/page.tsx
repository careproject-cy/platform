import Link from "next/link"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import DogFinder from "./dogFinder"

export const metadata = draftMeta("Find your match")

const steps = [
  ["Email us", "Tell us your country, home type, other pets, and which dog caught your eye."],
  ["Meet the dog", "Visit the shelter, meet our volunteers, and get to know the dog in person."],
  ["Home check", "A volunteer checks your home suits the dog's needs."],
  ["Apply & adopt", "Fill in the application. In Cyprus the €250 fee covers passport, microchip, vaccines, and neutering."],
]

export default async function FinderLanding() {
  const { newest, counts } = await getLandingData()

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-b from-teal-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-teal-200 px-4 py-1.5 text-sm font-semibold text-teal-800">
            <span className="size-2 rounded-full bg-teal-500"/> {counts.available} dogs available right now
          </div>
          <h1 className="font-serif font-bold text-5xl md:text-6xl text-slate-900 mt-6 max-w-3xl leading-tight">
            Find the Cyprus rescue dog that fits your life.
          </h1>
          <p className="text-xl text-slate-600 mt-5 max-w-2xl">
            Adopt in Cyprus, the UK, Germany, or the Netherlands. Filter by what matters to you and meet your match.
          </p>
          <div className="mt-10">
            <DogFinder dogs={newest}/>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-serif font-bold text-3xl text-slate-900">How adoption works</h2>
        <ol className="grid md:grid-cols-4 gap-4 mt-8">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-white rounded-2xl ring-1 ring-slate-200 p-6">
              <div className="size-10 rounded-full bg-teal-700 text-white grid place-items-center font-bold">{i + 1}</div>
              <div className="font-bold text-lg text-slate-900 mt-4">{t}</div>
              <p className="text-slate-600 mt-2">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/more/adopt" className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 font-semibold">Read the adoption guide</Link>
          <Link href="/more/foster" className="rounded-xl bg-white ring-1 ring-slate-300 px-6 py-3 font-semibold text-slate-800">Can&apos;t adopt? Foster instead</Link>
        </div>
      </section>

      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8 text-center">
          {[
            [counts.small, "small dogs"],
            [counts.medium, "medium dogs"],
            [counts.large, "large dogs"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif font-bold text-4xl text-teal-700">{n}</div>
              <div className="text-slate-500">{l} waiting</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
