'use client'

import NextLink from 'next/link'
import { Button, Col, PageTitle, Row, Section, Text } from "@vaneui/ui"
import { Accent } from "@/app/components/site/heading"

export default function NotFound() {
  return (
    <Section xl itemsCenter>
      <Col lg itemsCenter className="max-w-3xl">
        <Text sm secondary>404</Text>
        <PageTitle xl textCenter>This page wandered <Accent>off</Accent></PageTitle>
        <Text lg secondary textCenter>The page you are looking for does not exist.</Text>
        <Row sm flexWrap justifyCenter>
          <Button filled accent tag={NextLink} href="/">Open home page</Button>
          <Button tag={NextLink} href="/dogs">Meet the dogs</Button>
        </Row>
      </Col>
    </Section>
  )
}
