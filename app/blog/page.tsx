import Layout from '../components/layout'
import { Container, Section } from "@vaneui/ui"
import { PageTitle } from "@vaneui/ui"
import { fetchBlogposts } from "../data/fetchData"
import BlogPosts from "./blogPosts"

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <Layout>
      <Section>
        <Container xl itemsCenter>
          <PageTitle>Our Blog</PageTitle>
          <BlogPosts posts={posts} />
        </Container>
      </Section>
    </Layout>
  )
}
