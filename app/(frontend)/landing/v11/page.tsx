import Link from "next/link"
import { Bowlby_One } from "next/font/google"
import { getLandingData, type LandingDog } from "../_shared/data"
import { draftMeta } from "../_shared/meta"
import Photo from "../_shared/photo"

export const metadata = draftMeta("Riso sun")

const display = Bowlby_One({ subsets: ["latin"], weight: "400", variable: "--font-display" })

const blue = "#0078BF"
const sun = "#FFE14D"
const halftone = "radial-gradient(circle, rgba(0,120,191,.18) 1px, transparent 1.6px) 0 0 / 7px 7px"

function Duotone({ dog, className = "", sizes = "33vw" }: { dog: LandingDog; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#FFE14D] ${className}`}>
      <Photo src={dog.img} alt={dog.name} sizes={sizes} className="!absolute inset-0" imgClassName="grayscale contrast-125 brightness-110 mix-blend-multiply"/>
      <div className="absolute inset-0 pointer-events-none bg-[#0078BF] mix-blend-lighten"/>
      <div className="absolute inset-0 pointer-events-none" style={{ background: halftone }}/>
    </div>
  )
}

export default async function RisoLanding() {
  const { newest, adopted, counts } = await getLandingData()
  const star = newest[0]
  const ring = "ADOPT ✺ FOSTER ✺ DONATE ✺ VOLUNTEER ✺ ADOPT ✺ FOSTER ✺ DONATE ✺ VOLUNTEER ✺ "

  return (
    <div className={`${display.variable} bg-[#FBFBF8] overflow-x-clip`} style={{ color: blue }}>
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl leading-[0.9] uppercase">
            Made in Cyprus. Raised on sunshine. Ready for you.
          </h1>
          <p className="text-xl mt-8 max-w-md font-medium">
            {counts.available} rescued street dogs are looking for families. Volunteers handle the vet care, the paperwork, and the journey.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/dogs" className="rounded-full px-8 py-4 font-bold text-white" style={{ background: blue }}>Meet the dogs</Link>
            <Link href="/more/donate" className="rounded-full px-8 py-4 font-bold border-[3px]" style={{ borderColor: blue }}>Donate</Link>
          </div>
        </div>
        {star && (
          <Link href={star.href} className="relative mx-auto w-full max-w-[520px] aspect-square">
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full motion-safe:animate-[spin_40s_linear_infinite]" aria-hidden="true">
              <defs><path id="ring" d="M250,250 m-225,0 a225,225 0 1,1 450,0 a225,225 0 1,1 -450,0"/></defs>
              <text fill={blue} fontSize="22" fontWeight="800" letterSpacing="4"><textPath href="#ring">{ring}</textPath></text>
            </svg>
            <div className="absolute inset-[12%] rounded-full overflow-hidden" style={{ background: sun }}>
              <Duotone dog={star} className="!absolute inset-0" sizes="420px"/>
            </div>
            <span className="absolute right-[6%] bottom-[10%] rotate-[-8deg] rounded-full px-5 py-2 font-[family-name:var(--font-display)] text-xl text-white" style={{ background: blue }}>
              Hi, I&apos;m {star.name}
            </span>
          </Link>
        )}
      </section>

      <section style={{ background: blue }} className="text-[#FBFBF8]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between gap-6 font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase">
          <span>{counts.available} waiting</span><span style={{ color: sun }}>✺</span>
          <span>{counts.adopted} adopted</span><span style={{ color: sun }}>✺</span>
          <span>4 countries</span><span style={{ color: sun }}>✺</span>
          <span>0 paid staff</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl uppercase">This week&apos;s sunbathers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {newest.slice(1, 9).map((d, i) => (
            <Link key={d.href} href={d.href} className="group">
              <Duotone dog={d} className={`aspect-square ${i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-[2rem]" : "rounded-t-full"}`} sizes="25vw"/>
              <div className="flex items-center justify-between mt-3">
                <span className="font-[family-name:var(--font-display)] text-2xl uppercase group-hover:underline">{d.name}</span>
                <span className="rounded-full border-2 px-2.5 py-0.5 text-xs font-bold" style={{ borderColor: blue }}>{d.size}</span>
              </div>
              <div className="text-sm font-medium opacity-75">{d.gender}, {d.ageText}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ background: sun }}>
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl uppercase leading-[0.95]">€5 = one deworming tablet</h2>
            <p className="text-xl mt-6 font-medium max-w-md">Medical care is our biggest cost. Long-term treatment for leishmaniasis and tick diseases adds up fast.</p>
            <Link href="/more/donate" className="inline-block mt-8 rounded-full px-8 py-4 font-bold text-white" style={{ background: blue }}>Give €5</Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {adopted.slice(0, 6).map(d => (
              <div key={d.href} className="relative aspect-[3/4] overflow-hidden rounded-2xl" style={{ background: "#FBFBF8" }}>
                <Photo src={d.img} alt={`${d.name}, adopted`} sizes="160px" className="!absolute inset-0" imgClassName="grayscale contrast-125 mix-blend-multiply"/>
                <span className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ background: blue }}>{d.name} is home</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
