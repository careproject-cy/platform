import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col, Row } from "@/components/ui/layout"
import { Text, TextTitle } from "@/components/ui/typography"

export function BlogCard({ post, horizontal, reverse = false }: { post: BlogPostMetadata, horizontal?: boolean, reverse?: boolean }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  const Tag = horizontal ? Row : Col;
  return (
    <Tag lg vCentered reverse={reverse} mdCol={Tag === Row}>
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={getImageSrc(post.imageSrc)}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <Col className="w-full">
        <TextTitle semibold tag={Link} href={`/blog/${id}`}>
          {title}
        </TextTitle>
        <Text className="line-clamp-2">{desc}</Text>
        <Text semibold className="text-gray-500">{getDate(post.date)}</Text>
      </Col>
    </Tag>
  )
}
