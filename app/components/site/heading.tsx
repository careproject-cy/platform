import { Col, PageTitle, Row, SectionTitle, Text } from "@vaneui/ui"
import Reveal from "./reveal"

export function SectionHeading({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal>
      <Row lg mobileStack justifyBetween itemsEnd className="max-mobile:items-start">
        <SectionTitle xl className="max-w-[14ch] text-balance">{title}</SectionTitle>
        {children}
      </Row>
    </Reveal>
  )
}

// Top of an inner page: optional crumbs line, large serif title, optional intro.
export function PageHeader({ eyebrow, title, children }: { eyebrow?: React.ReactNode; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Col lg tag="header" className="pt-12 md:pt-16 pb-10 md:pb-14">
      {eyebrow}
      <Reveal>
        <PageTitle xl className="max-w-[16ch] text-balance">{title}</PageTitle>
      </Reveal>
      {children && (
        <Reveal delay={80}>
          <Text lg secondary className="max-w-2xl">{children}</Text>
        </Reveal>
      )}
    </Col>
  )
}

// Highlighted words inside a heading; colour comes from the accent token so dark islands get their own.
export function Accent({ children }: { children: React.ReactNode }) {
  return <em className="italic text-(--color-text-accent)">{children}</em>
}
