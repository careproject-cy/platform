import Link from 'next/link'
import Logo from "./logo"
import { Container, Section } from "@/components/ui/layout"

export default function Layout() {
  return (
    <Section className="border-b max-w-full" tag={'header'}>
      <Container className="flex-row justify-between px-5 py-2 max-w-full" tag={'div'}>
        <Logo />
        <nav className="p-2">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/dogs" className="hover:underline">Dogs</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </nav>
      </Container>
    </Section>
  )
}

