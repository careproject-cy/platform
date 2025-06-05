import { Container, Link as VLink, Section, Text, Col } from "@vaneui/ui"
import { platform_name } from "../data/consts"
import Link from 'next/link'

export default function Layout() {
  return (
    <Section className="bg-gray-100 border-t" tag={'footer'}>
      <Container xl>
        <Col className="max-w-lg">
          <Text sm><b>CARE (Cyprus Animals Rescue Effort)</b> is a <VLink link tag={Link} href="https://uanafoundation.com/" target="_blank">UANA Foundation</VLink> initiative that supports animal welfare in Cyprus. Run by devoted volunteers, it’s dedicated to helping stray dogs.</Text>
          <Text sm secondary>&copy; 2025 {platform_name}. All rights reserved.</Text>
        </Col>
      </Container>
    </Section>
  )
}

