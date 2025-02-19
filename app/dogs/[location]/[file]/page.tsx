import { notFound } from 'next/navigation'
import Layout from '../../../components/layout'
import type { Metadata } from 'next'
import { Col, Row, Section, Container, Grid3 } from "@/components/ui/layout"
import { PageTitle, SectionTitle, Text, TextTitle } from "@/components/ui/typography"
import { Divider } from "@/components/ui/divider"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import DogCard from "@/app/components/dogCard"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import { fetchDogs, fetchMd } from "@/app/data/fetchData"
import Md from "@/app/components/md/md"

export const runtime = 'edge';

interface IdProps {
  params: Promise<{ location: string, file: string }>
}

export async function generateMetadata({ params }: IdProps): Promise<Metadata> {
  const { location, file } = await params
  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)
  return {
    title: !dog ? `Not found | ${platform_name}` : `${dog.name} | ${dog.breed} | ${platform_name}`
  }
}

export default async function DogPage({ params }: IdProps) {
  const { location, file } = await params

  console.log(location, file)

  const dogs = await fetchDogs()
  const filename = `${file}.md`
  const dog = dogs.find(d => d.filename === filename && d.location === location)

  if (!dog) {
    notFound()
  }

  const { content, frontmatter } = await fetchMd(`data/dogs/${location}/${filename}`)

  const sizeText = dog.size === "small" ? "Small (< 10 kg) size" : dog.size === "medium" ? "Medium (10-25 kg) size" : "Large (> 25kg) size"
  const similarDogs = dogs.filter(d => d.size === dog.size && d.filename !== dog.filename).slice(0, 4)

  const galleryImages = dog.images.map((image) => getImageSrc(image));

  return (
    <Layout>
      <Section>
        <Container>
          <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/dogs", text: "Dogs" }, { href: `/dogs/${dog.filename.replace(".md", "")}`, text: dog.name }]} />
          <Row xl mdCol>
            <Gallery className="flex-1" images={galleryImages} />
            <Col className="w-full gap-6 flex-1">
              <Col className="gap-3">
                <Row vCentered className="justify-between">
                  <PageTitle>{dog.name}</PageTitle>
                  <span className="text-md px-3 py-1 rounded-lg bg-gray-100 font-semibold text-gray-600">{dog.gender}</span>
                </Row>
                <Row className="justify-between">
                  <Text>{dog.breed}</Text>
                  <Text>~{dog.age} years old</Text>
                </Row>
                <Text className="italic">{sizeText}</Text>
              </Col>
              <Divider />
              <Col sm>
                <TextTitle>Description</TextTitle>
                <Md content={content} frontmatter={frontmatter} />
              </Col>
              <Divider />
              <Col sm className="opacity-75">
                <TextTitle sm>
                  Added at{" "}
                  {getDate(dog.added)}
                </TextTitle>
                <Text>Please note that the information about the dog is collected at the time the dog was added to the website meaning some of the data may not be accurate.</Text>
              </Col>
            </Col>
          </Row>
          {similarDogs.length !== 0 &&
            <>
              <Divider />
              <SectionTitle>Similar dogs</SectionTitle>
              <Grid3>
                {similarDogs.map((dog) => (
                  <DogCard key={dog.filename} {...dog} />
                ))}
              </Grid3>
            </>
          }
        </Container>
      </Section>
    </Layout>
  )
}

