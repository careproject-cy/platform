import Layout from '../components/layout'
import { Container, Section } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"
import { fetchDogs } from "../data/fetchData"
import DogsCollection from "./dogsCollection"

export default async function DogsPage() {

  const dogs = await fetchDogs()

  return (
    <Layout>
      <Section>
        <Container xl centered>
          <PageTitle>Dogs Available For Adoption</PageTitle>
          <DogsCollection dogs={dogs} />
        </Container>
      </Section>
    </Layout>
  )
}

