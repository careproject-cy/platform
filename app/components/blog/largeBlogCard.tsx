'use client'

import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import NextLink from 'next/link'
import { Button, Chip, Col, Row, SectionTitle, Text } from "@vaneui/ui"
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"

export function LargeBlogCard({post}: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')
  return (
    <Row xl tabletStack tag={NextLink} href={`/blog/${id}`} className="group max-tablet:items-stretch">
      <Col relative overflowHidden className="flex-[1.3] w-full aspect-[16/10] rounded-[28px] bg-(--line)">
        <Image src={getImageSrc(post.imageSrc)} alt="" fill priority sizes="(max-width: 1024px) 100vw, 60vw"
               className="object-cover group-hover:scale-[1.03] transition-transform duration-700"/>
      </Col>
      <Col lg className="flex-1">
        <Row sm>
          {post.tags[0] && <Chip sm className="capitalize">{post.tags[0]}</Chip>}
          <Text sm secondary>{getDate(post.date)}</Text>
        </Row>
        <SectionTitle lg className="group-hover:text-(--color-text-accent) transition-colors">{post.title}</SectionTitle>
        <Text lg secondary lineClamp3>{post.description}</Text>
        <Button tag="span">Read the story</Button>
      </Col>
    </Row>
  )
}
