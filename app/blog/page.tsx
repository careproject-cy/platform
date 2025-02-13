import Layout from '../components/layout'
import { Container } from "@/components/ui/layout"
import { PageTitle } from "@/components/ui/typography"
import { fetchBlogposts } from "../data/fetchData"
import BlogPosts from "./blogPosts"

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <Layout>
      <Container className="my-10 gap-10">
        <PageTitle>Our Blog</PageTitle>
        <BlogPosts posts={posts} />
      </Container>
    </Layout>
  )
}
