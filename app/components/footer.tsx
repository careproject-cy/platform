import { Container, Link as VLink, Section, Text, Col, Row, Title } from "@vaneui/ui"
import { platform_name } from "../data/consts"
import Link from 'next/link'
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <Section accent className="border-t bg-gray-800" tag={'footer'}>
      <Container xl itemsStart>
        <Row xl lgCol justifyBetween itemsStart className="w-full">
          <Col className="max-w-lg">
            <Row itemsCenter href="/" tag={Link}>
              <Image src="/logo.png" alt={platform_name} width={80} height={80} className="h-12 w-auto rounded-lg"/>
              <Title lg serif bold mdHide className="text-white">
                {platform_name}
              </Title>
            </Row>
            <Text lg className="text-white">
              <b>CARE (Cyprus Animals Rescue Effort) Project</b> is a <VLink link info tag={Link}
                                                                             href="https://uanafoundation.com/"
                                                                             target="_blank"
                                                                             className="text-blue-400">UANA
              Foundation</VLink> initiative that supports animal welfare in Cyprus. Run by devoted volunteers, it’s
              dedicated to helping stray dogs in Cyprus.
            </Text>
            <Text className="text-white opacity-50">&copy; 2025 {platform_name}. All rights reserved.</Text>
          </Col>
          <Row itemsStart mdCol>
            {
              [
                {
                  category: "About",
                  links: [
                    {href: "/", text: "Home"},
                    {href: "/dogs", text: "Dogs"},
                    {href: "/blog", text: "Blog"},
                    {href: "/more/about", text: "About"},
                  ]
                },
                {
                  category: "Support",
                  links: [
                    {href: "/more/get-involved", text: "Get Involved"},
                    {href: "/more/donate", text: "Donate"},
                    {href: "/more/adopt", text: "Adopt"},
                    {href: "/more/foster", text: "Foster"},
                  ]
                }
              ].map((item, index) => (
                  <Col lg key={index} className="w-64">
                    <Text xl semibold uppercase className="text-white opacity-50 pt-3">{item.category}</Text>
                    <Col xs>
                      {item.links.map((link, i) => (
                        <VLink noUnderline tag={Link} key={i} href={link.href} className="text-white">{link.text}</VLink>
                      ))}
                    </Col>
                  </Col>
                )
              )
            }
          </Row>
        </Row>
      </Container>
    </Section>
  )
}

