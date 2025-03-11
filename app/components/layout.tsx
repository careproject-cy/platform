import { Col } from "@vaneui/ui"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Col className="min-h-screen" noGap>
      <Header />
      <Col tag={'main'} noGap className="flex-1">
        {children}
      </Col>
      <Footer />
    </Col>
  )
}
