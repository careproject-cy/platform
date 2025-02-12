import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { blogPosts } from '../../data/blog-posts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { headers } from "next/headers";
import { Col, Container } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"
import Md from "@/app/components/md/md"

interface BlogPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  let { id } = await params
  const post = blogPosts.find(p => p.id === id)

  id = "2025-01-25_test_text"

  const host = (await headers()).get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";
  const absoluteUrl = `${protocol}://${host}/api/blog/${id}`;

  const res = await fetch(absoluteUrl);

  if (!res.ok) {
    notFound();
  }

  const markdown = await res.text();

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <Container tag={"article"} className="my-10 max-w-4xl">
        <Col className="gap-6">
          <PageTitle>{post.title}</PageTitle>
          <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
          <Md text={markdown} />
          <Button tag={Link} href="/blog" className="w-fit">Back to Blog</Button>
        </Col>
      </Container>
    </Layout>
  )
}