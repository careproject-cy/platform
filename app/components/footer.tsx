'use client'

import { Container, Link as VLink, Section, Text, Col, Row, Title, Card } from "@vaneui/ui"
import { platform_name } from "../data/consts"
import Link from 'next/link'
import Image from "next/image";
import React from "react";
import { Facebook, GitHub, Instagram, Linkedin, Send } from "react-feather";

export default function Footer() {
  return (
    <Section primary filled className="border-t" tag={'footer'}>
      <Container xl itemsStart>
        <Row xl tabletCol justifyBetween itemsStart className="w-full">
          <Col lg className="max-w-lg">
            <Link href="/">
              <Row itemsCenter>
                <Image src="/logo.png" alt={platform_name} width={80} height={80} className="h-12 w-auto rounded-lg"/>
                <Title lg serif bold mobileHide className="text-white">
                  {platform_name}
                </Title>
              </Row>
            </Link>
            <Row>
              {
                [
                  {icon: Instagram, link: "https://www.instagram.com/uana.cy/"},
                  {icon: Facebook, link: "https://www.facebook.com/careproject.cy"},
                  {icon: Linkedin, link: "https://www.linkedin.com/company/uana-foundation/"},
                  {icon: Send, link: "https://t.me/care_project"},
                  {icon: GitHub, link: "https://github.com/careproject-cy/"},
                ].map((item, i) => (
                    <Link href={item.link} key={i}>
                      <Card xs primary noBorder filled className="w-fit opacity-75 hover:opacity-100 duration-300 bg-bg-filled-hover-primary">
                        <item.icon className="text-text-warning size-7"/>
                      </Card>
                    </Link>
                  )
                )
              }
            </Row>
            <Text lg className="text-white">
              <b>CARE (Cyprus Animals Rescue Effort) Project</b> is a{' '}
              <VLink lg tag={Link} href="https://uanafoundation.com/" target="_blank" className="text-blue-400">UANA Foundation</VLink>
              {' '}initiative that supports animal welfare in Cyprus. Run by devoted volunteers, it&apos;s dedicated to helping stray dogs in Cyprus.
            </Text>
            <Text className="text-white opacity-50">&copy; 2026 {platform_name}. All rights reserved.</Text>
          </Col>
          <Row itemsStart mobileCol>
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
                  category: "Support us",
                  links: [
                    {href: "/more/get-involved", text: "Get Involved"},
                    {href: "/more/adopt", text: "Adopt us"},
                    {href: "/more/donate", text: "Donate"},
                    {href: "/more/foster", text: "Foster"},
                  ]
                }
              ].map((item, index) => (
                  <Col lg key={index} className="w-64">
                    <Text xl semibold uppercase className="text-white opacity-50 pt-3">{item.category}</Text>
                    <Col sm>
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
