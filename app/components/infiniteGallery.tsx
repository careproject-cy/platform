"use client"

import { Img } from "@vaneui/ui";

interface GalleryImage {
  src: string;
  alt: string;
}

interface InfiniteGalleryProps {
  images: GalleryImage[];
  className?: string;
  durationMs?: number;
}

export default function InfiniteGallery({ 
  images, 
  className = "", 
  durationMs = 60000 
}: InfiniteGalleryProps) {
  if (!images?.length) return null;

  const doubled = [...images, ...images];

  return (
    <div
      className={[
        "max-w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]",
        className,
      ].join(" ")}
    >
      <div
        className="flex gap-4 w-max will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none"
        // Use inline animation so you don't need a custom Tailwind utility
        style={{ animation: `scroll-x ${durationMs}ms linear infinite` }}
      >
        {doubled.map((img, i) => (
          <Img lg
            key={`${img.src}-${i}`}
            src={img.src}
            alt={i < images.length ? img.alt : ""}      // hide dupes from SRs
            aria-hidden={i >= images.length}
            className="h-80 w-auto object-cover shrink-0 select-none pointer-events-none"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll-x {
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}