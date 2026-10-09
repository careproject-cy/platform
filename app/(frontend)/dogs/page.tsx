import Link from "next/link"
import { fetchDogs } from "@/app/data/fetchData"
import DogsCollection from "./dogsCollection"
import { platform_name } from "@/app/data/consts"
import { Metadata } from "next"
import { PageHeader } from "@/app/components/site/heading"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Dogs for Adoption"} | ${platform_name}`,
  };
}

export default async function DogsPage() {
  const dogs = await fetchDogs()
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-24">
      <PageHeader title={<>Looking for <em className="text-[var(--accent)]">a home</em></>}>
        Every dog here was rescued in Cyprus and cared for by our volunteers. Adopt in Cyprus, the UK, Germany, or the Netherlands.{" "}
        <Link href="/more/adopt" className="text-[var(--ink)] underline underline-offset-4 decoration-[var(--accent)]">How adoption works</Link>
      </PageHeader>
      <DogsCollection dogs={dogs}/>
    </div>
  )
}
