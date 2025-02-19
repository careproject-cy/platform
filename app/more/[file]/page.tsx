import Layout from '../../components/layout'
import type { Metadata } from 'next'
import { Section, Container } from "@/components/ui/layout"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import { fetchMd } from "@/app/data/fetchData"
import Md from "@/app/components/md/md"

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About | ${platform_name}`
  }
}

interface MdPageProps {
  params: Promise<{ file: string }>
}

export default async function Page({ params }: MdPageProps) {

  const { file } = await params
  const { content, frontmatter } = await fetchMd(`data/pages/${file}.md`)

  const title = frontmatter.title || "Page"

  return (
    <Layout>
      <Section>
        <Container>
          <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: `/more/${file}`, text: title }]} />
          <Md content={content} frontmatter={frontmatter} />
        </Container>
      </Section>
    </Layout>
  )
}

