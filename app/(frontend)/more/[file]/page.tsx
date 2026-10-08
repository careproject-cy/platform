import type { Metadata } from 'next'
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

  const isDonate = file === "donate"

  return (
    <div className={`w-full mx-auto px-4 md:px-6 pt-10 pb-24 ${isDonate ? "max-w-6xl" : "max-w-3xl"}`}>
      <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: `/more/${file}`, text: title}]}/>
      <div className={isDonate ? "mt-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start" : "mt-6"}>
        <div className="min-w-0">
          <MdComponent md={content}/>
        </div>
        {isDonate &&
          <div className="lg:sticky lg:top-24">
            <DonationCard/>
          </div>
        }
      </div>
    </div>
  )
}

