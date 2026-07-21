import type { Metadata } from 'next'
import { Section, Container, Row } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { platform_name } from "@/app/data/consts"
import { fetchMd } from "@/app/data/fetchData"
import MdComponent from "@/app/components/md/mdComponent"
import DonationCard from "@/app/components/donateCard"
import { getImageSrc } from "@/app/utils/images"


interface MdPageProps {
  params: Promise<{ file: string }>
}

export async function generateMetadata({params}: MdPageProps): Promise<Metadata> {
  const {file} = await params;
  const {frontmatter} = await fetchMd(`data/pages/${file}.md`);
  const title = (frontmatter.title as string) || "Page";
  const description = frontmatter.description as string | undefined;
  const image = frontmatter.imageSrc ? getImageSrc(frontmatter.imageSrc as string) : undefined;
  return {
    title: `${title} | ${platform_name}`,
    description,
    alternates: {canonical: `/more/${file}`},
    openGraph: {
      title,
      description,
      url: `/more/${file}`,
      ...(image ? {images: [image]} : {}),
    },
  };
}

export default async function Page({params}: MdPageProps) {

  const {file} = await params
  const {content, frontmatter} = await fetchMd(`data/pages/${file}.md`)

  const title = (frontmatter.title as string) || "Page"

  return (
    <Section>
      <Container xs={file !== "donate"}>
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: `/more/${file}`, text: title}]}/>
        <Row xl tabletCol reverse wFull>
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

