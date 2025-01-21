'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  className: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const leftIndex = (currentIndex - 1 + images.length) % images.length;
  const rightIndex = (currentIndex + 1) % images.length;
  const visibleIndices = [leftIndex, currentIndex, rightIndex];

  return (
    <div className={twMerge(`flex flex-row items-center justify-center h-80 overflow-hidden`, className)}>
      <div className="flex flex-row items-center justify-center relative">
        <button onClick={prevImage} className="bg-gray-100/50 rounded-full flex items-center justify-center h-8 w-8 cursor-pointer absolute left-20 z-20">
          <span className="material-symbols-rounded">
            chevron_left
          </span>
        </button>
        {visibleIndices.map((idx) => {
          const c = idx - currentIndex === 0
            ? 'w-80 z-1 min-h-80 rounded-xl'
            : 'w-20 z-0 min-h-72 opacity-50';
          return (
            <Image
              src={images[idx]}
              key={idx}
              alt={`Slide ${currentIndex}`}
              width={288}
              height={288}
              className={`${c} relative object-cover h-auto transition-height duration-300 ease-in`}
            />
          );
        })}
        <button onClick={nextImage} className="bg-gray-100/50 rounded-full flex items-center justify-center h-8 w-8 cursor-pointer absolute right-20 z-20">
          <span className="material-symbols-rounded">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;