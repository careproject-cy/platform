"use client"

import Image from "next/image"
import NextLink from "next/link"
import { Badge, Button, Col, Container, Grid2, Grid3, Grid4, Link, PageTitle, Row, Section, SectionTitle, Text, Title } from "@vaneui/ui"
import type { LandingData } from "@/app/data/landingData"
import Reveal from "@/app/components/site/reveal"
import PhotoWall from "@/app/components/site/photoWall"
import DogWall from "@/app/components/site/dogWall"
import { Accent, SectionHeading } from "@/app/components/site/heading"

const steps = [
  ["Write to us", "Tell us your country, your home, any other pets, and which dog caught your eye."],
  ["Meet the dog", "Visit the shelter, meet our volunteers, and get to know the dog in person."],
  ["Home check", "A volunteer makes sure your home suits the dog's needs."],
  ["Welcome home", "Fill in the application. In Cyprus the €250 fee covers passport, microchip, vaccines, and neutering."],
]

const work = [
  ["Rescue", "We take in dogs from a municipal shelter and the streets, and help other shelters where we can."],
  ["Vet care", "Vaccines, neutering, diagnostics, and months of treatment for leishmaniasis and tick-borne disease."],
  ["Foster & socialise", "Long-term foster homes where dogs recover, learn to trust people, and get ready for family life."],
  ["Adoption & travel", "Paperwork, microchips, and transport to families in Cyprus, the UK, Germany, and the Netherlands."],
]

