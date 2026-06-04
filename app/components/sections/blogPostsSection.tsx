"use client"

import Link from 'next/link'
import { BlogCard } from "../blog/blogCard"
import {
  Button,
  Col,
  Container,
  Grid3,
  Section,
  SectionTitle,
} from "@vaneui/ui"
import { LargeBlogCard } from "../blog/largeBlogCard"
import { ArrowRight } from "react-feather";
import { BlogPostMetadata } from "../../data/blogPostMetadata";

interface BlogPostsSectionProps {
  latestPost: BlogPostMetadata
  recentPosts: BlogPostMetadata[]
}

export default function BlogPostsSection({ latestPost, recentPosts }: BlogPostsSectionProps) {
  return (
    <Section>
      <Container xl itemsCenter>
        <SectionTitle>Latest Blog Posts</SectionTitle>
        <Col lg>
          <LargeBlogCard post={latestPost}/>
          <Grid3 lg>
            {recentPosts.map((post) => (
              <BlogCard key={post.filename} post={post}/>
            ))}
          </Grid3>
        </Col>
        <Button lg tag={Link} href="/blog">
          View All Posts <ArrowRight/>
        </Button>
      </Container>
    </Section>
  )
}