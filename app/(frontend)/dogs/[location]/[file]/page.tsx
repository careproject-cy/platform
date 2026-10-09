import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from "next/link"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { domain, platform_name } from "@/app/data/consts"
import DogCard from "@/app/components/dogCard"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import { fetchDogs, fetchDogBody } from "@/app/data/fetchData"
import MdComponent from "@/app/components/md/mdComponent"
import Sharer from "@/app/components/sharerWrapper"

interface IdProps {
  params: Promise<{ location: string, file: string }>
}

// Prerender every dog at build time; dynamicParams stays true so CMS-added dogs resolve on demand,
// and revalidatePath keeps them fresh. Turns a per-request Neon round trip into a static page.
export async function generateStaticParams() {
  const dogs = await fetchDogs()
  return dogs.map((dog) => ({ location: dog.location, file: dog.filename.replace(".md", "") }))
}

export async function generateMetadata({params}: IdProps): Promise<Metadata> {
  const {location, file} = await params
  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)
  if (!dog) {
    return {
      title: `Not found | ${platform_name}`
    };
  }
  const imgUrl = getImageSrc(dog.images[0]);
  const url = `https://${domain}/dogs/${location}/${file}`
  
  const description = dog.status === 'Adopted'
    ? `${dog.name}, a ${dog.breed}, found a loving forever home through CARE Project's dog rescue in Cyprus.`
    : `Meet ${dog.name}, a ${dog.ageText} ${dog.gender.toLowerCase()} ${dog.breed} looking for a home in Cyprus. Learn how to adopt ${dog.name} through CARE Project.`

  return {
    title: `${dog.name} | ${dog.breed} | ${platform_name}`,
    description,
    alternates: {canonical: `/dogs/${location}/${file}`},
    openGraph: {
      url: url,
      description,
      images: [
        {
          url: imgUrl || "care-project-social.png",
          width: 800,
          height: 600,
          alt: `${dog.name} open graph image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      images: [imgUrl || "care-project-social.png"]
    }
  }
}

export default async function DogPage({params}: IdProps) {
  const {location, file} = await params

  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)

  if (!dog) {
    notFound()
  }

  const content = await fetchDogBody(location, file)

  const sizeText =
    dog.size === "small"
      ? "Small (< 10 kg) size"
      : dog.size === "medium"
        ? "Medium (10-25 kg) size"
        : "Large (> 25kg) size"
  const similarDogs = dogs.filter(d =>
    d.size === dog.size && d.filename !== dog.filename
    && d.status != "Adopted" && d.status != "Not available").slice(0, 9)

  const galleryImages = dog.images.length
    ? dog.images.map((image) => getImageSrc(image))
    : [getImageSrc(null)];

  const shareText = `Check out ${dog.name}!`
  const url = `https://${domain}/dogs/${location}/${file}`

  const status = dog.status
  const showStatus = status !== 'Available'
  const isAdopted = status === 'Adopted'

  const facts = [
    ["Sex", dog.gender],
    ["Age", dog.ageText],
    ["Size", sizeText],
    ["Breed", dog.breed],
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"},
          isAdopted ? {href: "/adopted/1", text: "Adopted dogs"} : {href: "/dogs", text: "Dogs"},
          {href: `/dogs/${location}/${dog.filename.replace(".md", "")}`, text: dog.name}]}/>
        <div className="md:w-auto"><Sharer shareText={shareText} url={url}/></div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <Gallery images={galleryImages} alt={dog.name} chipText={showStatus ? status : undefined}/>
        <div className="lg:sticky lg:top-24">
          {isAdopted && <p className="text-[var(--accent)] font-medium"><span aria-hidden="true">🐾</span> Found their forever home</p>}
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em] mt-2">{dog.name}</h1>
          <dl className="mt-8 grid grid-cols-2 border-t border-[var(--line)]">
            {facts.map(([k, v]) => (
              <div key={k} className="py-4 border-b border-[var(--line)] pr-4">
                <dt className="text-xs text-[var(--muted)]">{k}</dt>
                <dd className={`mt-1 font-medium ${k === "Sex" ? "capitalize" : ""}`}>{v}</dd>
              </div>
            ))}
          </dl>
          {!isAdopted && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/more/adopt" className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium hover:opacity-90">Ask about {dog.name}</Link>
              <Link href="/more/foster" className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">Foster instead</Link>
            </div>
          )}
          <div className="mt-10">
            <MdComponent md={content}/>
          </div>
          {!isAdopted &&
            <p className="mt-10 pt-6 border-t border-[var(--line)] text-sm text-[var(--muted)]">
              Added {getDate(dog.added)}. Details were collected when {dog.name} joined the site, so some may have changed.
            </p>
          }
        </div>
      </div>

      {similarDogs.length !== 0 &&
        <section className="mt-28">
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            {isAdopted ? <>Still looking for <em className="text-[var(--accent)]">a home</em></> : <>Similar <em className="text-[var(--accent)]">dogs</em></>}
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
            {similarDogs.map((dog) => (
              <DogCard key={dog.filename} {...dog} />
            ))}
          </div>
        </section>
      }
    </div>
  )
}

