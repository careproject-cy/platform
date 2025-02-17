import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@/components/ui/layout"

export default function Layout() {
  return (
    <Row className="w-full justify-between border-b px-4 py-2" tag={'header'}>
      <Logo />
      <nav>
        <ul className="flex gap-4">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/dogs" className="hover:underline">Dogs</Link></li>
          <li><Link href="/blog" className="hover:underline">Blog</Link></li>
        </ul>
      </nav>
    </Row>
  )
}

