'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  className: string;
}

const initialPositions = [
  { id: 0, css: 'left-[0%]   -translate-x-[50%]  z-0  w-56 h-56' },
  { id: 1, css: 'left-[0%]    translate-x-[0%]   z-0  w-64 h-64' },
  { id: 2, css: 'left-[50%]  -translate-x-[50%]  z-10 w-72 h-72 opacity-70' },
  { id: 3, css: 'left-[100%] -translate-x-[100%] z-0  w-64 h-64' },
  { id: 4, css: 'left-[100%] -translate-x-[50%]  z-0  w-56 h-56' },
];

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {
  const [visible, setVisible] = useState(initialPositions);

  const prevImage = () => {
    setVisible((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)];
    });
  };

  const nextImage = () => {
    setVisible((prev) => {
      const first = prev[0];
      return [...prev.slice(1), first];
    });
  };

  return (
    <div className={twMerge(`relative flex items-center justify-center h-80 border-1`, className)}>
      <button onClick={prevImage} className="bg-gray-100/50 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center border-1">
        <span className="material-symbols-rounded">chevron_left</span>
      </button>
      <div className="w-full h-full relative flex flex-row items-center justify-center">
        {visible.map((data, idx) => (
          <div key={idx} className={`top-1/2 -translate-y-1/2 absolute opacity-30 transition-all duration-700 ${data.css}`}>
            <Image
              src={images[idx] + '' + '+' + idx}
              alt={`Slide ${idx}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      <button onClick={nextImage} className="bg-gray-100/50 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center border-1">
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  );
};

export default Carousel;