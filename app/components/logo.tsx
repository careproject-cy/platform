import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { platform_name } from "../data/consts";
import { Row, Title } from "@vaneui/ui"

const Logo: React.FC = () => {
  return (
    <Row xs vCentered href="/" tag={Link}>
      <Image src="/logo.svg" alt={platform_name} width={80} height={80} className="h-14" />
      <Title bold mdHide>
        {platform_name}
      </Title>
    </Row>
  );
};

export default Logo;
