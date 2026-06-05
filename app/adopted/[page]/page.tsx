import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section, Container, Col, Grid4, PageTitle, Text } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import DogCard from "@/app/components/dogCard"
import Pagination from "@/app/components/pagination"
import { fetchDogs } from "@/app/data/fetchData"
import { platform_name, ADOPTED_PAGE_SIZE as PAGE_SIZE } from "@/app/data/consts"

async function getAdoptedDogs() {
  const dogs = await fetchDogs()
  return dogs.filter((d) => d.status === 'Adopted')
}

export async function generateStaticParams() {
  const adoptedDogs = await getAdoptedDogs()
  const totalPages = Math.max(1, Math.ceil(adoptedDogs.length / PAGE_SIZE))
  return Array.from({length: totalPages}, (_, i) => ({page: String(i + 1)}))
}

export async function generateMetadata({params}: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const {page} = await params
  const pageNum = Number(page)
  const adoptedDogs = await getAdoptedDogs()
  const totalPages = Math.max(1, Math.ceil(adoptedDogs.length / PAGE_SIZE))

  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    return {title: `Page not found | ${platform_name}`}
  }

  const title = pageNum > 1
    ? `Adopted Dogs - Page ${pageNum} | ${platform_name}`
    : `Adopted Dogs | ${platform_name}`
  return {
    title,
    description: "Meet the rescued dogs who found their forever homes through the CARE Project.",
    alternates: {canonical: `/adopted/${pageNum}`},
  }
}

export default async function AdoptedDogsPage({params}: { params: Promise<{ page: string }> }) {
  const {page} = await params
  const pageNum = Number(page)
  const adoptedDogs = await getAdoptedDogs()
  const totalPages = Math.max(1, Math.ceil(adoptedDogs.length / PAGE_SIZE))

  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound()
  }

  const start = (pageNum - 1) * PAGE_SIZE
  const pageDogs = adoptedDogs.slice(start, start + PAGE_SIZE)

  return (
    <Section>
      <Container xl>
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: "/adopted/1", text: "Adopted Dogs"}]}/>
        <Col itemsCenter wFull>
          <PageTitle textCenter>Adopted Dogs</PageTitle>
          <Text xl textCenter secondary className="max-w-[600px]">
            Every one of these dogs found their forever home. Thank you for being part of their stories.
          </Text>
        </Col>
        <Grid4 xl wFull>
          {pageDogs.map((dog) => (
            <DogCard key={`${dog.location}/${dog.filename}`} {...dog} adoptedView/>
          ))}
        </Grid4>
        <Pagination basePath="/adopted" currentPage={pageNum} totalPages={totalPages}/>
      </Container>
    </Section>
  )
}
