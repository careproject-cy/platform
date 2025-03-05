'use client'

import Link from 'next/link'
import Logo from "./logo"
import { Row } from "@vaneui/ui"
import { Button } from "@vaneui/ui"
import { useState } from "react"

export default function Layout() {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Row vCentered justifyBetween relative className="border-b px-4 py-2 w-full bg-white" tag={'header'} mdCol>
      <Row vCentered justifyBetween className="max-md:w-full">
        <Logo />
        <Button className="hidden max-md:flex" onClick={() => setIsVisible(!isVisible)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3.75 5.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Zm0 6a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"></path>
          </svg>
        </Button>
      </Row>
      <Row sm vCentered tag={"nav"} mdCol className={`max-md:w-full max-md:flex ${isVisible ? 'max-md:flex' : 'max-md:hidden'}`}>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/" >Home</Link>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/dogs">Dogs</Link>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/blog">Blog</Link>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/more/adopt">Adopt</Link>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/more/foster">Foster</Link>
        <Link className="hover:bg-gray-100 px-3 rounded-md py-2 max-md:w-full max-md:text-center" href="/more/about">About</Link>
        <Button tag={Link} href="/more/get-involved" className="bg-gradient-to-br from-orange-400 to-red-600 border-orange-400 text-white hover:opacity-90 w-full">Get Involved</Button>
      </Row>
    </Row>
  )
}
