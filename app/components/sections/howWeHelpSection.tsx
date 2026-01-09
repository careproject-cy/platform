import {
  Container,
  Section,
  SectionTitle,
  Text,
  Grid2,
  Card,
  Title,
  Col,
} from "@vaneui/ui"
import { BarChart, CheckCircle, Eye, Home } from "react-feather";

export default function HowWeHelpSection() {
  const cards = [
    {
      title: "Veterinary Care",
      text:
        "Exams, vaccinations, spay/neuter, diagnostics, and medicines: getting dogs healthy and ready for the next step.",
      icon: CheckCircle,
    },
    {
      title: "Rehabilitation & Recovery",
      text:
        "Post-treatment care, wound management, follow-ups, and monitored rest so dogs heal safely and regain strength.",
      icon: BarChart,
    },
    {
      title: "Dogs Socialization",
      text:
        "With socialization of dogs, we build confidence and good habits — socializing dogs so they're ready for family life.",
      icon: Eye,
    },
    {
      title: "Adoption & Safe Transport",
      text:
        "We promote dogs for adoption, handle paperwork and microchips, and organize transport in Cyprus and abroad.",
      icon: Home,
    },
  ]

  return (
    <Section>
      <Container xl>
        <Col className="w-full">
          <SectionTitle>How we help dogs</SectionTitle>
          <Text xl className="max-w-[800px]">Volunteer-led support for shelters: medical care, recovery, foster prep,
            and adoption/transport so
            rescued dogs are healthy, confident, and home-ready.</Text>
        </Col>
        <Grid2>
          {cards.map((card, index) => (
            <Card lg relative key={index} className="bg-gradient-to-br from-white via-white to-orange-50">
              <Card accent shadow className="w-fit border-2 p-3">
                <card.icon className="size-10"/>
              </Card>
              <Title>{card.title}</Title>
              <Text xl secondary>{card.text}</Text>
            </Card>
          ))}
        </Grid2>
      </Container>
    </Section>
  )
}