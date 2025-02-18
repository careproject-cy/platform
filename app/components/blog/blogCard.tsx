import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col } from "@/components/ui/layout"
import { Text } from "@/components/ui/typography"

export function BlogCard({ post }: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  return (
    <Col>
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={getImageSrc(post.imageSrc)}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <Col>
        <h3 className={`font-semibold leading-none tracking-tight text-2xl`}>
          <Link href={`/blog/${id}`} className="w-full">
            {title}
          </Link>
        </h3>
        <Text className="line-clamp-2">{desc}</Text>
        <Text className="semibold text-gray-500">{getDate(post.date)}</Text>
      </Col>
    </Col>
  )
}
