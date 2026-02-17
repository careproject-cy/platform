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
  maxImages?: number;
}

export default function InfiniteGallery({
  images,
  className = "",
  durationMs = 60000,
  maxImages = 15,
}: InfiniteGalleryProps) {
  if (!images?.length) return null;

  const limited = images.slice(0, maxImages);
  const doubled = [...limited, ...limited];

  return (
    <div
      className={[
        "max-w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,white_12%,white_88%,transparent)]",
        className,
      ].join(" ")}
    >
      <div
        className="flex gap-4 w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
        // Use inline animation so you don't need a custom Tailwind utility
        style={{ animation: `scroll-x ${durationMs}ms linear infinite` }}
      >
        {doubled.map((img, i) => (
          <Img lg
            key={`${img.src}-${i}`}
            src={img.src}
            alt={i < limited.length ? img.alt : ""}      // hide dupes from SRs
            aria-hidden={i >= limited.length}
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