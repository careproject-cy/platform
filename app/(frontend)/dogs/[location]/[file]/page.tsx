import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Col, Grid2, Grid3, PageTitle, Row, SectionTitle, Text } from "@vaneui/ui"
import PageShell from "@/app/components/site/pageShell"
import { LinkButton } from "@/app/components/site/links"
import { Accent } from "@/app/components/site/heading"
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
    <PageShell>
      <Row mobileStack justifyBetween className="pt-10 max-mobile:items-start">
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"},
          isAdopted ? {href: "/adopted/1", text: "Adopted dogs"} : {href: "/dogs", text: "Dogs"},
          {href: `/dogs/${location}/${dog.filename.replace(".md", "")}`, text: dog.name}]}/>
        <Sharer shareText={shareText} url={url}/>
      </Row>

      <Row xl tabletStack itemsStart className="mt-4 max-tablet:items-stretch">
        <Gallery className="flex-1" images={galleryImages} alt={dog.name} chipText={showStatus ? status : undefined}/>
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
          <MdComponent md={content}/>
          {!isAdopted &&
            <Col borderT className="pt-6">
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
              <DogCard key={`${dog.location}/${dog.filename}`} {...dog} />
            ))}
          </Grid3>
        </Col>
      }
    </PageShell>
  )
}
