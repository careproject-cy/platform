'use client'

import { BlogCard } from "@/app/components/blog/blogCard"
import { useState } from 'react'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { LargeBlogCard } from "@/app/components/blog/largeBlogCard"

export default function BlogPosts({ posts }: { posts: BlogPostMetadata[] }) {

  const [visibleCount, setVisibleCount] = useState(7)
  const latestPost = posts[0]
  const visiblePosts = posts.slice(1, visibleCount)

  if (!latestPost) return <p className="text-lg text-[var(--muted)]">No posts yet - check back soon.</p>

  return (
    <>
      <LargeBlogCard post={latestPost} />
      <div className="mt-20 pt-14 border-t border-[var(--line)] grid md:grid-cols-3 gap-x-6 gap-y-12">
        {visiblePosts.map((post) => (
          <BlogCard key={post.filename} post={post} />
        ))}
      </div>
      {visibleCount < posts.length && (
        <div className="flex justify-center pt-14">
          <button onClick={() => setVisibleCount(prev => prev + 6)}
                  className="rounded-full border border-[var(--line)] px-6 py-3 font-medium hover:border-[var(--ink)]">
            Load more stories
          </button>
        </div>
      )}
    </>
  )
}
