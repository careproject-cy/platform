import { Col } from "@/components/ui/layout"
import Header from "./header"
import Footer from "./footer"

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Col className="min-h-screen gap-0">
      <Header />
      <Col tag={'main'} className="gap-0">
        {children}
      </Col>
      <Footer />
    </Col>
  )
}
