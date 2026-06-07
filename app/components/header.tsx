'use client'

import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@vaneui/ui"
import { Button } from "@vaneui/ui"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import { Heart } from 'react-feather';

export default function Layout() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // The header lives in the root layout and persists across App Router
  // navigations, so the mobile menu would stay open after tapping a link.
  // Close it whenever the route changes.
  useEffect(() => {
    setIsVisible(false)
  }, [pathname])

  return (
    <Row itemsCenter justifyBetween relative wFull className="border-b px-4 py-2 bg-white" tag={'header'} desktopCol>
      <Row itemsCenter justifyBetween className="max-xl:w-full">
        <Logo/>
        <Button outline noShadow rounded className="hidden max-xl:flex" onClick={() => setIsVisible(!isVisible)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"></path>
          </svg>
        </Button>
      </Row>
      <Row xs itemsCenter desktopCol tag="nav" className={`max-xl:w-full max-xl:flex ${isVisible ? 'max-xl:flex' : 'max-xl:hidden'}`}>
        {
          [
            {href: "/", text: "Home"},
            {href: "/dogs", text: "Dogs"},
            {href: "/blog", text: "Blog"},
            {href: "/more/adopt", text: "Adopt"},
            {href: "/more/foster", text: "Foster"},
            {href: "/more/about", text: "About"},
            {href: "/more/get-involved", text: "Get Involved"},
          ].map((item) => {
            const active = pathname === item.href;
            return (
              <Button lg noRing noBorder noShadow outline accent={active} bold={active} medium={!active} tag={Link} key={item.href}
                      href={item.href}
                      className="max-xl:w-full ring-transparent">
                {item.text}
              </Button>
            );
          })
        }
        <Button accent filled tag={Link} href="/more/donate" className="hover:opacity-90 max-xl:w-full">
          <Heart className="size-6"/> Donate
        </Button>
      </Row>
    </Row>
  )
}