export default function HomeView({ data }: { data: LandingData }) {
  const { newest, available, adopted, posts } = data
  const heroWall = [...newest, ...adopted].slice(0, 32)
  const fade = "pointer-events-none absolute inset-x-0"

  return (
    <>
      <Section noPadding relative className="px-3 pt-3">
        <Col relative overflowHidden className="w-full h-[760px] md:h-[clamp(720px,calc(100svh-76px),1080px)] rounded-[32px]">
          <PhotoWall dogs={heroWall} cols={8} priority/>
          <div className={`${fade} bottom-0 h-[72%] md:h-[62%] bg-[linear-gradient(0deg,var(--bg)_0%,var(--bg)_42%,color-mix(in_oklab,var(--bg)_75%,transparent)_70%,transparent_100%)]`}/>
          <Container lg itemsStretch absolute className="inset-x-0 mx-auto bottom-0 px-5 md:px-12 pb-10 md:pb-14 2xl:max-w-7xl">
            <Row xl mobileStack justifyBetween itemsEnd className="max-mobile:items-start">
              <Reveal>
                <PageTitle xl className="hero-title max-w-[13ch] text-balance">
                  From the streets of Cyprus <Accent>to your sofa</Accent>
                </PageTitle>
              </Reveal>
              <Reveal delay={100} className="max-w-sm 2xl:max-w-md">
                <Col lg>
                  <Text lg secondary>
                    Rescued dogs waiting for homes in Cyprus, the UK, Germany, and the Netherlands. Some of these faces have already found one.
                  </Text>
                  <Row sm flexWrap>
                    <Button filled accent tag={NextLink} href="/dogs">Meet the dogs</Button>
                    <Button tag={NextLink} href="/more/donate" className="bg-(--bg)">Donate</Button>
                  </Row>
                </Col>
              </Reveal>
            </Row>
          </Container>
        </Col>
      </Section>

      <Section xl>
        <Container lg itemsStretch>
          <Row xl tabletStack itemsStart className="max-tablet:items-stretch">
            <Reveal className="lg:sticky lg:top-28 self-start flex-[0.9]">
              <Col lg>
                <SectionTitle xl className="text-balance">Rescue, recover, <Accent>rehome</Accent></SectionTitle>
                <Text lg secondary className="max-w-md">
                  CARE Project is a volunteer team of the UANA Foundation, a registered nonprofit in Cyprus. We are not a shelter: we step in where dogs need it most and stay with each one until they are home.
                </Text>
                <Button tag={NextLink} href="/more/about">Read our story</Button>
              </Col>
            </Reveal>
            <Col noGap borderT className="flex-[1.1] w-full">
              {work.map(([t, d], i) => (
                <Reveal key={t} delay={i * 60}>
                  <Grid2 sm borderB className="group py-8 grid-cols-[1fr_1.4fr] max-mobile:grid-cols-1">
                    <Title xl className="leading-none group-hover:text-(--color-text-accent) transition-colors">{t}</Title>
                    <Text secondary>{d}</Text>
                  </Grid2>
                </Reveal>
              ))}
            </Col>
          </Row>
        </Container>
      </Section>

      <Section xl secondary borderY overflowHidden className="[--color-bg-secondary:var(--accent-soft)]">
        <Container lg itemsStretch>
          <SectionHeading title={<>Looking for <Accent>a home</Accent></>}>
            <Link sm fontMedium tag={NextLink} href="/dogs">Browse all dogs</Link>
          </SectionHeading>
          <DogWall dogs={available}/>
        </Container>
      </Section>

      <Section xl>
        <Container lg itemsStretch>
          <SectionHeading title={<>How adoption <Accent>works</Accent></>}>
            <Text secondary className="max-w-sm">Adoptions are handled by the UANA Foundation, a registered nonprofit in Cyprus. Fees abroad depend on our partner organisations.</Text>
          </SectionHeading>
          <Grid4 tag="ol" className="max-tablet:grid-cols-4 max-mobile:grid-cols-2">
            {steps.map(([t, d], i) => {
              const dog = adopted[i + 1]
              return (
                <li key={t} className={`list-none ${i % 2 ? "md:mt-12" : ""}`}>
                  <Reveal delay={i * 60}>
                    <Col>
                      <Col relative overflowHidden className="aspect-[3/4] rounded-[22px] bg-(--line)">
                        {dog && <Image src={dog.img} alt="" fill sizes="25vw" className="object-cover"/>}
                        <Badge lg absolute fontHeading fontNormal className="left-3 top-3 bg-white">{i + 1}</Badge>
                      </Col>
                      <Title lg className="leading-none">{t}</Title>
                      <Text sm secondary>{d}</Text>
                    </Col>
                  </Reveal>
                </li>
              )
            })}
          </Grid4>
        </Container>
      </Section>

      <Section noPadding noGap primary relative overflowHidden data-theme="dark">
        <Col className="opacity-90 pt-6 px-3 w-full">
          <PhotoWall dogs={adopted.slice(0, 20)} labels="always" suffix="went home"/>
        </Col>
        <div className={`${fade} top-0 h-40 bg-gradient-to-b from-(--bg) to-transparent`}/>
        <div className={`${fade} bottom-0 h-[55%] bg-[linear-gradient(0deg,var(--bg)_0%,var(--bg)_35%,transparent_100%)] max-md:hidden`}/>
        <Container lg itemsStretch className="md:absolute inset-x-0 mx-auto bottom-0 px-5 md:px-12 pt-10 md:pt-0 pb-14 md:pb-20">
          <Row xl mobileStack justifyBetween itemsEnd className="max-mobile:items-start">
            <Reveal>
              <SectionTitle xl className="max-w-[12ch]">Every one of these <Accent>went home</Accent></SectionTitle>
            </Reveal>
            <Reveal delay={80} className="max-w-sm">
              <Col>
                <Text secondary>
                  &ldquo;United by our passion for animal welfare and our desire to make the world a better place for stray dogs.&rdquo;
                </Text>
                <Text sm secondary className="opacity-70">The CARE Project volunteers</Text>
                <Button filled tag={NextLink} href="/adopted/1">See happy endings</Button>
              </Col>
            </Reveal>
          </Row>
        </Container>
      </Section>

      {posts.length > 0 && (
        <Section xl className="pb-0">
          <Container lg itemsStretch>
            <SectionHeading title={<>From our <Accent>notebook</Accent></>}>
              <Link sm fontMedium tag={NextLink} href="/blog">All stories</Link>
            </SectionHeading>
            <Grid3 lg itemsStart className="max-tablet:grid-cols-3 max-mobile:grid-cols-1">
              {posts.slice(0, 3).map((p, i) => (
                <Reveal key={p.href} delay={i * 60} className={i === 1 ? "md:mt-16" : ""}>
                  <Col sm tag={NextLink} href={p.href} className="group">
                    <Col relative overflowHidden className={`${i === 1 ? "aspect-[4/5]" : "aspect-[4/3]"} rounded-[22px]`}>
                      <Image src={p.img} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
                    </Col>
                    <Title className="group-hover:text-(--color-text-accent)">{p.title}</Title>
                    <Text sm secondary lineClamp2>{p.description}</Text>
                  </Col>
                </Reveal>
              ))}
            </Grid3>
          </Container>
        </Section>
      )}
    </>
  )
}
