'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  className: string;
}

function getVisibleIndices(
  current: { id: number; css: string }[],
  imagesCount: number,
  direction: 'prev' | 'next'
) {
  const currentIndex = direction === 'prev' ? current[0].id : current[2].id;
  const next = [
    (currentIndex - 1 + imagesCount) % imagesCount,
    currentIndex,
    (currentIndex + 1) % imagesCount,
  ];
  return [
    { id: next[0], css: '' },
    { id: next[1], css: '' },
    { id: next[2], css: '' },
  ];
}

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {
  const [visible, setVisible] = useState([
    //{ id: 0, css: 'left-[0%]   -translate-x-1/2  z-0  w-56 h-56' },
    { id: 1, css: 'left-[0%]    translate-x-0    z-0  w-64 h-64' },
    { id: 2, css: 'left-[50%]  -translate-x-1/2  z-10 w-72 h-72 opacity-100' },
    { id: 3, css: 'left-[100%] -translate-x-full z-0  w-64 h-64' },
    //{ id: 4, css: 'left-[100%] -translate-x-1/2  z-0  w-56 h-56' },
  ]);

  const prevImage = () => {
    setVisible((prev) => getVisibleIndices(prev, images.length, 'prev'));
  };

  const nextImage = () => {
    setVisible([
      //{ id: 0, css: 'left-[0%]   -translate-x-1/2  z-0  w-56 h-56' },
      { id: 1, css: 'left-[0%]    translate-x-0    z-0  w-64 h-64' },
      { id: 2, css: 'left-[50%]  -translate-x-1/2  z-10 w-72 h-72 opacity-100' },
      { id: 3, css: 'left-[100%] -translate-x-full z-0  w-64 h-64' },
      //{ id: 4, css: 'left-[100%] -translate-x-1/2  z-0  w-56 h-56' },
    ]);
    //setVisible((prev) => getVisibleIndices(prev, images.length, 'next'));
  };

  return (
    <div className={twMerge(`relative flex items-center justify-center h-80 border-1`, className)}>
      <button onClick={prevImage} className="bg-gray-100/50 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center">
        <span className="material-symbols-rounded">chevron_left</span>
      </button>
      <div className="w-full h-full relative flex flex-row items-center justify-center bg-green-500">
        {visible.map((data, id) => (
          <div key={data.id} className={`top-1/2 -translate-y-1/2 absolute opacity-50 transition-all duration-2500 ${data.css}`}>
            <Image
              src={images[data.id] + ' ' + id}
              alt={`Slide ${id}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      <button onClick={nextImage} className="bg-gray-100/50 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center"      >
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  );
};

export default Carousel;