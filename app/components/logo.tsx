import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { platform_name } from "../data/consts";
import { Row } from "@/components/ui/layout";
import { TextTitle } from "@/components/ui/typography";

const Logo: React.FC = () => {
  return (
    <Row xs vCentered>
      <Image src="/logo.svg" alt={platform_name} width={80} height={80} className="h-14"/>
      <TextTitle bold tag={Link} href="/" mdHide>
        {platform_name}
      </TextTitle>
    </Row>
  );
};

export default Logo;
