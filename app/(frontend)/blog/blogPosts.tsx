'use client'

import { BlogCard } from "@/app/components/blog/blogCard"
import { useState } from 'react'
import { Button, Col, Grid3, Row, Text } from "@vaneui/ui"
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { LargeBlogCard } from "@/app/components/blog/largeBlogCard"

export default function BlogPosts({ posts }: { posts: BlogPostMetadata[] }) {

  const [visibleCount, setVisibleCount] = useState(7)
  const latestPost = posts[0]
  const visiblePosts = posts.slice(1, visibleCount)

  if (!latestPost) return <Text lg secondary>No posts yet - check back soon.</Text>

  return (
    <Col xl noGap>
      <LargeBlogCard post={latestPost} />
      <Grid3 lg borderT className="mt-20 pt-14 gap-y-12 max-tablet:grid-cols-3 max-mobile:grid-cols-1">
        {visiblePosts.map((post) => (
          <BlogCard key={post.filename} post={post} />
        ))}
      </Grid3>
      {visibleCount < posts.length && (
        <Row justifyCenter className="pt-14">
          <Button onClick={() => setVisibleCount(prev => prev + 6)}>Load more stories</Button>
        </Row>
      )}
    </Col>
  )
}
