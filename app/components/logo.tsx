import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { platform_name } from "../data/consts";
import { Row, Title } from "@vaneui/ui"

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Row xs itemsCenter>
        <Image src="/logo.svg" alt={platform_name} width={80} height={80} className="h-14 w-auto" />
        <Title lg serif bold mobileHide>
          {platform_name}
        </Title>
      </Row>
    </Link>
  );
};

export default Logo;
