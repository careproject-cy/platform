import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { dogs } from '../../data/dogs'
import { Col, Row, Section, Container } from "@/components/ui/layout"
import { PageTitle, Text, TextTitle } from "@/components/ui/typography"
import { Divider } from "@/components/ui/divider"
import Gallery from "@/app/components/gallery"

interface DogPageProps {
  params: Promise<{ id: string }>
}

export default async function DogPage({ params }: DogPageProps) {
  const { id } = await params
  const dog = dogs.find(d => d.id === id)

  if (!dog) {
    notFound()
  }

  return (
    <Layout>
      <Section className="my-10 flex-1">
        <Container className="gap-10 flex-1 max-w-6xl">
          <Row className="gap-6 w-full items-start md:max-lg:flex-col">
            <Gallery images={dog.images} />
            <Col className="w-full gap-6 py-6">
              <Col className="gap-4">
                <Row className="w-full justify-between items-center gap-6">
                  <PageTitle>{dog.name}</PageTitle>
                  <div className="text-md px-3 py-2 rounded-lg bg-gray-100 font-semibold text-gray-600">{dog.gender}</div>
                </Row>
                <Col className="gap-2">
                  <Text>{dog.breed}</Text>
                  <Text>~{dog.age} years old</Text>
                  <Text>{dog.size}</Text>
                </Col>
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

