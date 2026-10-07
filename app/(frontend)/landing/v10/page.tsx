import Link from "next/link"
import { Syne } from "next/font/google"
import { getLandingData } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"
import NameList from "./nameList"
import "../_shared/motion.css"

export const metadata = draftMeta("Copper roll call")

const display = Syne({ subsets: ["latin"], variable: "--font-display", weight: ["600", "800"] })

export default async function RollCallLanding() {
  const { newest, adopted, counts } = await getLandingData()

  return (
    <div className={`${display.variable} bg-white text-[#10221C] overflow-x-clip`}>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-end">
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-5xl sm:text-6xl md:text-[7.5rem] min-w-0 leading-[0.85] tracking-[-0.04em] uppercase">
            {counts.available} names.<br/><span className="text-[#B4642D]">No homes yet.</span>
          </h1>
          <div>
            <p className="text-lg text-[#10221C]/70">
              Each name below is a Cyprus street dog our volunteers rescued and treated. Hover a name to see who&apos;s waiting.
            </p>
            <div className="flex gap-3 mt-6">
              <Link href="/more/adopt" className="rounded-full bg-[#10221C] text-white px-6 py-3.5 font-semibold hover:bg-[#B4642D] transition-colors">How to adopt</Link>
              <Link href="/more/donate" className="rounded-full border border-[#10221C] px-6 py-3.5 font-semibold">Donate</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        <NameList dogs={newest.slice(0, 10)}/>
        <Link href="/dogs" className="inline-block mt-8 font-[family-name:var(--font-display)] font-semibold text-xl underline underline-offset-8 decoration-[#B4642D] decoration-2">
          Read all {counts.available} profiles
        </Link>
      </section>

      <section className="bg-[#B4642D] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.9] tracking-tight break-words">
              {counts.adopted} names crossed off.
            </h2>
            <p className="text-xl text-white/85 mt-6 max-w-md">
              Adopted in Cyprus and through partners in the UK, Germany, and the Netherlands. All of it run by volunteers, every euro spent on the dogs.
            </p>
            <Link href="/adopted/1" className="inline-block mt-8 rounded-full bg-white text-[#10221C] px-6 py-3.5 font-semibold">See who went home</Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {adopted.slice(0, 6).map(d => (
              <div key={d.href}>
                <Photo src={d.img} alt={`${d.name}, adopted`} sizes="160px" className="aspect-square rounded-full ring-4 ring-white/20"/>
                <div className="text-center mt-2 font-semibold line-through decoration-white/60">{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-px bg-[#10221C]/15 border border-[#10221C]/15">
        {[
          ["Adopt", "Cyprus fee €250, covering passport, microchip, vaccinations, and neutering.", "/more/adopt"],
          ["Foster", "Give a dog a safe home until we find their permanent family.", "/more/foster"],
          ["Give", "€5 buys a deworming tablet. Medical care is our largest cost.", "/more/donate"],
        ].map(([t, d, href]) => (
          <Link key={t} href={href} className="bg-white p-10 group hover:bg-[#F4EDE6] transition-colors">
            <div className="font-[family-name:var(--font-display)] font-extrabold text-4xl uppercase group-hover:text-[#B4642D]">{t}</div>
            <p className="mt-4 text-[#10221C]/70 text-lg">{d}</p>
          </Link>
        ))}
        </div>
      </section>
    </div>
  )
}
