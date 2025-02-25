import React from 'react';
import Image from 'next/image'
import { Col } from "@/components/ui/layout";
import { SectionTitle, Text } from "@/components/ui/typography";

const NoResults: React.FC = () => {
  return (
    <Col centered className="opacity-50 flex-1">
      <Image src="/dog.svg" alt={"No results available"} width={300} height={200} />
      <SectionTitle>No results available</SectionTitle>
      <Text>Sorry, no results were found for your search.</Text>
    </Col>
  );
};

export default NoResults;