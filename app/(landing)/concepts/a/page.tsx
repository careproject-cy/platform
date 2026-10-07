import Image from "next/image"
import Link from "next/link"
import { getLandingData } from "@/app/(frontend)/landing/_shared/data"
import SiteHeader from "../_kit/siteHeader"
import SiteFooter from "../_kit/siteFooter"
import DonateBand from "../_kit/donateBand"
import DogCard from "../_kit/dogCard"
import Reveal from "../_kit/reveal"

export const metadata = { title: "Concept A: Clean" }

const theme = { "--accent": "#ea580c", "--accent-soft": "#fff4ec" } as React.CSSProperties

const help = [
  ["Rescue", "We take in dogs from a municipal shelter and the streets, and help other shelters where we can."],
  ["Vet care", "Exams, vaccinations, neutering, diagnostics, and long treatment for leishmaniasis and tick-borne disease."],
  ["Recovery", "Post-treatment care, wound management, and monitored rest so dogs regain their strength."],
  ["Socialisation", "Walks, handling, and basic training so shy dogs learn to trust people again."],
  ["Foster homes", "Long-term foster families keep dogs out of kennels until their adopter is found."],
  ["Adoption & travel", "Paperwork, microchips, and transport to families in Cyprus, the UK, Germany, and the Netherlands."],
]

const steps = [
  ["Write to us", "Your country, home, other pets, and the dog you like."],
  ["Meet the dog", "Visit the shelter with a volunteer and get to know them."],
  ["Home check", "A volunteer makes sure your home suits the dog."],
  ["Welcome home", "Sign the application. In Cyprus the €250 fee covers passport, microchip, vaccines, and neutering."],
]

function SectionHead({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid md:grid-cols-2 gap-6 items-end pb-10">
      <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.05] max-w-[16ch]">{title}</h2>
      <p className="text-[var(--muted)] max-w-[46ch] md:justify-self-end leading-relaxed">{children}</p>
    </Reveal>
  )
}

