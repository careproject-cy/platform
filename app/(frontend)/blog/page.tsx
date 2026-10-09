import type { Metadata } from 'next'
import { fetchBlogposts } from "@/app/data/fetchData"
import BlogPosts from "./blogPosts"
import { platform_name } from "@/app/data/consts"
import { Accent, PageHeader } from "@/app/components/site/heading"
import PageShell from "@/app/components/site/pageShell"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${"Our Blog"} | ${platform_name}`,
  };
}

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <PageShell>
      <PageHeader title={<>From our <Accent>notebook</Accent></>}>
        Rescue stories, adoption advice, and pet care tips for dog owners in Cyprus.
      </PageHeader>
      <BlogPosts posts={posts}/>
    </PageShell>
  )
}
