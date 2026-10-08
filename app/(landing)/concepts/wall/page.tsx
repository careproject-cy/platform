import Image from "next/image"
import Link from "next/link"
import { getLandingData, type LandingDog } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import Reveal from "../_kit/reveal"
import { bTheme, serif } from "../b/body"
import PhotoWall from "./photoWall"
import DogWall from "./dogWall"

export const metadata = { title: "Concept: Photo wall" }

const steps = [
  ["Write to us", "Tell us your country, your home, any other pets, and which dog caught your eye."],
  ["Meet the dog", "Visit the shelter, meet our volunteers, and get to know the dog in person."],
  ["Home check", "A volunteer makes sure your home suits the dog's needs."],
  ["Welcome home", "Fill in the application. In Cyprus the €250 fee covers passport, microchip, vaccines, and neutering."],
]

// Small round photo set inline with running text.
function Chip({ dog }: { dog?: LandingDog }) {
  if (!dog) return null
  return (
    <span className="relative inline-block align-middle w-[1.9em] h-[1.1em] md:w-[2.2em] rounded-full overflow-hidden mx-1 -translate-y-[0.06em] ring-2 ring-[var(--bg)]">
      <Image src={dog.img} alt="" fill sizes="120px" className="object-cover"/>
    </span>
  )
}

function Heading({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <h2 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-[14ch] text-balance">{title}</h2>
      {children}
    </Reveal>
  )
}

export default async function WallLanding() {
  const { newest, available, adopted, posts } = await getLandingData()
  const heroWall = [...newest, ...adopted].slice(0, 20)
  const fade = "pointer-events-none absolute inset-x-0"

  return (
    <div className={`cp ${serif.variable} min-h-screen`} style={bTheme}>
      <SiteHeader/>
      <main>
        <section className="relative px-3 pt-3">
          <div className="relative h-[760px] md:h-[800px] overflow-hidden rounded-[32px]">
            <PhotoWall dogs={heroWall} priority/>
            <div className={`${fade} bottom-0 h-[72%] md:h-[62%] bg-[linear-gradient(0deg,var(--bg)_0%,var(--bg)_42%,color-mix(in_oklab,var(--bg)_75%,transparent)_70%,transparent_100%)]`}/>
            <div className="absolute inset-x-0 bottom-0 px-5 md:px-12 pb-10 md:pb-14">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <Reveal>
                  <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-[5.25rem] leading-[0.92] tracking-[-0.02em] max-w-[13ch] text-balance">
                    From the streets of Cyprus <em className="text-[var(--accent)]">to your sofa</em>
                  </h1>
                </Reveal>
                <Reveal delay={100} className="max-w-sm">
                  <p className="text-lg text-[var(--muted)] leading-relaxed">
                    Rescued dogs waiting for homes in Cyprus, the UK, Germany, and the Netherlands. Some of these faces have already found one.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/dogs" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs</Link>
                    <Link href="/more/donate" className="rounded-full border border-[var(--line)] bg-white px-6 py-3 font-medium">Donate</Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-28 md:py-36">
          <Reveal>
            <p className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl leading-[1.12] tracking-[-0.01em] text-balance">
              We find stray dogs <Chip dog={newest[0]}/> in shelters and on the streets of Cyprus, pay for their vet care <Chip dog={newest[1]}/>,
              help them recover in foster homes <Chip dog={newest[2]}/>, and stay with each one until a family <Chip dog={adopted[0]}/> takes them home.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-[var(--muted)]">
            <span>Run by volunteers of the UANA Foundation</span>
            <span>No paid staff</span>
            <span>Adoptions in Cyprus, the UK, Germany, and the Netherlands</span>
          </Reveal>
        </section>

        <section className="bg-[var(--accent-soft)] border-y border-[var(--line)] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-28">
            <Heading title={<>Looking for <em className="text-[var(--accent)]">a home</em></>}>
              <Link href="/dogs" className="text-sm font-medium underline underline-offset-4 decoration-[var(--accent)]">Browse all dogs</Link>
            </Heading>
            <div className="mt-10">
              <DogWall dogs={available}/>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-28">
          <Heading title={<>How adoption <em className="text-[var(--accent)]">works</em></>}>
            <p className="text-[var(--muted)] max-w-sm leading-relaxed">Adoptions are handled by the UANA Foundation, a registered nonprofit in Cyprus. Fees abroad depend on our partner organisations.</p>
          </Heading>
          <ol className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map(([t, d], i) => {
              const dog = adopted[i + 1]
              return (
                <Reveal key={t} delay={i * 60} className={i % 2 ? "md:mt-12" : ""}>
                  <li className="list-none">
                    <div className="relative aspect-[3/4] rounded-[22px] overflow-hidden bg-[var(--line)]">
                      {dog && <Image src={dog.img} alt="" fill sizes="25vw" className="object-cover"/>}
                      <span className="absolute left-3 top-3 size-9 rounded-full bg-white grid place-items-center font-[family-name:var(--font-serif)] text-xl">{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-[family-name:var(--font-serif)] text-3xl leading-none">{t}</h3>
                    <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{d}</p>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </section>

        <section className="relative overflow-hidden bg-[var(--ink)] text-white">
          <div className="opacity-90 pt-6 px-3">
            <PhotoWall dogs={adopted.slice(0, 20)} labels="always" suffix="went home"/>
          </div>
          <div className={`${fade} top-0 h-40 bg-gradient-to-b from-[var(--ink)] to-transparent`}/>
          <div className={`${fade} bottom-0 h-[55%] bg-[linear-gradient(0deg,var(--ink)_0%,var(--ink)_35%,transparent_100%)] max-md:hidden`}/>
          <div className="relative md:absolute inset-x-0 bottom-0 px-5 md:px-12 pt-10 md:pt-0 pb-14 md:pb-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <Reveal>
                <h2 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-[12ch]">
                  Every one of these <em className="text-[#86efac]">went home</em>
                </h2>
              </Reveal>
              <Reveal delay={80} className="max-w-sm">
                <p className="text-white/70 leading-relaxed">
                  &ldquo;United by our passion for animal welfare and our desire to make the world a better place for stray dogs.&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/50">The CARE Project volunteers</p>
                <Link href="/adopted/1" className="inline-block mt-6 rounded-full bg-white text-[var(--ink)] px-5 py-2.5 text-sm font-medium">See happy endings</Link>
              </Reveal>
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 md:px-6 pt-28">
            <Heading title={<>From our <em className="text-[var(--accent)]">notebook</em></>}>
              <Link href="/blog" className="text-sm font-medium underline underline-offset-4 decoration-[var(--accent)]">All stories</Link>
            </Heading>
            <div className="mt-12 grid md:grid-cols-3 gap-6 items-start">
              {posts.slice(0, 3).map((p, i) => (
                <Reveal key={p.href} delay={i * 60} className={i === 1 ? "md:mt-16" : ""}>
                  <Link href={p.href} className="group block">
                    <div className={`relative ${i === 1 ? "aspect-[4/5]" : "aspect-[4/3]"} rounded-[22px] overflow-hidden`}>
                      <Image src={p.img} alt="" fill sizes="33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl leading-tight group-hover:text-[var(--accent)]">{p.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{p.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-3 inset-y-6 overflow-hidden rounded-[32px] opacity-25 grayscale">
            <PhotoWall dogs={[...adopted.slice(20), ...newest].slice(0, 20)} labels="none"/>
          </div>
          <div className="relative">
            <DonateBand title="Fund a dog's way home" dark/>
          </div>
        </div>
      </main>
      <SiteFooter/>
    </div>
  )
}
