import Layout from '../../components/layout'
import type { Metadata } from 'next'
import { Section, Container } from "@/components/ui/layout"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import { fetchText } from "@/app/data/fetchData"
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
  const markdown = await fetchText(`data/pages/${file}.md`)

  return (
    <Layout>
      <Section>
        <Container>
          <Breadcrumbs breadcrumbs={[{ href: "/", text: "Home" }, { href: "/pages/about", text: "About" }]} />
          <Md text={markdown} />
        </Container>
      </Section>
    </Layout>
  )
}

