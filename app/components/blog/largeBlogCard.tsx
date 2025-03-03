import { getDate } from "@/app/utils/dateUtils"
import { Badge } from "@vaneui/ui"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col, Row } from "@vaneui/ui"
import { Text, Title } from "@vaneui/ui"
import { Button } from "@vaneui/ui"


export function LargeBlogCard({ post }: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')
  const title = post.title
  const desc = post.description
  const tags = post.tags
  return (
    <Row lg mdCol vCentered>
      <Link href={`/blog/${id}`} className="w-full">
        <Image
          src={getImageSrc(post.imageSrc)}
          alt={title}
          width={300}
          height={200}
          className="relative object-cover h-auto w-full aspect-3/2 rounded-xl overflow-hidden"
        />
      </Link>
      <Col lg>
        <Badge lg lgHide hidden={tags.length === 0}>{tags[0]}</Badge>
        <Title lg tag={Link} href={`/blog/${id}`}>{title}</Title>
        <Text lg secondary className="line-clamp-3">{desc}</Text>
        <Text lg semibold muted>{getDate(post.date)}</Text>
        <Button tag={Link} href={`/blog/${id}`} lgHide>Read more</Button>
      </Col>
    </Row>
  )
}

