import Layout from '../components/layout'
import { Container, Section } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"
import { fetchBlogposts } from "../data/fetchData"
import BlogPosts from "./blogPosts"

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <Layout>
      <Section>
        <Container>
          <PageTitle>Our Blog</PageTitle>
          <BlogPosts posts={posts} />
        </Container>
      </Section>
    </Layout>
  )
}
