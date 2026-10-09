import { notFound } from 'next/navigation'
import { Col, Container, Grid3, PageTitle, Row, Section, SectionTitle, Text } from "@vaneui/ui"
import { LinkButton } from "@/app/components/site/links"
import { Accent } from "@/app/components/site/heading"
import type { Metadata } from 'next'
import MdComponent from "@/app/components/md/mdComponent"
import { fetchBlogposts, fetchPostBody } from "@/app/data/fetchData"
import Image from "next/image"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import Breadcrumbs from "@/app/components/breadcrumbs"
import { BlogCard } from "@/app/components/blog/blogCard"
import Sharer from "@/app/components/sharerWrapper"
import { domain, platform_name } from "@/app/data/consts"
import { ArrowLeft } from "react-feather";

interface BlogPageProps {
  params: Promise<{ id: string }>
}

// Prerender each post; dynamicParams stays true so new posts resolve on demand.
export async function generateStaticParams() {
  const posts = await fetchBlogposts()
  return posts.map((post) => ({ id: post.filename.replace(".md", "") }))
}

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {id} = await params;
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)
  if (!post) {
    return {title: `Not found | ${platform_name}`};
  }
  const url = `https://${domain}/blog/${id}`;
  const image = getImageSrc(post.imageSrc);
  return {
    title: `${post.title} | ${platform_name}`,
    description: post.description,
    alternates: {canonical: `/blog/${id}`},
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      images: [image],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {id} = await params
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)

  if (!post || !post.visible) {
    notFound()
  }

  const content = await fetchPostBody(id)

  const relatedPosts = posts.filter(p => p.tags.some(t => post.tags.includes(t)) && p.filename !== post.filename).slice(0, 3)
  const shareText = `Check out a new blog post: ${post.title}`

  const url = `https://${domain}/blog/${post.filename.replace(".md", "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: getImageSrc(post.imageSrc),
    datePublished: new Date(post.date).toISOString(),
    url,
    mainEntityOfPage: url,
    author: {"@type": "Organization", name: platform_name, url: `https://${domain}`},
    publisher: {
      "@type": "Organization",
      name: platform_name,
      logo: {"@type": "ImageObject", url: `https://${domain}/logo.png`},
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <Section lg className="pt-0 max-tablet:pt-0 max-mobile:pt-0">
        <Container xs itemsStretch className="pt-12 md:pt-16">
          <Breadcrumbs breadcrumbs={[{href: "/", text: "Home"}, {href: "/blog", text: "Stories"}, {href: `/blog/${id}`, text: post.title}]}/>
          <PageTitle xl className="text-balance mt-2">{post.title}</PageTitle>
          <Row mobileStack justifyBetween className="max-mobile:items-start">
            <Text secondary>{getDate(post.date)}</Text>
            <Sharer shareText={shareText} url={url} labelText={""}/>
          </Row>
        </Container>
        <Container md itemsStretch>
          <Col relative overflowHidden className="aspect-[16/9] rounded-[28px] bg-(--line)">
            <Image src={getImageSrc(post.imageSrc)} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover"/>
          </Col>
        </Container>
        <Container xs itemsStretch tag="article" className="max-w-2xl">
          <MdComponent md={content}/>
          <Row mobileStack justifyBetween borderT className="mt-8 pt-8 max-mobile:items-start">
            <LinkButton href="/blog"><ArrowLeft/> All stories</LinkButton>
            <Sharer shareText={shareText} url={url}/>
          </Row>
        </Container>
        {relatedPosts.length > 0 &&
          <Container lg itemsStretch className="pt-16">
            <SectionTitle xl>Related <Accent>stories</Accent></SectionTitle>
            <Grid3 lg className="gap-y-12 max-tablet:grid-cols-3 max-mobile:grid-cols-1">
              {relatedPosts.map((p) => (
                <BlogCard key={p.filename} post={p}/>
              ))}
            </Grid3>
          </Container>
        }
      </Section>
    </>
  )
}
