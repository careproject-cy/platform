import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { dogs } from '../../data/dogs'
import Image from 'next/image'
import { Col, Row, Section, Container } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"

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
        <Container className="gap-10 flex-1">
          <PageTitle>{dog.name}</PageTitle>
          <Row className="gap-6">
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${dog.name}`}
              alt={dog.name}
              width={600}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <Col>
              <p className="text-lg mb-2"><strong>Breed:</strong> {dog.breed}</p>
              <p className="text-lg mb-2"><strong>Age:</strong> {dog.age} years old</p>
              <p className="text-lg mb-4">{dog.longDescription}</p>
            </Col>
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}

