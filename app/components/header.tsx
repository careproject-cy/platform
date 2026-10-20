'use client'

import Image from "next/image"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Button, IconButton, Menu, MenuItem, NavLink, Row, Text } from "@vaneui/ui"
import { Heart, Menu as MenuIcon } from "react-feather"

const nav = [
  { href: "/dogs", text: "Dogs" },
  { href: "/more/adopt", text: "Adopt" },
  { href: "/more/foster", text: "Foster" },
  { href: "/blog", text: "Stories" },
  { href: "/more/about", text: "About" },
]

// Invisible hit area: the compact header controls look the same but get a ≥44px tall touch target.
const hitArea = "after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-['']"

// Client component: active nav state and the Volunteer link depend on the current path.
export default function Header() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  // Volunteer links to a section of Get involved, so it is hidden while that page is open.
  const volunteer = pathname === "/more/get-involved" ? [] : [{ href: "/more/get-involved#volunteer", text: "Volunteer" }]

  return (
    <Row tag="header" sticky borderB noGap justifyCenter
         className="top-0 z-50 bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl">
      <Row xl justifyBetween className="w-full max-w-6xl 2xl:max-w-7xl h-16 px-4 md:px-6">
        <Row sm noShrink relative tag={NextLink} href="/" className={`rounded-md ${hitArea}`}>
          <Image src="/logo.svg" alt="" width={45} height={32} className="h-8 w-auto rounded-md"/>
          <Text fontSemibold trackingTight whitespaceNowrap>CARE Project</Text>
        </Row>
        <Row xs tag="nav" aria-label="Main" tabletHide className="flex-1">
          {nav.map(n => (
            <NavLink key={n.href} wFit tag={NextLink} href={n.href} active={isActive(n.href)}>{n.text}</NavLink>
          ))}
        </Row>
        <Row sm>
          {volunteer.map(n => (
            <NavLink key={n.href} wFit tabletHide tag={NextLink} href={n.href}>{n.text}</NavLink>
          ))}
          <Button sm filled accent relative tag={NextLink} href="/more/donate" className={hitArea}>
            <Heart fill="currentColor"/> Donate
          </Button>
          <div className="lg:hidden">
            <Menu trigger={<IconButton sm relative aria-label="Open menu" className="after:absolute after:-inset-1.5 after:content-['']"><MenuIcon/></IconButton>}>
              {[{ href: "/", text: "Home" }, ...nav, ...volunteer].map(n => (
                <MenuItem key={n.href} tag={NextLink} href={n.href}>{n.text}</MenuItem>
              ))}
            </Menu>
          </div>
        </Row>
      </Row>
    </Row>
  )
}
