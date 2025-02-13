import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Col, Container } from "@/components/ui/layout"
import { PageTitle, Text } from "@/components/ui/typography"
import Md from "@/app/components/md/md"
import { fetchBlogposts, fetchText } from "@/app/data/fetchData"
import Image from "next/image"

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

  const date = new Date(post.date).toLocaleDateString();

  return (
    <Layout>
      <Container tag={"article"} className="my-10 max-w-4xl">
        <Col className="gap-6">
          <PageTitle>{post.title}</PageTitle>
          <Text>{date}</Text>
          <Image
            src={post.imageSrc}
            alt={post.title}
            width={600}
            height={300}
            className="relative object-cover w-full aspect-3/2 rounded-xl overflow-hidden"
          />
          <Md text={markdown} />
          <Button tag={Link} href="/blog" className="w-fit">Back to Blog</Button>
        </Col>
      </Container>
    </Layout>
  )
}
