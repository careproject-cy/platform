'use client'

import { BlogCard } from "../components/blog/blogCard"
import { Button } from "@vaneui/ui"
import { useState } from 'react'
import { Col, Grid3 } from "@vaneui/ui"
import { BlogPostMetadata } from "../data/blogPostMetadata"
import { LargeBlogCard } from "../components/blog/largeBlogCard"

export default function BlogPosts({ posts }: { posts: BlogPostMetadata[] }) {

  const [visibleCount, setVisibleCount] = useState(4)
  const latestPost = posts[0]
  const visiblePosts = posts.slice(1, visibleCount)

  const loadMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  return (
    <>
      <Col lg>
        <LargeBlogCard post={latestPost} />
        <Grid3 lg>
          {visiblePosts.map((post) => (
            <BlogCard key={post.filename} post={post} />
          ))}
        </Grid3>
      </Col>
      {visibleCount < posts.length && (
        <Button onClick={loadMore}>Load More Posts</Button>
      )}
    </>
  )
}
