import { getDate } from "@/app/utils/dateUtils"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"


export function LargeBlogCard({ post, showBadge = true, showButton = true, reverse = false }: { post: BlogPostMetadata, showBadge?: boolean, showButton?: boolean, reverse?: boolean }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  const tags = post.tags
  return (
    <div className={`w-full flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-10`}>
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={getImageSrc(post.imageSrc)}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <div className="w-full flex flex-col gap-6 justify-center">
        {showBadge && tags.length > 0 &&
          <Badge>{tags[0]}</Badge>
        }
        <h3 className="font-semibold leading-none tracking-tight text-3xl">
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <div className="line-clamp-3 text-md">{desc}</div>
        <div className="text-md font-semibold text-gray-500">{getDate(post.date)}</div>
        {showButton &&
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

