// Stays a client component: @vaneui/md reads its renderer theme and parser through React context
// (createContext/useContext), which React Server Components do not provide.
'use client'

import React from "react";
import { Md, headingAnchors } from "@vaneui/md";
import { Img } from "@vaneui/ui";
import { getImageSrc } from "@/app/utils/images";
import Image from "next/image";

// Markdown carries no image size. Payload derivatives end in "-<w>x<h>.<ext>", so use that when present,
// else assume a 4:3 photo. The width/height attributes only reserve space (CSS keeps w-full, h-auto),
// so the image still renders at its real aspect ratio once loaded.
function imageSize(src: string): { width: number; height: number } {
  const m = src.match(/-(\d{2,5})x(\d{2,5})\.[a-z0-9]+(?:\?.*)?$/i)
  return m ? { width: Number(m[1]), height: Number(m[2]) } : { width: 1600, height: 1200 }
}

interface MdComponentProps {
  md: string;
}

export default function MdComponent({md}: MdComponentProps) {
  return (
    <div className="md-content">
      <Md
        content={md}
        transform={headingAnchors()}
        config={{
          components: {
            MdImage: (props) => {
              const {src, alt, title, ...rest} = props as {
                src: string;
                alt: string;
                title: string;
              } & Record<string, unknown>;
              const url = getImageSrc(src)
              const {width, height} = imageSize(url)
              return (
                <Img tag={Image} wFull {...rest} title={title} src={url} alt={alt}
                     width={width}
                     height={height}
                     sizes="(max-width: 768px) 100vw, 672px"
                />
              );
            }
          }
        }}
      />
    </div>
  );
}
