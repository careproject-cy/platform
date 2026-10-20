import type { Metadata } from 'next'
import { Col, Row } from "@vaneui/ui"
import Breadcrumbs from "@/app/components/breadcrumbs"
import PageShell from "@/app/components/site/pageShell"
import { baseOpenGraph, morePages, platform_name, social_img_url } from "@/app/data/consts"
import { fetchMd } from "@/app/data/fetchData"
import MdComponent from "@/app/components/md/mdComponent"
import DonationCard from "@/app/components/donateCard"
import { getImageSrc } from "@/app/utils/images"


interface MdPageProps {
  params: Promise<{ file: string }>
}

// Only the known Markdown pages exist; anything else 404s without touching the filesystem.
export const dynamicParams = false

export function generateStaticParams() {
  return morePages.map((file) => ({ file }))
}

export async function generateMetadata({params}: MdPageProps): Promise<Metadata> {
  const {file} = await params;
  const {frontmatter} = await fetchMd(`data/pages/${file}.md`);
  // seoTitle is the search-facing title; title stays short for the breadcrumb.
  const seoTitle = (frontmatter.seoTitle as string) || (frontmatter.title as string) || "Page";
  const title = seoTitle.includes(platform_name) ? seoTitle : `${seoTitle} | ${platform_name}`;
  const description = frontmatter.description as string | undefined;
  const image = frontmatter.imageSrc
    ? {url: getImageSrc(frontmatter.imageSrc as string)}
    : {url: social_img_url, width: 1200, height: 630, alt: "Rescued dogs of CARE Project in Cyprus"};
  return {
    title,
    description,
    alternates: {canonical: `/more/${file}`},
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url: `/more/${file}`,
      images: [image],
    },
  };
}

export default async function Page({params}: MdPageProps) {

  const {file} = await params
  const {content, frontmatter} = await fetchMd(`data/pages/${file}.md`)

  const title = (frontmatter.title as string) || "Page"

  const isDonate = file === "donate"

  return (
    <PageShell size={isDonate ? "lg" : "xs"}>
      <Col className="pt-10">
        <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: `/more/${file}`, text: title}]}/>
      </Col>
      {isDonate
        ? <Row xl tabletStack itemsStart className="max-tablet:items-stretch">
            <Col className="flex-1 min-w-0"><MdComponent md={content}/></Col>
            <Col className="flex-1 lg:sticky lg:top-24"><DonationCard/></Col>
          </Row>
        : <MdComponent md={content}/>}
    </PageShell>
  )
}
