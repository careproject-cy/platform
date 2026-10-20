import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Col, Grid2, Grid3, PageTitle, Row, SectionTitle, Text, Title } from "@vaneui/ui"
import PageShell from "@/app/components/site/pageShell"
import { LinkButton, TextLink } from "@/app/components/site/links"
import { Accent } from "@/app/components/site/heading"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { baseOpenGraph, contact_email, domain, locationLabels, platform_name } from "@/app/data/consts"
import type { DogMetadata } from "@/app/data/dogMetadata"
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

// "Mixed breed" reads oddly mid-sentence; other breeds keep their proper-noun capitals.
function breedPhrase(breed: string): string {
  return /^mixed breed$/i.test(breed) ? "mixed-breed" : breed
}

// "~4 years old" -> "about 4 years old" for prose; exact ages pass through.
function agePhrase(ageText: string): string {
  return ageText.replace(/^~/, "about ")
}

function findDog(dogs: DogMetadata[], location: string, file: string) {
  return dogs.find(d => d.filename === `${file}.md` && d.location === location)
}

// Old links survive a dog moving location (e.g. into the adopted archive) or a mistyped case:
// if the slug alone names exactly one dog, send the visitor there permanently.
function findMovedDog(dogs: DogMetadata[], location: string, file: string) {
  const slug = `${file.toLowerCase()}.md`
  const matches = dogs.filter(d => d.filename.toLowerCase() === slug)
  return matches.find(d => d.location === location) ?? (matches.length === 1 ? matches[0] : undefined)
}

