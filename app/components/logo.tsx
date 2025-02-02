import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { platform_name } from "../data/consts";
import { Row } from "@/components/ui/layout";

const Logo: React.FC = () => {
  return (
    <Row>
      <Image src="/logo.svg" alt={platform_name} width={80} height={80} />
      <Link href="/" className="text-2xl font-bold">
        {platform_name}
      </Link>
    </Row>
  );
};

export default Logo;