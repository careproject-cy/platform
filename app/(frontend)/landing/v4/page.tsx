import Link from "next/link"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"

export const metadata = draftMeta("Warm editorial")

const ways = [
  { title: "Adopt", text: "Give a dog a home in Cyprus, the UK, Germany, or the Netherlands.", href: "/more/adopt", tone: "bg-[#E8603C] text-white" },
  { title: "Foster", text: "Open your home while a dog recovers and learns to trust.", href: "/more/foster", tone: "bg-[#F2C14E] text-[#3B2A1A]" },
  { title: "Donate", text: "Medical care is our biggest cost. Even €5 buys a deworming tablet.", href: "/more/donate", tone: "bg-[#3B2A1A] text-[#FBF5EC]" },
  { title: "Volunteer", text: "Walk, socialise, drive to the vet, or share a dog's story.", href: "/more/get-involved", tone: "bg-[#8DB596] text-[#1F3324]" },
]

const wishlist = ["Blankets, beds & towels", "Tough rubber toys", "Fly traps", "Cleaning supplies"]

export default async function EditorialLanding() {
  const { newest, adopted, posts, counts } = await getLandingData()
  const [a, b, c] = newest
  const [lead, ...rest] = posts

  return (
    <div className="bg-[#FBF5EC] text-[#3B2A1A]">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-sm tracking-widest uppercase text-[#E8603C]">Cyprus · run by volunteers</p>
          <h1 className="font-serif font-extrabold text-6xl md:text-8xl leading-[0.95] mt-6 tracking-tight">
            Small team.<br/>Big hearts.<br/><span className="italic font-medium text-[#E8603C]">Lucky dogs.</span>
          </h1>
          <p className="text-xl leading-relaxed mt-8 max-w-lg text-[#5C4630]">
            We all have full-time jobs and families. We also have {counts.available} stray dogs who need a sofa, and {counts.adopted} who already found one.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/dogs" className="rounded-full bg-[#3B2A1A] text-[#FBF5EC] px-8 py-4 font-semibold text-lg">Meet the dogs</Link>
            <Link href="/more/about" className="rounded-full border-2 border-[#3B2A1A] px-8 py-4 font-semibold text-lg">Our story</Link>
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[560px]">
          {a && <Photo src={a.img} alt={a.name} priority sizes="40vw" className="col-span-4 row-span-4 rounded-[2rem] rotate-[-1.5deg] shadow-xl"/>}
          {b && <Photo src={b.img} alt={b.name} sizes="20vw" className="col-span-2 row-span-3 rounded-full shadow-lg"/>}
          {c && <Photo src={c.img} alt={c.name} sizes="30vw" className="col-start-3 col-span-4 row-span-2 rounded-[2rem] shadow-lg rotate-[1deg]"/>}
          <div className="col-start-1 row-start-5 col-span-2 row-span-2 rounded-[2rem] bg-[#F2C14E] p-5 flex flex-col justify-end">
            <div className="font-serif font-extrabold text-4xl">{counts.adopted}</div>
            <div className="text-sm font-semibold">happy endings so far</div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#3B2A1A]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4">
          {ways.map(w => (
            <Link key={w.title} href={w.href} className={`${w.tone} p-8 min-h-64 flex flex-col justify-between hover:brightness-105`}>
              <span className="font-serif font-extrabold text-4xl">{w.title}</span>
              <span className="text-lg leading-snug opacity-90">{w.text}</span>
            </Link>
          ))}
        </div>
      </section>

      {lead && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between border-b-2 border-[#3B2A1A] pb-4">
            <h2 className="font-serif font-extrabold text-5xl">From the journal</h2>
            <Link href="/blog" className="font-semibold">All stories →</Link>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 mt-10">
            <Link href={lead.href} className="group">
              <Photo src={lead.img} alt={lead.title} sizes="60vw" className="aspect-[16/10] rounded-[2rem]"/>
              <h3 className="font-serif font-extrabold text-4xl mt-6 group-hover:text-[#E8603C]">{lead.title}</h3>
              <p className="text-lg text-[#5C4630] mt-3 line-clamp-2">{lead.description}</p>
            </Link>
            <div className="flex flex-col divide-y divide-[#3B2A1A]/20">
              {rest.slice(0, 4).map(p => (
                <Link key={p.href} href={p.href} className="py-5 first:pt-0 flex gap-5 group">
                  <Photo src={p.img} alt={p.title} sizes="120px" className="size-24 shrink-0 rounded-2xl"/>
                  <div>
                    <h3 className="font-serif font-bold text-xl leading-snug group-hover:text-[#E8603C]">{p.title}</h3>
                    <p className="text-sm text-[#5C4630] mt-1 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#3B2A1A] text-[#FBF5EC] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif font-extrabold text-5xl">Happy tails</h2>
          <div className="columns-2 md:columns-4 gap-4 mt-10 [&>*]:mb-4">
            {adopted.slice(0, 8).map((d, i) => (
              <Link key={d.href} href={d.href} className="block break-inside-avoid">
                <Photo src={d.img} alt={`${d.name}, adopted`} sizes="25vw" className={`rounded-2xl ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}/>
                <div className="font-serif font-bold mt-2">{d.name} <span className="font-normal opacity-60">· home</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <blockquote className="font-serif text-3xl md:text-4xl leading-snug italic">
          &ldquo;We are not a shelter, but we assist wherever needed and strive to give every dog a chance at a better life.&rdquo;
          <footer className="not-italic font-sans text-base mt-6 text-[#5C4630]">CARE Project volunteers</footer>
        </blockquote>
        <div className="rounded-[2rem] bg-white p-8 ring-2 ring-[#3B2A1A]">
          <h3 className="font-serif font-extrabold text-2xl">Shelter wishlist</h3>
          <ul className="mt-4 space-y-3">
            {wishlist.map(w => (
              <li key={w} className="flex items-center gap-3 text-lg"><span className="size-3 rounded-full bg-[#E8603C]"/>{w}</li>
            ))}
          </ul>
          <Link href="/more/get-involved" className="inline-block mt-6 font-semibold underline underline-offset-4">How to drop off supplies</Link>
        </div>
      </section>
    </div>
  )
}
