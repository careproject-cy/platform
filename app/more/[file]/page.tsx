import Layout from '../../components/layout'
import type { Metadata } from 'next'
import { Section, Container, Row } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import { fetchMd } from "@/app/data/fetchData"
import Md from "@/app/components/md/md"
import DonationCard from "@/app/components/donateCard"

export async function generateMetadata({ params }: MdPageProps): Promise<Metadata> {
  const { file } = await params;
  const { frontmatter } = await fetchMd(`data/pages/${file}.md`);
  return {
    title: `${frontmatter.title || "Page"} | ${platform_name}`,
    // You can also add description or other meta from frontmatter.
  };
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
          <Row xl lgCol reverse className="w-full">
            {file == "donate" &&
              <Row className="w-full">
                <DonationCard />
              </Row>
            }
            <Md content={content} frontmatter={frontmatter} />
          </Row>
        </Container>
      </Section>
    </Layout>
  )
}