export async function generateMetadata({params}: IdProps): Promise<Metadata> {
  const {location, file} = await params
  const dogs = await fetchDogs()
  const dog = findDog(dogs, location, file)
  if (!dog) {
    return {
      title: `Not found | ${platform_name}`
    };
  }
  const image = dog.imageInfo[0]
  const imgUrl = getImageSrc(image?.url ?? dog.images[0]);
  const url = `https://${domain}/dogs/${location}/${file}`
  const breed = breedPhrase(dog.breed)
  const where = locationLabels[dog.location] ?? "Cyprus"
  const isAdopted = dog.status === 'Adopted'

  const title = isAdopted
    ? `${dog.name}, adopted ${breed} rescue dog from Cyprus | ${platform_name}`
    : `Adopt ${dog.name}, ${breed} rescue dog in Cyprus | ${platform_name}`
  const description = isAdopted
    ? `${dog.name}, a ${breed} rescued in Cyprus, found a loving forever home through ${platform_name}. Read ${dog.name}'s story and meet dogs still looking for a home.`
    : `${dog.name} is a ${dog.gender.toLowerCase()} ${breed}, ${agePhrase(dog.ageText)}, at ${where === "Cyprus" ? "a shelter in Cyprus" : where}, looking for a home. Adopt in Cyprus or from the UK, Germany or the Netherlands.`
  const imageAlt = image?.alt || `${dog.name}, a ${breed} rescue dog in Cyprus`

  return {
    title,
    description,
    alternates: {canonical: `/dogs/${location}/${file}`},
    // Hidden from every listing, so keep it out of search too.
    robots: dog.status === 'Not available' ? { index: false } : undefined,
    openGraph: {
      ...baseOpenGraph,
      url: url,
      title,
      description,
      images: [
        {
          url: imgUrl,
          width: image?.width,
          height: image?.height,
          alt: imageAlt,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      images: [imgUrl]
    }
  }
}

export default async function DogPage({params}: IdProps) {
  const {location, file} = await params

  const dogs = await fetchDogs()
  const dog = findDog(dogs, location, file)

  if (!dog) {
    const moved = findMovedDog(dogs, location, file)
    if (moved) permanentRedirect(`/dogs/${moved.location}/${moved.filename.replace(".md", "")}`)
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
  const breed = breedPhrase(dog.breed)
  const where = locationLabels[dog.location]
  const galleryAlts = galleryImages.map((_, i) =>
    dog.imageInfo[i]?.alt || `${dog.name}, ${breed} rescue dog in Cyprus, photo ${i + 1}`)

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

  // No Google rich result exists for adoptable pets (and Product would be wrong), so this only
  // ties the page to the site and NGO nodes and names its main photo.
  const mainImage = dog.imageInfo[0]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: dog.name,
    isPartOf: {"@id": `https://${domain}/#website`},
    publisher: {"@id": `https://${domain}/#organization`},
    datePublished: new Date(dog.added).toISOString(),
    dateModified: new Date(dog.updatedAt).toISOString(),
    ...(mainImage && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: getImageSrc(mainImage.url),
        width: mainImage.width,
        height: mainImage.height,
        caption: galleryAlts[0],
      },
    }),
  }

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      <Row mobileStack justifyBetween className="pt-10 max-mobile:items-start">
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"},
          isAdopted ? {href: "/adopted/1", text: "Adopted dogs"} : {href: "/dogs", text: "Dogs"},
          {href: `/dogs/${location}/${dog.filename.replace(".md", "")}`, text: dog.name}]}/>
        <Sharer shareText={shareText} url={url}/>
      </Row>

      <Row xl tabletStack itemsStart className="mt-4 max-tablet:items-stretch">
        <Gallery className="flex-1" images={galleryImages} alt={dog.name} alts={galleryAlts} chipText={showStatus ? status : undefined}/>
        <Col lg className="flex-1 lg:sticky lg:top-24">
          {isAdopted && <Text accent fontMedium><span aria-hidden="true">🐾</span> Found their forever home</Text>}
          <PageTitle xl>{dog.name}</PageTitle>
          <Grid2 noGap tag="dl" borderT className="max-mobile:grid-cols-2">
            {facts.map(([k, v]) => (
              <Col xs key={k} borderB className="py-4 pr-4">
                <Text xs secondary tag="dt">{k}</Text>
                <Text fontMedium tag="dd" className={k === "Sex" ? "capitalize" : ""}>{v}</Text>
              </Col>
            ))}
          </Grid2>
          {!isAdopted && (
            <Row sm flexWrap>
              <LinkButton filled accent href="/more/adopt">How adoption works</LinkButton>
              <LinkButton href="/more/foster">How fostering works</LinkButton>
            </Row>
          )}
          {isAdopted && (
            <Text secondary>
              {dog.name} has been adopted. The story below was written while {dog.name} was still looking for a home.
            </Text>
          )}
          <MdComponent md={content}/>
          {!isAdopted &&
            <Col borderT className="pt-6">
              <Title tag="h2">About adopting {dog.name}</Title>
              <Text>
                {status === "In foster care"
                  ? `${dog.name} is staying with a foster family in Cyprus.`
                  : `${dog.name} is waiting at ${where ?? "a shelter in Cyprus"}.`} Adoption is arranged by
                UANA Foundation, in Cyprus or from the UK, Germany or the Netherlands.
                Read <TextLink href="/more/adopt">how adopting from Cyprus or abroad works</TextLink>, or
                email <TextLink href={`mailto:${contact_email}`}>{contact_email}</TextLink> and mention {dog.name}.
              </Text>
              <Text sm secondary>
                Added {getDate(dog.added)}. Details were collected when {dog.name} joined the site, so some may have changed.
              </Text>
            </Col>
          }
        </Col>
      </Row>

      {similarDogs.length !== 0 &&
        <Col xl className="mt-20">
          <SectionTitle xl>
            {isAdopted ? <>Still looking for <Accent>a home</Accent></> : <>Similar <Accent>dogs</Accent></>}
          </SectionTitle>
          <Grid3 className="gap-x-5 gap-y-10 max-mobile:grid-cols-2">
            {similarDogs.map((dog) => (
              <DogCard key={`${dog.location}/${dog.filename}`} {...dog} sizes="(max-width: 1023px) 50vw, 400px"/>
            ))}
          </Grid3>
        </Col>
      }
    </PageShell>
  )
}
