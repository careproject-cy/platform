'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  className: string;
}

const initialPositions = [
  { id: 0, css: 'left-0    -translate-x-1/2  z-0  w-56' },
  { id: 1, css: 'left-0     translate-x-0    z-0  w-64' },
  { id: 2, css: 'left-1/2  -translate-x-1/2  z-10 w-80 opacity-100' },
  { id: 3, css: 'left-full -translate-x-full z-0  w-64' },
  { id: 4, css: 'left-full -translate-x-1/2  z-0  w-56' },
];

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {

  const [visible, setVisible] = useState(initialPositions);

  const nextImage = () => {
    setVisible((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
  };

  const prevImage = () => {
    setVisible((prev) => {
      const first = prev[0];
      return [...prev.slice(1), first];
    });
  };

  return (
    <div className={twMerge(`overflow-hidden relative flex items-center justify-center h-80 border-1 rounded-2xl`, className)}>
      <button onClick={prevImage} className="transition-all duration-100 bg-gray-100 opacity-50 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center border-1 cursor-pointer hover:shadow-sm hover:opacity-100">
        <span className="material-symbols-rounded">chevron_left</span>
      </button>
      <button onClick={nextImage} className="transition-all duration-100 bg-gray-100 opacity-50 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center border-1 cursor-pointer hover:shadow-sm hover:opacity-100">
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
      <div className="w-full h-full relative flex flex-row items-center justify-center">
        {visible.map((data, idx) => (
          <div key={idx} className={`top-1/2 -translate-y-1/2 absolute opacity-30 transition-all duration-1000 ${data.css}`}>
            <Image
              src={images[idx] + '' + '+' + idx}
              alt={`Slide ${idx}`}
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;