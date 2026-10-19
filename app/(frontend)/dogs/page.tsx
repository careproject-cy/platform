import { fetchDogs } from "@/app/data/fetchData"
import DogsCollection, { type CollectionDog } from "./dogsCollection"
import { baseOpenGraph, platform_name } from "@/app/data/consts"
import { Metadata } from "next"
import { Accent, PageHeader } from "@/app/components/site/heading"
import PageShell from "@/app/components/site/pageShell"
import { TextLink } from "@/app/components/site/links"

const title = `Adopt a Rescue Dog in Cyprus | Dogs for Adoption | ${platform_name}`
const description = "Meet rescue dogs from Limassol shelters looking for a home. Adopt in Cyprus or from the UK, Germany or the Netherlands."

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      url: './',
      title,
      description,
      images: [{ url: '/social-preview.png', width: 1200, height: 630, alt: 'CARE Project rescue dogs in Cyprus' }],
    },
  };
}

export default async function DogsPage() {
  const dogs = await fetchDogs()
  // Adopted and unavailable dogs never show here, so they are dropped before anything reaches the client,
  // along with every field the cards and filters do not use.
  const adoptable: CollectionDog[] = dogs
    .filter(dog => dog.status !== 'Not available' && dog.status !== 'Adopted')
    .map(dog => ({
      filename: dog.filename,
      location: dog.location,
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      ageText: dog.ageText,
      gender: dog.gender,
      status: dog.status,
      size: dog.size,
      images: dog.images.slice(0, 1),
    }))
  return (
    <PageShell>
      <PageHeader title={<>Rescue dogs looking for <Accent>a home in Cyprus</Accent></>}>
        Every dog here was rescued in Cyprus and cared for by our volunteers. Adopt in Cyprus, the UK, Germany, or the Netherlands.{" "}
        <TextLink href="/more/adopt" inheritSize>How adoption works</TextLink>
      </PageHeader>
      <DogsCollection dogs={adoptable}/>
    </PageShell>
  )
}
