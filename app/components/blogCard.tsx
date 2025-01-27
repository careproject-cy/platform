import Badge from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from "../data/blog-posts"

interface BlogCardProps {
  post: BlogPost
  large: boolean
}

export function BlogCard({ post, large }: BlogCardProps) {
  const id = post.id
  const date = new Date(post.date).toLocaleDateString()
  const image = post.image
  const title = post.title
  const desc = post.description
  const tags = post.tags
  return (
    <div className={`w-full flex ${large ? "flex-row gap-10" : "flex-col gap-6"}`}>
      <Link href={`/blog/${id}`} className="w-full">
        <div className="w-full relative rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="relative object-cover h-auto w-full aspect-3/2"
          />
        </div>
      </Link>
      <div className={`w-full flex flex-col ${large ? "gap-6 justify-center" : "gap-4"}`}>
        {large &&
          <Badge>{tags[0]}</Badge>
        }
        <h3 className={`font-semibold leading-none tracking-tight ${large ? "text-3xl" : "text-2xl"}`}>
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <div className={`${large ? "line-clamp-3 text-md" : "line-clamp-2 text-sm"}`}>{desc}</div>
        <div className={`${large ? "text-md" : "text-sm"} font-semibold text-gray-500`}>{date}</div>
        {large &&
          <div className="flex">
            <Link href={`/blog/${id}`}>
              <div className="flex justify-center items-center border-1 rounded-xl px-4 py-2 text-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
                Read more
              </div>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

