import type { Metadata } from 'next'
import { Section, Container, Row } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import { fetchMd } from "@/app/data/fetchData"
import MdComponent from "@/app/components/md/mdComponent"
import DonationCard from "@/app/components/donateCard"


interface MdPageProps {
  params: Promise<{ file: string }>
}

export async function generateMetadata({params}: MdPageProps): Promise<Metadata> {
  const {file} = await params;
  const {frontmatter} = await fetchMd(`data/pages/${file}.md`);
  return {
    title: `${frontmatter.title || "Page"} | ${platform_name}`,
    // You can also add description or other meta from frontmatter.
  };
}

export default async function Page({params}: MdPageProps) {

  const {file} = await params
  const {content, frontmatter} = await fetchMd(`data/pages/${file}.md`)

  const title = (frontmatter.title as string) || "Page"

  return (
    <Section>
      <Container>
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: `/more/${file}`, text: title}]}/>
        <Row xl lgCol reverse className="w-full">
          {file == "donate" &&
            <Row itemsCenter className="w-1/2 max-lg:w-full">
              <DonationCard/>
            </Row>
          }
          <Row className={file == "donate" ? "w-1/2 max-lg:w-full" : "w-full"}>
            <MdComponent md={content}/>
          </Row>
        </Row>
      </Container>
    </Section>
  )
}

