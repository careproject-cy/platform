"use client"

import Image from "next/image"
import NextLink from "next/link"
import { Col, Container, IconButton, Link, Row, Section, Text } from "@vaneui/ui"
import { Facebook, GitHub, Instagram, Linkedin, Send } from "react-feather"

const columns = [
  { title: "Adopt", links: [["Dogs for adoption", "/dogs"], ["How adoption works", "/more/adopt"], ["Adopted dogs", "/adopted/1"]] },
  { title: "Help", links: [["Donate", "/more/donate"], ["Foster", "/more/foster"], ["Volunteer", "/more/get-involved"]] },
  { title: "About", links: [["Our story", "/more/about"], ["Stories", "/blog"], ["UANA Foundation", "https://uanafoundation.com/"]] },
]

const social = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/uana.cy/" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/careproject.cy" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/uana-foundation/" },
  { name: "Telegram", icon: Send, href: "https://t.me/care_project" },
  { name: "GitHub", icon: GitHub, href: "https://github.com/careproject-cy/" },
]

export default function Footer() {
  return (
    <Section tag="footer" borderT noPadding>
      <Container lg itemsStretch className="px-4 md:px-6">
        <Row xl mobileStack itemsStart className="pt-16 pb-10 max-mobile:items-stretch">
          <Col className="max-w-xs flex-[1.4]">
            <Row sm>
              <Image src="/logo.svg" alt="" width={45} height={32} className="h-8 w-auto rounded-md"/>
              <Text fontSemibold trackingTight>CARE Project</Text>
            </Row>
            <Text sm secondary>
              Cyprus Animals Rescue Effort, a volunteer project of the UANA Foundation. We rescue, treat, and rehome stray dogs across Cyprus.
            </Text>
            <Row xs flexWrap>
              {social.map(({ name, icon: Icon, href }) => (
                <IconButton key={name} md secondary tag="a" href={href} target="_blank" rel="noopener noreferrer"
                            aria-label={`${name} (opens in a new tab)`} title={name}>
                  <Icon aria-hidden="true"/>
                </IconButton>
              ))}
            </Row>
          </Col>
          {columns.map(c => (
            <Col key={c.title} className="flex-1">
              <Text sm fontMedium>{c.title}</Text>
              <Col sm tag="ul">
                {c.links.map(([text, href]) => (
                  <li key={href}>
                    {href.startsWith("http")
                      ? <Link sm secondary noUnderline href={href} external>{text}</Link>
                      : <Link sm secondary noUnderline tag={NextLink} href={href}>{text}</Link>}
                  </li>
                ))}
              </Col>
            </Col>
          ))}
        </Row>
        <Row justifyBetween flexWrap borderT className="py-5">
          <Text xs secondary>© {new Date().getFullYear()} CARE Project · UANA Foundation, Cyprus</Text>
          <Text xs secondary>100% volunteer-run. Every euro goes to the animals.</Text>
        </Row>
      </Container>
    </Section>
  )
}
