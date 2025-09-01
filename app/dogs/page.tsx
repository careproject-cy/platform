import { Container, Section } from "@vaneui/ui"
import { PageTitle } from "@vaneui/ui"
import { fetchDogs } from "../data/fetchData"
import DogsCollection from "./dogsCollection"
import { platform_name } from "../data/consts"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Dogs for Adoption"} | ${platform_name}`,
  };
}

export default async function DogsPage() {
  const dogs = await fetchDogs()
  return (
    <Section>
      <Container xl itemsCenter>
        <PageTitle textCenter>Dogs Available For Adoption</PageTitle>
        <DogsCollection dogs={dogs}/>
      </Container>
    </Section>
  )
}
