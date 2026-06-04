'use client'

import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Card, Container, Img, Text, Section, Button, SectionTitle, Stack, Col } from "@vaneui/ui"
import { Heart } from "react-feather";

const CTACard: React.FC = () => {
  return (
    <Section accent className="border-t">
      <Container xl>
        <Card accent xl noPadding overflowHidden relative justifyCenter shadow wFull className="min-h-96">
          <Img xl absolute objectCover hFull wFull overflowHidden tag={Image} src="/dog-card.png" alt="dog card" width={0} height={0}
               sizes="(max-width: 768px) 100vw, 300px"
               className="lg:aspect-5/2"/>
          <Col absolute hFull className="w-3/5 bg-gradient-to-r from-orange-400/80 to-red-600/0"></Col>
          <Stack xl filled className="p-14 max-lg:p-8 max-w-2xl z-10">
            <SectionTitle textLeft>
              Ready to power the rescue?
            </SectionTitle>
            <Text lg filled secondary medium>
              Help pay for vet exams, vaccinations, rehab, and basic supplies like food and blankets. We support
              different shelters and track each case until adoption.
            </Text>
            <Button xl filled accent tag={Link} href="/more/donate">Donate now <Heart/></Button>
          </Stack>
        </Card>
      </Container>
    </Section>
  );
};

export default CTACard;
