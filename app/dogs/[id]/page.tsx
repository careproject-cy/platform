import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { dogs } from '../../data/dogs'
import type { Metadata } from 'next'
import { Col, Row, Section, Container, Grid4 } from "@/components/ui/layout"
import { PageTitle, SectionTitle, Text, TextTitle } from "@/components/ui/typography"
import { Divider } from "@/components/ui/divider"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import DogCard from "@/app/components/dogCard"
import { getImageSrc } from "@/app/utils/images"

interface GenerateMetadataProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { id } = await params
  const dog = dogs.find((d) => d.id === id)
  if (!dog) {
    return { title: `${platform_name} | Not found` }
  }
  return {
    title: `${platform_name} | ${dog.name} | ${dog.breed}`
  }
}

interface DogPageProps {
  params: Promise<{ id: string }>
}

export default async function DogPage({ params }: DogPageProps) {
  const { id } = await params
  const dog = dogs.find(d => d.id === id)

  if (!dog) {
    notFound()
  }

  const sizeText = dog.size === "small" ? "Small (< 10 kg) size" : dog.size === "medium" ? "Medium (10-25 kg) size" : "Large (> 25kg) size"
  const similarDogs = dogs.filter(d => d.size === dog.size && d.id !== dog.id).slice(0, 4)

  const galleryImages = dog.images.map((image) => getImageSrc(image));

  return (
    <Layout>
      <Section className="my-10 flex-1">
        <Container className="gap-10 flex-1 py-0 max-w-6xl">
          <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/dogs", text: "Dogs" }, { href: `/dogs/${dog.id}`, text: dog.name }]} />
          <Row className="gap-6 w-full items-start md:max-lg:flex-col">
            <Gallery images={galleryImages} />
            <Col className="w-full gap-6 py-6">
              <Col className="gap-3">
                <Row className="w-full justify-between items-center gap-6">
                  <PageTitle>{dog.name}</PageTitle>
                  <div className="text-md px-3 py-1 rounded-lg bg-gray-100 font-semibold text-gray-600">{dog.gender}</div>
                </Row>
                <Row className="w-full justify-between items-center gap-6">
                  <Text>{dog.breed}</Text>
                  <Text>~{dog.age} years old</Text>
                </Row>
                <Text className="italic">{sizeText}</Text>
              </Col>
              <Divider />
              <Col className="gap-2">
                <TextTitle>Description</TextTitle>
                <Text>{dog.longDescription}</Text>
              </Col>
              <Divider />
              <Col className="gap-2 opacity-50">
                <TextTitle className="text-xl">
                  Added at{" "}
                  {new Date(dog.added).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TextTitle>
                <Text className="text-md">Please note that the information about the dog is collected at the time the dog was added to the website meaning some of the data may not be accurate.</Text>
              </Col>
            </Col>
          </Row>
          <Divider />
          <SectionTitle className="w-full">Similar Dogs</SectionTitle>
          <Grid4>
            {similarDogs.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </Grid4>
        </Container>
      </Section>
    </Layout>
  )
}

