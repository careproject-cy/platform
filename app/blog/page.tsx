'use client'
import Layout from '../components/layout'
import { blogPosts } from '../data/blog-posts'
import Container from "@/components/ui/container"
import { BlogCard } from "../components/blogCard"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(7)
  const latestPost = blogPosts[0]
  const visiblePosts = blogPosts.slice(1, visibleCount)

  const loadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <Layout>
      <Container className="gap-6 my-12">
        <h2 className="text-4xl font-semibold mb-4 w-full text-center">Our Blog</h2>
        <BlogCard large post={latestPost} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map(post => (
            <BlogCard large={false} key={post.id} post={post} />
          ))}
        </div>
        {visibleCount < blogPosts.length && (
          <div className="my-12 text-center">
            <Button onClick={loadMore}>Load More Posts</Button>
          </div>
        )}
      </Container>
    </Layout>
  )
}
