import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col, Row } from "@vaneui/ui"
import { Text, Title } from "@vaneui/ui"

export function BlogCard({ post, horizontal, reverse = false }: { post: BlogPostMetadata, horizontal?: boolean, reverse?: boolean }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  const Tag = horizontal ? Row : Col;
  
  return (
    <Tag lg itemsCenter reverse={reverse} {...(horizontal ? { mdCol: true } : {})}>
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={getImageSrc(post.imageSrc)}
          alt={title}
          width={300}
          height={200}
          sizes="(max-width: 768px) 100vw, 300px"
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <Col className="w-full">
        <Title semibold serif lg tag={Link} href={`/blog/${id}`}>
          {title}
        </Title>
        <Text secondary className="line-clamp-2">{desc}</Text>
        <Text semibold secondary>{getDate(post.date)}</Text>
      </Col>
    </Tag>
  )
}
