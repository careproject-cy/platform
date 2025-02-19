import { Button } from "@/components/ui/button"
import { Col, Container, Section } from "@/components/ui/layout"
import { PageTitle, Text } from "@/components/ui/typography"
import Link from 'next/link'

export default function NotFound() {
  return (
    <Section>
      <Container xl>
        <Col xl centered>
          <PageTitle>404 - Page Not Found</PageTitle>
          <Text>Oops! The page you are looking for does not exist.</Text>
          <Button tag={Link} href="/">Go back home</Button>
        </Col>
      </Container>
    </Section>
  )
}

