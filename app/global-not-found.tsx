import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { Button, Col, PageTitle, Section, Text } from '@vaneui/ui'
import './(frontend)/globals.css'
import { platform_name } from '@/app/data/consts'

// With two root layouts there is no root not-found to build /_not-found from, so Next would
// otherwise serve its unstyled default. This renders its own document by design.
export const metadata: Metadata = {
  title: `404 - Page Not Found | ${platform_name}`,
}

const sans = Inter({ variable: '--font-sans', subsets: ['latin'] })
const serif = Instrument_Serif({ variable: '--font-serif', subsets: ['latin'], weight: '400', style: ['normal', 'italic'] })

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} antialiased font-sans`}>
        <Section hScreen itemsCenter justifyCenter tag="main">
          <Col lg itemsCenter className="max-w-3xl">
            <PageTitle xl fontNormal textCenter>This page wandered <em className="italic text-(--color-text-accent)">off</em></PageTitle>
            <Text lg secondary textCenter>The page you are looking for does not exist.</Text>
            <Button md pill filled accent href="/">Open home page</Button>
          </Col>
        </Section>
      </body>
    </html>
  )
}
