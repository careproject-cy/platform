import Link from 'next/link'
import DogCard from '../dogCard'
import {
  Button,
  Col,
  Container,
  Grid4,
  Section,
  Badge,
  SectionTitle,
} from "@vaneui/ui"
import { ArrowRight } from "react-feather";
import { DogMetadata } from "../../data/dogMetadata";

interface AvailableDogsSectionProps {
  dogs: DogMetadata[]
}

export default function AvailableDogsSection({ dogs }: AvailableDogsSectionProps) {
  return (
    <Section>
      <Container xl itemsCenter>
        <Col lg itemsCenter>
          <Badge>Meet the dogs</Badge>
          <SectionTitle>Dogs Available For Adoption</SectionTitle>
        </Col>
        <Grid4>
          {dogs.map((dog) => (
            <DogCard key={dog.filename} {...dog} />
          ))}
        </Grid4>
        <Button lg tag={Link} href="/dogs">
          View All Dogs <ArrowRight/>
        </Button>
      </Container>
    </Section>
  )
}