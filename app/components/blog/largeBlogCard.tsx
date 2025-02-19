import { getDate } from "@/app/utils/dateUtils"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"
import { Col, Row } from "@/components/ui/layout"
import { Text, TextTitle } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"


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
        <TextTitle lg tag={Link} href={`/blog/${id}`}>{title}</TextTitle>
        <Text lg className="line-clamp-3">{desc}</Text>
        <Text lg className="font-semibold text-gray-500">{getDate(post.date)}</Text>
        <Button tag={Link} href={`/blog/${id}`} lgHide>Read more</Button>
      </Col>
    </Row>
  )
}

