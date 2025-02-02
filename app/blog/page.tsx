'use client'
import Layout from '../components/layout'
import { blogPosts } from '../data/blog-posts'
import { BlogCard, LargeBlogCard } from "../components/blog/blogCard"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Col, Container, Grid3 } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(4)
  const latestPost = blogPosts[0]
  const visiblePosts = blogPosts.slice(1, visibleCount)

  const loadMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  return (
    <Layout>
      <Container className="my-10 gap-10">
        <PageTitle>Our Blog</PageTitle>
        <Col className="gap-6">
          <LargeBlogCard post={latestPost} />
          <Grid3>
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Grid3>
        </Col>
        {visibleCount < blogPosts.length && (
          <Button onClick={loadMore}>Load More Posts</Button>
        )}
      </Container>
    </Layout>
  )
}
