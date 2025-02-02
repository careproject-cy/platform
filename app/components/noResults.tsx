import React from 'react';
import Image from 'next/image'
import { Col } from "@/components/ui/layout";
import { SectionTitle, Text } from "@/components/ui/typography";

const NoResults: React.FC = () => {
  return (
    <Col className="items-center gap-2 opacity-50 flex-1 justify-center">
      <Image src="/dog.svg" alt={"No results available"} width={300} height={200} />
      <SectionTitle className="text-3xl">No results available</SectionTitle>
      <Text>Sorry, no results were found for your search.</Text>
    </Col>
  );
};

export default NoResults;