import { Col } from "@/components/ui/layout"
import Header from "./header"
import Footer from "./footer"

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Col className="min-h-screen" ignoreSize>
      <Header />
      <Col tag={'main'} ignoreSize className="flex-1">
        {children}
      </Col>
      <Footer />
    </Col>
  )
}
