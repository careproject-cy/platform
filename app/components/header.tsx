'use client'

import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@vaneui/ui"
import { Button } from "@vaneui/ui"
import { useState } from "react"
import { usePathname } from 'next/navigation'
import { Heart } from 'react-feather';

export default function Layout() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  return (
    <Row itemsCenter justifyBetween relative className="border-b px-4 py-2 w-full bg-white" tag={'header'} lgCol>
      <Row itemsCenter justifyBetween className="max-lg:w-full">
        <Logo/>
        <Button noShadow rounded className="hidden max-lg:flex p-2" onClick={() => setIsVisible(!isVisible)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"></path>
          </svg>
        </Button>
      </Row>
      <Row sm itemsCenter lgCol tag="nav"
           className={`max-lg:w-full max-lg:flex ${isVisible ? 'max-lg:flex' : 'max-lg:hidden'}`}>
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
              <Button lg noRing accent={active} bold={active} medium={!active} tag={Link} key={item.href}
                      href={item.href}
                      className="max-lg:w-full">
                {item.text}
              </Button>
            );
          })
        }
        <Button
          primary filled
          tag={Link}
          href="/more/donate"
          className="hover:opacity-90 max-lg:w-full"
        >
          <Heart className="size-6"/> Donate
        </Button>
      </Row>
    </Row>
  )
}
