import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@/components/ui/layout"
import { Button } from "@/components/ui/button"

export default function Layout() {
  return (
    <Row className="justify-between border-b px-4 py-2" tag={'header'}>
      <Logo />
      <Row tag={"nav"}>
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/dogs" className="hover:underline">Dogs</Link>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <Link href="/more/about" className="hover:underline">About</Link>
        <Button tag={Link} href="/more/get-involved" className="bg-gradient-to-br from-orange-400 to-red-600 border-orange-400 font-bold text-white hover:opacity-90 hover:scale-105">Get Involved</Button>
      </Row>
    </Row>
  )
}
