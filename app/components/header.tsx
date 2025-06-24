'use client'

import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@vaneui/ui"
import { Button } from "@vaneui/ui"
import { useState } from "react"
import { usePathname } from 'next/navigation'

export default function Layout() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Helper function to conditionally apply the active class
  const getLinkClasses = (href: string) =>
    `hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center whitespace-nowrap ${pathname === href ? 'bg-gray-100' : ''}`

  return (
    <Row itemsCenter justifyBetween relative className="border-b px-4 py-2 w-full bg-white" tag={'header'} lgCol>
      <Row itemsCenter justifyBetween className="max-lg:w-full">
        <Logo/>
        <Button className="hidden max-lg:flex" onClick={() => setIsVisible(!isVisible)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"></path>
          </svg>
        </Button>
      </Row>
      <Row sm itemsCenter lgCol tag="nav"
           className={`max-lg:w-full max-lg:flex ${isVisible ? 'max-lg:flex' : 'max-lg:hidden'}`}>
        <Link className={getLinkClasses("/")} href="/">Home</Link>
        <Link className={getLinkClasses("/dogs")} href="/dogs">Dogs</Link>
        <Link className={getLinkClasses("/blog")} href="/blog">Blog</Link>
        <Link className={getLinkClasses("/more/adopt")} href="/more/adopt">Adopt</Link>
        <Link className={getLinkClasses("/more/foster")} href="/more/foster">Foster</Link>
        <Link className={getLinkClasses("/more/about")} href="/more/about">About</Link>
        <Link className={getLinkClasses("/more/get-involved")} href="/more/get-involved">Get Involved</Link>
        <Button
          primary filled
          tag={Link}
          href="/more/donate"
          className="hover:opacity-90 w-full"
        >
          Donate
        </Button>
      </Row>
    </Row>
  )
}
