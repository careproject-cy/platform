import { fetchDogs } from "@/app/data/fetchData"
import DogsCollection from "./dogsCollection"
import { platform_name } from "@/app/data/consts"
import { Metadata } from "next"
import { Accent, PageHeader } from "@/app/components/site/heading"
import PageShell from "@/app/components/site/pageShell"
import { TextLink } from "@/app/components/site/links"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Dogs for Adoption"} | ${platform_name}`,
  };
}

export default async function DogsPage() {
  const dogs = await fetchDogs()
  return (
    <PageShell>
      <PageHeader title={<>Looking for <Accent>a home</Accent></>}>
        Every dog here was rescued in Cyprus and cared for by our volunteers. Adopt in Cyprus, the UK, Germany, or the Netherlands.{" "}
        <TextLink href="/more/adopt" inheritSize>How adoption works</TextLink>
      </PageHeader>
      <DogsCollection dogs={dogs}/>
    </PageShell>
  )
}
