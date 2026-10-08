import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"

export function LargeBlogCard({post}: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')
  return (
    <Link href={`/blog/${id}`} className="group grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
      <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden bg-[var(--line)]">
        <Image src={getImageSrc(post.imageSrc)} alt="" fill priority sizes="(max-width: 1024px) 100vw, 60vw"
               className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
      </div>
      <div>
        <p className="text-sm text-[var(--muted)]">
          {post.tags[0] && <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 mr-3 capitalize">{post.tags[0]}</span>}
          {getDate(post.date)}
        </p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.02] tracking-[-0.01em] group-hover:text-[var(--accent)] transition-colors">{post.title}</h2>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed line-clamp-3">{post.description}</p>
        <span className="inline-block mt-6 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium group-hover:border-[var(--ink)]">Read the story</span>
      </div>
    </Link>
  )
}
