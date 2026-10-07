import Link from "next/link"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"

export const metadata = draftMeta("Story-led")

const journey = [
  { step: "01", title: "Rescue", text: "We find dogs in municipal shelters and on the streets of Cyprus." },
  { step: "02", title: "Vet care", text: "Exams, vaccines, spay/neuter, and treatment for leishmaniasis and tick diseases." },
  { step: "03", title: "Foster & socialise", text: "Recovery in a home, learning trust, leads, and family life." },
  { step: "04", title: "Forever home", text: "Adoption in Cyprus or travel to families in the UK, Germany, and the Netherlands." },
]

export default async function StoryLanding() {
  const { newest, adopted, counts } = await getLandingData()
  const hero = newest[0]
  const spotlight = newest[1] ?? hero
  const more = newest.slice(2, 6)

  return (
    <div className="bg-stone-50 text-stone-900">
      <section className="relative min-h-[620px] flex items-end">
        {hero && <Photo src={hero.img} alt={hero.name} priority sizes="100vw" className="!absolute inset-0" imgClassName="object-[center_30%]"/>}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"/>
        <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 pt-40 text-white">
          <p className="uppercase tracking-[0.2em] text-sm text-orange-300 font-semibold">Cyprus Animals Rescue Effort</p>
          <h1 className="font-serif font-bold text-5xl md:text-7xl leading-[1.05] max-w-3xl mt-4">
            They waited on the streets. Now they&apos;re waiting for you.
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mt-6">
            A volunteer team giving Cyprus stray dogs vet care, a foster sofa, and a way home.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dogs" className="rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-4 font-semibold text-lg">Meet the dogs</Link>
            <Link href="/more/donate" className="rounded-full bg-white/10 backdrop-blur border border-white/40 px-7 py-4 font-semibold text-lg">Donate</Link>
          </div>
          {hero && <p className="mt-10 text-sm text-stone-300">Pictured: {hero.name}, {hero.ageText.toLowerCase()}, looking for a home</p>}
        </div>
      </section>

      <section className="bg-orange-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            [counts.available, "dogs looking for a home"],
            [counts.adopted, "dogs already adopted"],
            [3, "partner countries abroad"],
            ["100%", "volunteer-run"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <div className="font-serif font-bold text-4xl md:text-5xl">{n}</div>
              <div className="text-orange-100 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-serif font-bold text-4xl md:text-5xl max-w-2xl">From a shelter kennel to a sofa of their own</h2>
        <div className="grid md:grid-cols-4 gap-8 mt-14">
          {journey.map(j => (
            <div key={j.step} className="border-t-4 border-orange-500 pt-6">
              <div className="text-orange-500 font-mono font-bold">{j.step}</div>
              <h3 className="font-serif font-bold text-2xl mt-2">{j.title}</h3>
              <p className="text-stone-600 mt-3 leading-relaxed">{j.text}</p>
            </div>
          ))}
        </div>
      </section>

      {spotlight && (
        <section className="bg-white border-y border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
            <Photo src={spotlight.img} alt={spotlight.name} className="aspect-[4/5] rounded-3xl shadow-2xl"/>
            <div>
              <p className="uppercase tracking-[0.2em] text-sm text-orange-600 font-semibold">Dog of the week</p>
              <h2 className="font-serif font-bold text-6xl mt-3">{spotlight.name}</h2>
              <p className="text-xl text-stone-600 mt-4">{spotlight.breed} · {spotlight.gender} · {spotlight.ageText}</p>
              <p className="text-lg text-stone-700 mt-6 leading-relaxed">
                Every dog in our care gets full vet care before adoption. Read the full story and see if you&apos;re a match.
              </p>
              <Link href={spotlight.href} className="inline-block mt-8 rounded-full bg-stone-900 text-white px-7 py-4 font-semibold">Read {spotlight.name}&apos;s story</Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif font-bold text-4xl">Also waiting</h2>
          <Link href="/dogs" className="text-orange-600 font-semibold">All {counts.available} dogs →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {more.map(d => (
            <Link key={d.href} href={d.href} className="group">
              <Photo src={d.img} alt={d.name} sizes="25vw" className="aspect-square rounded-2xl group-hover:scale-[1.02] transition"/>
              <div className="font-serif font-bold text-xl mt-3">{d.name}</div>
              <div className="text-stone-500 text-sm">{d.gender} · {d.ageText}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 text-white py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif font-bold text-4xl">Happy tails</h2>
          <p className="text-stone-400 mt-3 text-lg">{counts.adopted} dogs who made it home.</p>
        </div>
        <div className="flex gap-4 mt-10 px-6">
          {adopted.slice(0, 8).map((d, i) => (
            <Photo key={d.href} src={d.img} alt={`${d.name}, adopted`} sizes="240px"
                   className={`shrink-0 w-56 aspect-[3/4] rounded-2xl ${i % 2 ? "mt-10" : ""}`}/>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-serif font-bold text-5xl md:text-6xl">€5</p>
        <p className="text-2xl mt-4 text-stone-700">buys a deworming tablet for a dog suffering from parasites.</p>
        <Link href="/more/donate" className="inline-block mt-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-9 py-4 font-semibold text-lg">Give €5 today</Link>
      </section>
    </div>
  )
}
