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

  const startInterval = React.useCallback(() => {
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
  }, [images.length]);

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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  return (
    <div className={twMerge(`relative flex items-center justify-center h-80`, className)}>
      <button
        onClick={prevImage}
        className="bg-gray-100/50 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center"
      >
        <span className="material-symbols-rounded">chevron_left</span>
      </button>
      {visible.map((idx, id) => (
        <div
          key={idx}
          className={
            id === 1
              ? 'absolute z-10 w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-2500'
              : id === 0
                ? 'absolute z-0 w-56 h-56 top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 opacity-80 scale-90 transition-all duration-2500'
                : 'absolute z-0 w-56 h-56 top-1/2 right-[25%] translate-x-1/2 -translate-y-1/2 opacity-80 scale-90 transition-all duration-2500'
          }
        >
          <Image
            src={images[idx]}
            alt={`Slide ${id}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
          />
        </div>
      ))}
      <button
        onClick={nextImage}
        className="bg-gray-100/50 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center"
      >
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  );
};

export default Carousel;