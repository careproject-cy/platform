import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"

export function BlogCard({ post, horizontal }: { post: BlogPostMetadata, horizontal?: boolean }) {
  const id = post.filename.replace('.md', '')

  return (
    <Link href={`/blog/${id}`} className={`group ${horizontal ? "grid sm:grid-cols-[220px_1fr] gap-5 items-center" : "block"}`}>
      <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-[var(--line)]">
        <Image src={getImageSrc(post.imageSrc)} alt="" fill sizes="(max-width: 768px) 100vw, 33vw"
               className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
      </div>
      <div className={horizontal ? "" : "mt-4"}>
        <p className="text-sm text-[var(--muted)]">{getDate(post.date)}</p>
        <h3 className="mt-1 font-serif text-2xl leading-tight group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
        <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{post.description}</p>
      </div>
    </Link>
  )
}