export default async function ConceptA() {
  const { newest, adopted, counts } = await getLandingData()
  const [star, left, right] = newest

  return (
    <div className="cp min-h-screen" style={theme}>
      <SiteHeader/>
      <main>
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 text-center">
          <Reveal>
            <Link href="/dogs" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] pl-1.5 pr-3.5 py-1 text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
              <span className="rounded-full bg-[var(--accent)] text-white px-2 py-0.5 text-xs font-medium">{counts.available} dogs</span>
              looking for a home right now
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-7 text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[1.02] max-w-[18ch] mx-auto">
              Every dog deserves a loving home. <span className="block text-[var(--muted)] opacity-70">Help us give them a chance.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg text-[var(--muted)] max-w-[52ch] mx-auto leading-relaxed">
              CARE Project is a volunteer team rescuing stray dogs across Cyprus. We cover their vet care, help them recover, and find them families at home and abroad.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/dogs" className="rounded-full bg-[var(--ink)] text-white px-6 py-3 font-medium hover:opacity-90">Meet the dogs →</Link>
            <Link href="/more/adopt" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[color-mix(in_oklab,var(--ink)_30%,transparent)]">How adoption works</Link>
          </Reveal>
        </section>

        {star && (
          <section aria-label="Featured dogs" className="relative max-w-6xl mx-auto px-4 md:px-6 mt-16">
            <div className="relative rounded-[28px] border border-[var(--line)] overflow-hidden bg-[color-mix(in_oklab,var(--ink)_2%,var(--bg))] px-4 pt-16 pb-0 md:pt-20">
              <div className="cp-dots"/>
              <div className="relative flex justify-center items-end gap-4 md:gap-6">
                {left && (
                  <Link href={left.href} className="hidden md:block w-56 translate-y-10 -rotate-3 rounded-2xl bg-white p-2 cp-shadow">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden"><Image src={left.img} alt={left.name} fill sizes="224px" className="object-cover"/></div>
                    <div className="px-1.5 py-2 text-sm font-medium">{left.name}</div>
                  </Link>
                )}
                <div className="w-full max-w-[34rem] rounded-2xl bg-white cp-shadow overflow-hidden flex flex-col sm:flex-row z-10 mb-10">
                  <div className="relative sm:w-52 aspect-square sm:aspect-auto shrink-0"><Image src={star.img} alt={star.name} fill priority sizes="220px" className="object-cover"/></div>
                  <div className="p-5 flex flex-col gap-3 text-left flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold tracking-tight">{star.name}</span>
                      <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-xs font-medium capitalize">{star.gender}</span>
                    </div>
                    <div className="h-px bg-[var(--line)]"/>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{star.breed}, {star.ageText}, {star.size} size. Newest dog in our programme and waiting for the right family.</p>
                    <div className="flex gap-2 mt-auto justify-end">
                      <Link href={star.href} className="rounded-full bg-[var(--accent)] text-white px-4 py-2 text-sm font-medium">Adopt {star.name}</Link>
                      <Link href={star.href} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium">Read story</Link>
                    </div>
                  </div>
                </div>
                {right && (
                  <Link href={right.href} className="hidden md:block w-56 translate-y-10 rotate-3 rounded-2xl bg-white p-2 cp-shadow">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden"><Image src={right.img} alt={right.name} fill sizes="224px" className="object-cover"/></div>
                    <div className="px-1.5 py-2 text-sm font-medium">{right.name}</div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-[var(--muted)]">
          <span>Rehoming dogs to</span>
          {["Cyprus", "United Kingdom", "Germany", "Netherlands"].map(c => <span key={c} className="font-medium text-[var(--ink)]">{c}</span>)}
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-20">
          <SectionHead title="Dogs looking for a home">
            Each one has been through our vet programme. Open a profile to read their story, then write to us to meet them.
          </SectionHead>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {newest.slice(3, 11).map((d, i) => <Reveal key={d.href} delay={i * 40}><DogCard dog={d}/></Reveal>)}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/dogs" className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:border-[color-mix(in_oklab,var(--ink)_30%,transparent)]">See all {counts.available} dogs</Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-28">
          <SectionHead title="What happens after a rescue">
            We are not a shelter. We step in where dogs need it most and stay with each case until the dog is home.
          </SectionHead>
          <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[24px] overflow-hidden">
            {help.map(([t, d], i) => (
              <Reveal key={t} delay={i * 40} className="bg-[var(--bg)] p-7 md:p-8 min-h-52 flex flex-col justify-between gap-8 group hover:bg-[var(--accent-soft)] transition-colors">
                <span className="size-9 rounded-full border border-[var(--line)] grid place-items-center text-sm text-[var(--accent)] font-semibold bg-[var(--bg)]">{i + 1}</span>
                <div>
                  <h3 className="font-semibold tracking-tight text-lg">{t}</h3>
                  <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-28">
          <SectionHead title="Adopting takes four steps">
            Adoption is handled by the UANA Foundation, a registered nonprofit in Cyprus. Fees abroad depend on our partner organisations.
          </SectionHead>
          <ol className="grid md:grid-cols-4 gap-8">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60} className="relative pt-6 border-t border-[var(--line)]">
                <span className="absolute -top-px left-0 h-px w-12 bg-[var(--accent)]"/>
                <span className="text-sm text-[var(--muted)]">Step {i + 1}</span>
                <h3 className="font-semibold tracking-tight text-lg mt-1">{t}</h3>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="pt-28">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <SectionHead title={`${counts.adopted} dogs already home`}>
              Adopted in Cyprus and through our partners abroad. Every one of them started in a kennel.
            </SectionHead>
          </div>
          <div className="flex gap-4 overflow-hidden px-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            {adopted.slice(0, 10).map(d => (
              <div key={d.href} className="shrink-0 w-44 md:w-52">
                <div className="relative aspect-square rounded-2xl overflow-hidden"><Image src={d.img} alt={`${d.name}, adopted`} fill sizes="208px" className="object-cover"/></div>
                <div className="text-sm mt-2"><span className="font-medium">{d.name}</span> <span className="text-[var(--muted)]">is home</span></div>
              </div>
            ))}
          </div>
        </section>

        <DonateBand/>
      </main>
      <SiteFooter/>
    </div>
  )
}
