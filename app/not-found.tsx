import { Button, Col, Container, Section, PageTitle, Text } from "@vaneui/ui"
import Link from 'next/link'

export default function NotFound() {
  return (
    <Section>
      <Container xl>
        <Col xl itemsCenter>
          <PageTitle>404 - Page Not Found</PageTitle>
          <Text>Oops! The page you are looking for does not exist.</Text>
          <Button tag={Link} href="/">Open home page</Button>
        </Col>
      </Container>
    </Section>
  )
}

