import { Col, Section } from "@/components/ui/layout"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Col className="min-h-screen">
      <Header />
      <Section className="gap-12 flex-1" tag={'main'}>
        {children}
      </Section>
      <Footer />
    </Col>
  )
}

