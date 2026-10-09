'use client'

import { getDate } from "@/app/utils/dateUtils"
import Image from 'next/image'
import NextLink from 'next/link'
import { Col, Text, Title } from "@vaneui/ui"
import { BlogPostMetadata } from "@/app/data/blogPostMetadata"
import { getImageSrc } from "@/app/utils/images"

export function BlogCard({ post }: { post: BlogPostMetadata }) {
  const id = post.filename.replace('.md', '')

  return (
    <Col tag={NextLink} href={`/blog/${id}`} className="group">
      <Col relative overflowHidden className="aspect-[4/3] rounded-[22px] bg-(--line)">
        <Image src={getImageSrc(post.imageSrc)} alt="" fill sizes="(max-width: 768px) 100vw, 33vw"
               className="object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
      </Col>
      <Col xs>
        <Text sm secondary>{getDate(post.date)}</Text>
        <Title className="group-hover:text-(--color-text-accent) transition-colors">{post.title}</Title>
        <Text sm secondary lineClamp2>{post.description}</Text>
      </Col>
    </Col>
  )
}
