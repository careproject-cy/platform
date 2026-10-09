import React from 'react';
import Image from 'next/image'
import { Col, Text, Title } from "@vaneui/ui";

const NoResults: React.FC = () => {
  return (
    <Col itemsCenter className="py-16 opacity-60">
      <Image src="/dog.svg" alt="" width={240} height={160} />
      <Title xl>No dogs match these filters</Title>
      <Text secondary>Try another age or breed.</Text>
    </Col>
  );
};

export default NoResults;
