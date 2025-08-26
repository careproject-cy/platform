import { getDate } from "@/app/utils/dateUtils"
import { Badge, SectionTitle } from "@vaneui/ui"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col, Row } from "@vaneui/ui"
import { Text } from "@vaneui/ui"
import { Button } from "@vaneui/ui"
import { ArrowRight } from "react-feather";


export function LargeBlogCard({post}: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  const tags = post.tags
  return (
    <Row xl lgCol itemsCenter>
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
      <Col>
        <Badge sm lgHide hidden={tags.length === 0}>{tags[0]}</Badge>
        <SectionTitle serif lg tag={Link} href={`/blog/${id}`}>{title}</SectionTitle>
        <Text lg secondary className="line-clamp-3">{desc}</Text>
        <Text lg secondary semibold>{getDate(post.date)}</Text>
        <Button lg tag={Link} href={`/blog/${id}`}>Read more<ArrowRight/></Button>
      </Col>
    </Row>
  )
}

