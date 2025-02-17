import Link from 'next/link'
import Logo from "./logo"
import { Row, Section } from "@/components/ui/layout"

export default function Layout() {
  return (
    <Section className="border-b max-w-full" tag={'header'}>
      <Row className="w-full justify-between px-5 py-2">
        <Logo />
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/dogs" className="hover:underline">Dogs</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </nav>
      </Row>
    </Section>
  )
}

