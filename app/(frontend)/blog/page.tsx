import type { Metadata } from 'next'
import { fetchBlogposts } from "@/app/data/fetchData"
import BlogPosts from "./blogPosts"
import { platform_name } from "@/app/data/consts"
import { PageHeader } from "@/app/components/site/heading"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Our Blog"} | ${platform_name}`,
  };
}

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-24">
      <PageHeader title={<>From our <em className="text-[var(--accent)]">notebook</em></>}>
        Rescue stories, adoption advice, and pet care tips for dog owners in Cyprus.
      </PageHeader>
      <BlogPosts posts={posts}/>
    </div>
  )
}
