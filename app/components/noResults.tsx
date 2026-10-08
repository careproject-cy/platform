import React from 'react';
import Image from 'next/image'

const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center py-16 opacity-60">
      <Image src="/dog.svg" alt="" width={240} height={160} />
      <p className="mt-6 font-serif text-4xl">No dogs match these filters</p>
      <p className="mt-2 text-[var(--muted)]">Try another age or breed.</p>
    </div>
  );
};

export default NoResults;
