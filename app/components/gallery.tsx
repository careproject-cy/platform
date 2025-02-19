'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Col, Row } from "@/components/ui/layout"

interface GalleryProps {
  images: string[]
  className?: string
}

const SquareImage = ({ src, alt, size, className, imageClassName, onClick }: { src: string, alt: string, size: number, className?: string, imageClassName?: string, onClick?: React.MouseEventHandler }) => {
  return (
    <Col className={twMerge(`relative overflow-hidden rounded-2xl`, className || "")}>
      <Image src={src} alt={`${alt} background`} width={size} height={size}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={twMerge(`aspect-square object-cover blur-xs`, imageClassName || "")}
      />
      <Image onClick={onClick} src={src} alt={alt} width={size} height={size}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={twMerge(`absolute object-contain h-full w-full`, imageClassName || "")}
      />
    </Col>
  );
}

const Gallery: React.FC<GalleryProps> = ({ images, className }) => {

  const [visible, setVisible] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.querySelectorAll('img')
      if (thumbnails[visible]) {
        const thumbnail = thumbnails[visible]
        const scrollContainer = thumbnailsRef.current
        const scrollLeft = thumbnail.offsetLeft - (scrollContainer.clientWidth - thumbnail.clientWidth) / 2
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [visible])

  const nextImage = () => {
    setVisible((prevVisible) => (prevVisible + 1) % images.length)
  }

  const prevImage = () => {
    setVisible((prevVisible) => (prevVisible - 1 + images.length) % images.length)
  }

  return (
    <div className={twMerge(`relative flex justify-center w-full rounded-2xl`, className || "")}>
      <Col className="gap-3 w-full">
        <Row vCentered relative className="overflow-hidden rounded-2xl">
          <button onClick={prevImage} className="cursor-pointer transition-all duration-100 bg-gray-100 opacity-75 rounded-full absolute left-2 z-20 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button onClick={nextImage} className="cursor-pointer transition-all duration-100 bg-gray-100 opacity-75 rounded-full absolute right-2 z-20 h-8 w-8 flex items-center justify-center hover:shadow-sm hover:opacity-100">
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
          <SquareImage src={images[visible]} alt={`image-${visible}`} size={1000} />
        </Row>
        <Row ref={thumbnailsRef} className="gap-3 overflow-x-auto pb-3">
          {images.map((src, idx) => (
            <Image key={idx}
              onClick={() => setVisible(idx)}
              src={src}
              alt={`Image ${idx}`}
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover aspect-square w-24 rounded-xl cursor-pointer border-2 ${idx === visible ? "border-amber-600" : "border-gray-200"}`}
            />
          ))}
        </Row>
      </Col>
    </div>
  )
}

export default Gallery