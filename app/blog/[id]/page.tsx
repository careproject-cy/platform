import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Button, Row } from "@vaneui/ui"
import { Col, Container, Section } from "@vaneui/ui"
import { PageTitle, SectionTitle, Text } from "@vaneui/ui"
import MdComponent from "@/app/components/md/mdComponent"
import { fetchBlogposts, fetchMd } from "@/app/data/fetchData"
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

export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
  const {id} = await params;
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)
  return {
    title: `${post?.title ?? "Page"} | ${platform_name}`,
    // You can also add description or other meta from frontmatter.
  };
}

export default async function BlogPage({params}: BlogPageProps) {
  const {id} = await params
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)
  const {content} = await fetchMd(`data/blog/${id}.md`)

  if (!post || !post.visible) {
    notFound()
  }

  const relatedPosts = posts.filter(p => p.tags.some(t => post.tags.includes(t)) && p.filename !== post.filename).slice(0, 3)
  const shareText = `Check out a new blog post: ${post.title}`

  const url = `https://${domain}/blog/${post.filename.replace(".md", "")}`;

  return (
    <Section>
      <Container sm>
        <Col lg>
          <PageTitle>{post.title}</PageTitle>
          <Row justifyBetween>
            <Text secondary semibold className="w-full">{getDate(post.date)}</Text>
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
          <Button lg tag={Link} href="/blog"><ArrowLeft/>Back to Blog</Button>
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
