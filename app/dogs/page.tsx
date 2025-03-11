import Layout from '../components/layout'
import { Container, Section } from "@vaneui/ui"
import { PageTitle } from "@vaneui/ui"
import { fetchDogs } from "../data/fetchData"
import DogsCollection from "./dogsCollection"

export default async function DogsPage() {

  const dogs = await fetchDogs()

  return (
    <Layout>
      <Section>
        <Container xl itemsCenter>
          <PageTitle>Dogs Available For Adoption</PageTitle>
          <DogsCollection dogs={dogs} />
        </Container>
      </Section>
    </Layout>
  )
}

