import type { Metadata } from 'next'
import { Section, Container, Col, Grid4, PageTitle, Text } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import DogCard from "@/app/components/dogCard"
import { fetchDogs } from "@/app/data/fetchData"
import { platform_name } from "@/app/data/consts"

export const metadata: Metadata = {
  title: `Adopted Dogs | ${platform_name}`,
  description: "Meet the rescued dogs who found their forever homes through the CARE Project.",
}

export default async function AdoptedDogsPage() {
  const dogs = await fetchDogs()
  const adoptedDogs = dogs.filter((d) => d.status === 'Adopted')

  return (
    <Section>
      <Container xl>
        <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/adopted", text: "Adopted Dogs" }]}/>
        <Col itemsCenter wFull>
          <PageTitle textCenter>Adopted Dogs</PageTitle>
          <Text xl textCenter secondary className="max-w-[600px]">
            Every one of these dogs found their forever home. Thank you for being part of their stories.
          </Text>
        </Col>
        <Grid4 xl wFull>
          {adoptedDogs.map((dog) => (
            <DogCard key={`${dog.location}/${dog.filename}`} {...dog} adoptedView/>
          ))}
        </Grid4>
      </Container>
    </Section>
  )
}
