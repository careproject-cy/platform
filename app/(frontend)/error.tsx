'use client'

import { useEffect } from 'react'
import { Button, Col, PageTitle, Section, Text } from "@vaneui/ui"

// Catches render/data errors in the frontend group (e.g. a Neon cold-start timeout) so the site
// shows branded copy with a retry instead of Next's raw 500.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section xl itemsCenter>
      <Col lg itemsCenter className="max-w-3xl">
        <PageTitle xl textCenter>Something went wrong</PageTitle>
        <Text lg secondary textCenter>We could not load this page. Please try again in a moment.</Text>
        <Button onClick={reset}>Try again</Button>
      </Col>
    </Section>
  )
}
