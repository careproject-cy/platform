'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Col, Row } from "@/components/ui/layout"

interface GalleryProps {
  images: string[]
  className?: string
}

const Gallery: React.FC<GalleryProps> = ({ images, className }) => {

  const [visible, setVisible] = useState(0)

  const nextImage = () => {
    setVisible((prevVisible) => (prevVisible + 1) % images.length)
  }

  const prevImage = () => {
    setVisible((prevVisible) => (prevVisible - 1 + images.length) % images.length)
  }

  return (
    <div className={twMerge(`relative flex items-center justify-center w-full rounded-2xl`, className || "")}>
      <Col className="gap-3">
        <Row>
          <button onClick={prevImage} className="cursor-pointer transition-all duration-100 bg-gray-100 opacity-50 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button onClick={nextImage} className="cursor-pointer transition-all duration-100 bg-gray-100 opacity-50 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
          <Image
            src={images[visible]}
            alt={`Image main`}
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover aspect-square rounded-2xl"
          />
        </Row>
        <Row className="gap-3 overflow-x-scroll pb-3">
          {images.map((src, idx) => (
            <Image key={idx}
              onClick={() => setVisible(idx)}
              src={src}
              alt={`Image ${idx}`}
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-fit aspect-square w-24 rounded-xl cursor-pointer border-2 ${idx === visible ? "border-amber-600" : "border-transparent"}`}
            />
          ))}
        </Row>
      </Col>
    </div>
  )
}

export default Gallery