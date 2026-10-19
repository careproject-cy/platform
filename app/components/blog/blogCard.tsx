import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import { Col, Text, Title } from "@vaneui/ui"
import { LinkCol } from "@/app/components/site/links"
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"

export function BlogCard({ post }: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')

  return (
    <LinkCol href={`/blog/${id}`} className="group">
      <Col relative overflowHidden className="aspect-[4/3] rounded-[22px] bg-(--line)">
        <Image src={getImageSrc(post.imageSrc)} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 400px"
               className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
      </Col>
      <Col xs>
        <Text sm secondary>{getDate(post.date)}</Text>
        <Title className="group-hover:text-(--color-text-accent) transition-colors">{post.title}</Title>
        <Text sm secondary lineClamp2>{post.description}</Text>
      </Col>
    </LinkCol>
  )
}
