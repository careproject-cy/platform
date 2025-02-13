import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPostMetadata
}

export function BlogCard({ post }: BlogCardProps) {
  const id = post.filename.replace('.md', '')
  const date = new Date(post.date).toLocaleDateString()
  const image = post.imageSrc
  const title = post.title
  const desc = post.description
  return (
    <div className="w-full flex flex-col gap-6">
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <div className="w-full flex flex-col gap-4">
        <h3 className={`font-semibold leading-none tracking-tight text-2xl`}>
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <div className="line-clamp-2 text-sm">{desc}</div>
        <div className="text-sm font-semibold text-gray-500">{date}</div>
      </div>
    </div>
  )
}

export function LargeBlogCard({ post }: BlogCardProps) {
  const id = post.filename.replace('.md', '')
  const date = new Date(post.date).toLocaleDateString()
  const image = post.imageSrc
  const title = post.title
  const desc = post.description
  const tags = post.tags
  return (
    <div className="w-full flex flex-row gap-10">
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <div className="w-full flex flex-col gap-6 justify-center">
        <Badge>{tags[0]}</Badge>
        <h3 className="font-semibold leading-none tracking-tight text-3xl">
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <div className="line-clamp-3 text-md">{desc}</div>
        <div className="text-md font-semibold text-gray-500">{date}</div>
        <div className="flex">
          <Link href={`/blog/${id}`}>
            <div className="flex justify-center items-center border-1 rounded-xl px-4 py-2 text-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
              Read more
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

