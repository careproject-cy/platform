import { notFound } from 'next/navigation'
import Layout from '../../components/layout'
import { blogPosts } from '../../data/blog-posts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface BlogPageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">{new Date(post.date).toLocaleDateString()}</p>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
        <Button tag={Link} href="/blog" className="w-fit">Back to Blog</Button>
      </article>
    </Layout>
  )
}