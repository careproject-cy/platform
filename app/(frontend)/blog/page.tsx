import type { Metadata } from 'next'
import { fetchBlogposts } from "@/app/data/fetchData"
import BlogPosts from "./blogPosts"
import { baseOpenGraph, platform_name } from "@/app/data/consts"
import { Accent, PageHeader } from "@/app/components/site/heading"
import PageShell from "@/app/components/site/pageShell"

const title = `Dog Adoption & Care Advice for Cyprus | ${platform_name}`
const description = "Rescue stories, adoption advice and dog-safety tips for owners in Cyprus, from foxtail grass to processionary caterpillars."

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      url: './',
      title,
      description,
      images: [{ url: '/social-preview.png', width: 1200, height: 630, alt: 'CARE Project rescue dogs in Cyprus' }],
    },
  };
}

export default async function BlogPage() {
  const posts = await fetchBlogposts()

  return (
    <PageShell>
      <PageHeader title={<>From our <Accent>notebook</Accent>: rescue stories and dog care in Cyprus</>}>
        Rescue stories, adoption advice, and pet care tips for dog owners in Cyprus.
      </PageHeader>
      <BlogPosts posts={posts}/>
    </PageShell>
  )
}
