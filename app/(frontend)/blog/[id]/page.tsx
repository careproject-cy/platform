import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Button, Row } from "@vaneui/ui"
import { Col, Container, Section } from "@vaneui/ui"
import { PageTitle, SectionTitle, Text } from "@vaneui/ui"
import MdComponent from "@/app/components/md/mdComponent"
import { fetchBlogposts, fetchPostBody } from "@/app/data/fetchData"
import Image from "next/image"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import { Divider } from "@vaneui/ui"
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
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <Container sm>
        <Col lg>
          <PageTitle>{post.title}</PageTitle>
          <Row mobileCol justifyBetween>
            <Text secondary semibold wFull>{getDate(post.date)}</Text>
            <Sharer shareText={shareText} url={url} labelText={""}/>
          </Row>
        </Col>
      </Container>
      <Container xs tag={"article"}>
        <Col xl>
          <Col lg>
            <Image
              src={getImageSrc(post.imageSrc)}
              alt={post.title}
              width={600}
              height={400}
              className="relative object-cover w-full aspect-3/2 rounded-xl overflow-hidden"
            />
            <MdComponent md={content}/>
            <Sharer shareText={shareText} url={url}/>
          </Col>
          <Link href="/blog"><Button lg><ArrowLeft/>Back to Blog</Button></Link>
          {relatedPosts.length === 0 ? null :
            <>
              <Divider/>
              <SectionTitle lg>Related Posts</SectionTitle>
              <Col xl>
                {relatedPosts.map((p, i) => (
                  <BlogCard key={p.filename} post={p} horizontal reverse={i % 2 !== 0}/>
                ))}
              </Col>
            </>
          }
        </Col>
      </Container>
    </Section>
  )
}
