"use client"

import InfiniteGallery from '../infiniteGallery'
import Link from 'next/link'
import {
  Button,
  Col,
  Container,
  Section,
  SectionTitle,
  Text,
} from "@vaneui/ui"
import { ArrowRight } from "react-feather"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({images}: GallerySectionProps) {
  return (
    <Section>
      <Container xl itemsCenter>
        <Col itemsCenter wFull>
          <SectionTitle>Success Stories</SectionTitle>
          <Text xl textCenter className="max-w-[600px]">
            Celebrate with us! These amazing dogs have found their forever homes through our rescue efforts.
          </Text>
        </Col>
        <InfiniteGallery images={images} className="w-full"/>
        <Button lg tag={Link} href="/adopted">
          View all adopted dogs <ArrowRight/>
        </Button>
      </Container>
    </Section>
  )
}
