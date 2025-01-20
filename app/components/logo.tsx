import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logo.svg" alt={'Pawsome Shelter'} width={80} height={80} />
      <Link href="/" className="text-2xl font-bold">
        Pawsome Shelter
      </Link>
    </div>
  );
};

export default Logo;