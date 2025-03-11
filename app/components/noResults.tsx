import React from 'react';
import Image from 'next/image'
import { Col } from "@vaneui/ui";
import { SectionTitle, Text } from "@vaneui/ui";

const NoResults: React.FC = () => {
  return (
    <Col itemsCenter className="opacity-50 flex-1">
      <Image src="/dog.svg" alt={"No results available"} width={300} height={200} />
      <SectionTitle>No results available</SectionTitle>
      <Text>Sorry, no results were found for your search.</Text>
    </Col>
  );
};

export default NoResults;