'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  images: string[];
  className: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {
  const [visible, setVisible] = useState([0, 1, 2]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setVisible((prev) => {
        const currentIndex = prev[2];
        return [
          (currentIndex - 1 + images.length) % images.length,
          currentIndex,
          (currentIndex + 1) % images.length,
        ];
      });
    }, 5000);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  const prevImage = () => {
    setVisible((prev) => {
      const currentIndex = prev[0];
      return [
        (currentIndex - 1 + images.length) % images.length,
        currentIndex,
        (currentIndex + 1) % images.length,
      ];
    });
    resetInterval();
  };

  const nextImage = () => {
    setVisible((prev) => {
      const currentIndex = prev[2];
      return [
        (currentIndex - 1 + images.length) % images.length,
        currentIndex,
        (currentIndex + 1) % images.length,
      ];
    });
    resetInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current);
    };
  }, [images.length]);

  return (
    <div className={twMerge(`flex flex-row items-center justify-center h-80 overflow-hidden`, className)}>
      <div className="flex flex-row items-center justify-center relative">
        <button
          onClick={prevImage}
          className="bg-gray-100/50 rounded-full flex items-center justify-center h-8 w-8 cursor-pointer absolute left-2 z-20"
        >
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
        {visible.map((idx, id) => {
          const classValue = id === 1 ? 'w-80 z-1 min-h-80 rounded-xl' : 'w-20 z-0 min-h-72 opacity-50';
          return (
            <Image
              src={images[idx]}
              key={idx}
              alt={`Slide ${id}`}
              width={288}
              height={288}
              className={`${classValue} relative object-cover h-auto transition-all duration-500 ease-in-out`}
            />
          );
        })}
        <button
          onClick={nextImage}
          className="bg-gray-100/50 rounded-full flex items-center justify-center h-8 w-8 cursor-pointer absolute right-2 z-20"
        >
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;