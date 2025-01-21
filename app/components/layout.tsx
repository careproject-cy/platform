import Link from 'next/link'
import Container from "@/components/ui/container"
import Logo from "./logo"
import { platform_name } from "../data/consts"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="justify-between border-b max-w-full px-5 py-3" tag={'header'}>
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
      <Container className="flex-grow flex-col" tag={'main'}>
        {children}
      </Container>
      <Container className="bg-gray-100 border-t max-w-full" tag={'footer'}>
        <Container className="py-3 px-0">
          <p className="text-sm">&copy; 2025 {platform_name}. All rights reserved.</p>
        </Container>
      </Container>
    </div>
  )
}

