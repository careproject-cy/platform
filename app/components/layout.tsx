import Link from 'next/link'
import Container from "@/components/ui/container"
import Logo from "./logo"
import { platform_name } from "../data/consts"
import Section from "@/components/ui/section"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Section className="border-b max-w-full" tag={'header'}>
        <Container className="flex-row justify-between px-5 py-2 max-w-full" tag={'div'}>
          <Logo />
          <nav className="p-2">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/dogs" className="hover:underline">Dogs</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/#adopt" className="hover:underline">Adopt</Link></li>
              <li><Link href="/#about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </Container>
      </Section>
      <Section className="flex-col gap-12" tag={'main'}>
        {children}
      </Section>
      <Section className="bg-gray-100 border-t p-5" tag={'footer'}>
        <Container className="py-3 px-0">
          <p className="text-sm">&copy; 2025 {platform_name}. All rights reserved.</p>
        </Container>
      </Section>
    </div>
  )
}

