'use client'

import { useEffect } from 'react'
import { Button, Col, Container, Section, PageTitle, Text } from "@vaneui/ui"

// Catches render/data errors in the frontend group (e.g. a Neon cold-start timeout) so the site
// shows branded copy with a retry instead of Next's raw 500.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section>
      <Container xl>
        <Col xl itemsCenter>
          <PageTitle>Something went wrong</PageTitle>
          <Text>We could not load this page. Please try again in a moment.</Text>
          <Button lg secondary onClick={reset}>Try again</Button>
        </Col>
      </Container>
    </Section>
  )
}
