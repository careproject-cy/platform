'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Chip, Col, IconButton, Row } from "@vaneui/ui"
import { ChevronLeft, ChevronRight } from 'react-feather'

interface GalleryProps {
  images: string[]
  className?: string
  chipText?: string
  alt?: string
  /** Alt text per image (editor-written or templated); falls back to `${alt} – photo N`. */
  alts?: (string | undefined)[]
}

const SquareImage = ({ src, alt, size, className, imageClassName, onClick, preload = false, hidden = false }: { src: string, alt: string, size: number, className?: string, imageClassName?: string, onClick?: React.MouseEventHandler, preload?: boolean, hidden?: boolean }) => {
  return (
    <Col relative overflowHidden aria-hidden={hidden || undefined} className={twMerge(`rounded-2xl`, className || "")}>
      {/* Decorative blurred fill behind the contained photo: a tiny variant is enough under the blur. */}
      <Image src={src} alt="" aria-hidden width={size} height={size}
        sizes="96px"
        quality={30}
        loading='eager'
        className={twMerge(`aspect-square object-cover blur-xs`, imageClassName || "")}
      />
      <Image onClick={onClick} src={src} alt={hidden ? "" : alt} width={size} height={size}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading='eager'
        preload={preload}
        fetchPriority={preload ? "high" : hidden ? "low" : undefined}
        className={twMerge(`absolute object-contain h-full w-full`, imageClassName || "")}
      />
    </Col>
  );
}

const Gallery: React.FC<GalleryProps> = ({ images, className, chipText, alt, alts }) => {
  const baseAlt = alt || "Photo"
  const altFor = (idx: number) => alts?.[idx] || `${baseAlt} – photo ${idx + 1}`

  const [visible, setVisible] = useState(0)
  // Fetched photos stay mounted so switching back never refetches.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]))
  const mount = (...indexes: number[]) => setMounted((prev) => {
    if (indexes.every((i) => prev.has(i))) return prev
    return new Set([...prev, ...indexes])
  })
  // Prefetch neighbours after hydration so they never compete with the first photo.
  useEffect(() => {
    const n = images.length
    mount(visible, (visible + 1) % n, (visible - 1 + n) % n)
  }, [visible, images.length])

  const thumbnailsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.querySelectorAll('button')
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
    <Row relative justifyCenter wFull className={twMerge(`rounded-2xl`, className || "")}>
      <Col sm>
        <Row itemsCenter relative overflowHidden className="rounded-2xl">
          <IconButton md secondary absolute onClick={prevImage} aria-label="Previous photo" className="left-2 z-20 bg-white/80 backdrop-blur">
            <ChevronLeft/>
          </IconButton>
          <IconButton md secondary absolute onClick={nextImage} aria-label="Next photo" className="right-2 z-20 bg-white/80 backdrop-blur">
            <ChevronRight/>
          </IconButton>
          <Col relative overflowHidden>
            {/* Photo 0 stays in flow to size the frame and is the only one preloaded (LCP). */}
            {images.map((src, idx) => mounted.has(idx) && (
              <SquareImage key={idx} src={src} alt={altFor(idx)} size={1000} preload={idx === 0}
                hidden={idx !== visible}
                className={twMerge(
                  "transition-opacity duration-200",
                  idx !== 0 && "absolute inset-0",
                  idx === visible ? "z-10 opacity-100" : "opacity-0 pointer-events-none",
                )} />
            ))}
            {chipText &&
              <Chip lg fontSemibold absolute className="right-2 bottom-2 z-20 opacity-75">{chipText}</Chip>
            }
          </Col>
        </Row>
        <Row sm ref={thumbnailsRef} overflowXHidden className="max-md:overflow-x-scroll">
          {images.map((src, idx) => (
            <button key={idx} type="button" onClick={() => setVisible(idx)} aria-pressed={idx === visible}
                    onPointerEnter={() => mount(idx)} onFocus={() => mount(idx)}
                    className="shrink-0 rounded-xl cursor-pointer">
              <Image
                loading='lazy'
                src={src}
                alt={altFor(idx)}
                width={96}
                height={96}
                sizes="96px"
                className={`object-cover aspect-square w-24 rounded-xl border-3 ${idx === visible ? "border-[var(--accent)]" : "border-transparent opacity-70 hover:opacity-100"}`}
              />
            </button>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Gallery
