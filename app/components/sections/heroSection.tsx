import Link from 'next/link'
import Carousel from "../carousel"
import { subtitle } from "../../data/consts"
import {
  Button,
  Col,
  Container,
  Row,
  Section,
  PageTitle,
  Text,
} from "@vaneui/ui"
import { ArrowRight, CheckCircle } from "react-feather";

interface HeroSectionProps {
  carouselImages: string[]
}

export default function HeroSection({ carouselImages }: HeroSectionProps) {
  return (
    <Section accent className="border-b mesh-grad">
      <Container xl className="py-12 max-lg:py-10 max-md:py-8">
        <Row xl lgCol className="max-lg:gap-20">
          <Col xl className="w-1/2 max-lg:w-full">
            <PageTitle default>
              Every dog deserves a <span className="whitespace-nowrap"><span
              className="relative isolate inline-block no-underline text-accent
         before:content-[''] before:absolute before:left-0 before:top-2/3
         before:w-full before:h-[25%] before:bg-yellow-200 before:-z-[1]"
            >loving home</span>.</span> Help us give them a
              chance.
            </PageTitle>
            <Text lg default>{subtitle}</Text>
            <Row lg smCol>
              <Button filled primary lg tag={Link} href="/more/donate"
                      className="max-sm:w-full">
                <CheckCircle/> Support Us
              </Button>
              <Button lg tag={Link} href="/more/about"
                      className="max-sm:w-full">
                Learn More <ArrowRight/>
              </Button>
            </Row>
          </Col>
          <Carousel images={carouselImages} className="max-md:hidden w-1/2 max-lg:w-full max-w-[700px]"/>
        </Row>
      </Container>
    </Section>
  )
}