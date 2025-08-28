import InfiniteGallery from '../infiniteGallery'
import {
  Col,
  Container,
  Section,
  SectionTitle,
  Text,
} from "@vaneui/ui"

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
        <Col itemsCenter className="w-full">
          <SectionTitle>Success Stories</SectionTitle>
          <Text xl textCenter className="max-w-[600px]">
            Celebrate with us! These amazing dogs have found their forever homes through our rescue efforts.
          </Text>
        </Col>
        <InfiniteGallery images={images} className="w-full"/>
      </Container>
    </Section>
  )
}