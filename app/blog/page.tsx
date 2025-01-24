import Layout from '../components/layout'
import { blogPosts } from '../data/blog-posts'
import Container from "@/components/ui/container"
import { BlogCard } from "../components/blogCard"
import { Button } from "@/components/ui/button"

export default function BlogPage() {

  const recentPosts = blogPosts.slice(1, 7)
  const latestPost = blogPosts[0]

  return (
    <Layout>
      <Container className="gap-6">
        <h2 className="text-4xl font-semibold mb-4 w-full text-center">Our Blog</h2>
        <BlogCard large post={latestPost} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard large={false} key={post.id} post={post} />
          ))}
        </div>
        <div className="my-12 text-center">
          <Button>Load More Posts</Button>
        </div>
      </Container>
    </Layout>
  )
}

