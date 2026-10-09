"use client"

import React from 'react';
import NextLink from 'next/link'
import Image from 'next/image'
import { Button, Card, Col, Container, Row, Section, SectionTitle, Text } from "@vaneui/ui"
import { Heart } from "react-feather";

const CTACard: React.FC = () => {
  return (
    <Section lg>
      <Container lg itemsStretch>
        <Card xl data-theme="dark" noPadding noBorder noGap overflowHidden relative row mobileStack className="md:min-h-[440px]">
          <Col relative noShrink className="h-64 md:absolute md:inset-0 md:h-auto">
            <Image src="/dog-card.png" alt="A rescued dog in a recovery cone, waiting in a shelter kennel" fill
                   sizes="(max-width: 768px) 100vw, 1152px" className="object-cover object-[72%_30%]"/>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--bg)_0%,transparent_45%)] md:bg-[linear-gradient(90deg,color-mix(in_oklab,var(--bg)_92%,transparent)_0%,color-mix(in_oklab,var(--bg)_75%,transparent)_38%,transparent_70%)]"/>
          </Col>
          <Col lg relative className="z-10 md:self-center px-8 pb-8 pt-2 md:p-14 max-w-xl">
            <SectionTitle lg>Ready to power the rescue?</SectionTitle>
            <Text lg secondary>
              Help pay for vet exams, vaccinations, rehab, and basic supplies like food and blankets. We support
              different shelters and track each case until adoption.
            </Text>
            <Row sm flexWrap>
              <Button filled accent tag={NextLink} href="/more/donate">Donate now <Heart/></Button>
              <Button tag={NextLink} href="/more/get-involved">Other ways to help</Button>
            </Row>
            <Text sm secondary>€5 buys a deworming tablet. Run entirely by volunteers.</Text>
          </Col>
        </Card>
      </Container>
    </Section>
  );
};

export default CTACard;
