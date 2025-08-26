'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Img } from "@vaneui/ui";

interface CarouselProps {
  images: string[]
  className?: string
}

const initialPositions = [
  { id: 0, css: 'left-0    -translate-x-1/4  z-0  scale-50  shadow-sm' },
  { id: 1, css: 'left-0     translate-x-0    z-10 scale-75  shadow-md' },
  { id: 2, css: 'left-1/2  -translate-x-1/2  z-20 scale-100 shadow-lg' },
  { id: 3, css: 'left-full -translate-x-full z-10 scale-75  shadow-md' },
  { id: 4, css: 'left-full -translate-x-3/4  z-0  scale-50  shadow-sm' },
]

const Carousel: React.FC<CarouselProps> = ({ images, className }) => {
  const [visible, setVisible] = useState(initialPositions)
  const [autoPlayKey, setAutoPlayKey] = useState(0)

  const nextImage = () => {
    setVisible((prev) => {
      const last = prev[prev.length - 1]
      return [last, ...prev.slice(0, -1)]
    })
    setAutoPlayKey((k) => k + 1)
  }

  const prevImage = () => {
    setVisible((prev) => {
      const first = prev[0]
      return [...prev.slice(1), first]
    })
    setAutoPlayKey((k) => k + 1)
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [autoPlayKey])

  return (
    <div className={twMerge(`transition-all relative flex items-center justify-center min-h-80 h-80  text-(--text-color-default)`, className ?? "")}>
      <button onClick={prevImage} className="cursor-pointer duration-100 bg-gray-100 opacity-50 rounded-full absolute left-2 z-30 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
        <ChevronLeft className="size-6" />
      </button>
      <button onClick={nextImage} className="cursor-pointer duration-100 bg-gray-100 opacity-50 rounded-full absolute right-2 z-30 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
        <ChevronRight className="size-6" />
      </button>
      <div className="w-full relative flex flex-row items-center min-h-80 h-80 justify-center">
        {visible.map((data, idx) => (
          <div key={idx} className={`top-1/2 -translate-y-1/2 absolute h-full aspect-square overflow-hidden rounded-xl opacity-100 transition-all duration-1000 ${data.css}`}>
            {
              idx > images.length - 1 ? null : (
                <Img
                  tag={Image}
                  loading='eager'
                  src={images[idx]}
                  alt={`Slide ${idx}`}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover aspect-square"
                />
              )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel