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

export default function Header() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Row tag="header" sticky borderB noGap justifyCenter
         className="top-0 z-50 bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl">
      <Row xl justifyBetween className="w-full max-w-6xl 2xl:max-w-7xl h-16 px-4 md:px-6">
        <Row sm noShrink tag={NextLink} href="/" className="rounded-md">
          <Image src="/logo.svg" alt="" width={45} height={32} className="h-8 w-auto rounded-md"/>
          <Text fontSemibold trackingTight whitespaceNowrap>CARE Project</Text>
        </Row>
        <Row xs tag="nav" aria-label="Main" tabletHide className="flex-1">
          {nav.map(n => (
            <NavLink key={n.href} wFit tag={NextLink} href={n.href} active={isActive(n.href)}>{n.text}</NavLink>
          ))}
        </Row>
        <Row sm>
          <NavLink wFit tabletHide tag={NextLink} href="/more/get-involved" active={isActive("/more/get-involved")}>Volunteer</NavLink>
          <Button sm filled accent tag={NextLink} href="/more/donate">
            <Heart fill="currentColor"/> Donate
          </Button>
          <div className="lg:hidden">
            <Menu trigger={<IconButton sm aria-label="Open menu"><MenuIcon/></IconButton>}>
              {[{ href: "/", text: "Home" }, ...nav, { href: "/more/get-involved", text: "Volunteer" }].map(n => (
                <MenuItem key={n.href} tag={NextLink} href={n.href}>{n.text}</MenuItem>
              ))}
            </Menu>
          </div>
        </Row>
      </Row>
    </Row>
  )
}
