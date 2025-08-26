import type { Metadata } from 'next'
import { Container, Section } from "@vaneui/ui"
import { PageTitle } from "@vaneui/ui"
import { fetchBlogposts } from "../data/fetchData"
import BlogPosts from "./blogPosts"
import { platform_name } from "../data/consts"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Our Blog"} | ${platform_name}`,
  };
}

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <Section>
      <Container xl itemsCenter>
        <PageTitle>Our Blog</PageTitle>
        <BlogPosts posts={posts}/>
      </Container>
    </Section>
  )
}
