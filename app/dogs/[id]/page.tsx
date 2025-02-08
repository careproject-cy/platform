import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { dogs } from '../../data/dogs'
import type { Metadata, ResolvingMetadata } from 'next'
import { Col, Row, Section, Container } from "@/components/ui/layout"
import { PageTitle, Text, TextTitle } from "@/components/ui/typography"
import { Divider } from "@/components/ui/divider"
import Gallery from "@/app/components/gallery"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"

interface DogPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `${platform_name} | Dogs` }
}

export default async function DogPage({ params }: DogPageProps) {
  const { id } = await params
  const dog = dogs.find(d => d.id === id)

  if (!dog) {
    notFound()
  }

  const sizeText = dog.size === "small" ? "Small (< 10 kg) size" : dog.size === "medium" ? "Medium (10-25 kg) size" : "Large (> 25kg) size"

  return (
    <Layout>
      <Section className="my-6 flex-1">
        <Container className="gap-6 flex-1 py-0 max-w-6xl">
          <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/dogs", text: "Dogs" }, { href: `/dogs/${dog.id}`, text: dog.name }]} />
          <Row className="gap-6 w-full items-start md:max-lg:flex-col">
            <Gallery images={dog.images} />
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
        </Container>
      </Section>
    </Layout>
  )
}

