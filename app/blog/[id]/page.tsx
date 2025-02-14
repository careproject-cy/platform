import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Col, Container } from "@/components/ui/layout"
import { PageTitle, SectionTitle, Text } from "@/components/ui/typography"
import Md from "@/app/components/md/md"
import { fetchBlogposts, fetchText } from "@/app/data/fetchData"
import Image from "next/image"
import { getImageSrc } from "@/app/utils/images"
import { getDate } from "@/app/utils/dateUtils"
import { Divider } from "@/components/ui/divider"
import { LargeBlogCard } from "@/app/components/blog/largeBlogCard"

interface BlogPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params
  const posts = await fetchBlogposts();
  const post = posts.find(p => p.filename === `${id}.md`)
  const markdown = await fetchText(`data/blog/${id}.md`)

  if (!post) {
    notFound()
  }

  const relatedPosts = posts.filter(p => p.tags.some(t => post.tags.includes(t)) && p.filename !== post.filename).slice(0, 3)

  return (
    <Layout>
      <Container tag={"article"} className="my-10 max-w-4xl">
        <Col className="gap-10">
          <Col className="gap-6">
            <PageTitle>{post.title}</PageTitle>
            <Text>{getDate(post.date)}</Text>
            <Image
              src={getImageSrc(post.imageSrc)}
              alt={post.title}
              width={600}
              height={400}
              className="relative object-cover w-full aspect-3/2 rounded-xl overflow-hidden"
            />
            <Md text={markdown} />
            <Button tag={Link} href="/blog" className="w-fit">Back to Blog</Button>
          </Col>
          <Divider />
          <SectionTitle>Related Posts</SectionTitle>
          <Col className="gap-10">
            {relatedPosts.map((p, i) => (
              <LargeBlogCard key={p.filename} post={p} showBadge={false} showButton={false} reverse={i % 2 !== 0} />
            ))}
          </Col>
        </Col>
      </Container>
    </Layout>
  )
}
