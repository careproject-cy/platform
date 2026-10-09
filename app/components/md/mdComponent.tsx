'use client'

import React from "react";
import { Md } from "@vaneui/md";
import { Img } from "@vaneui/ui";
import { getImageSrc } from "@/app/utils/images";
import Image from "next/image";

interface MdComponentProps {
  md: string;
}

export default function MdComponent({md}: MdComponentProps) {
  return (
    <div className="md-content">
      <Md
        content={md}
        config={{
          components: {
            MdImage: (props) => {
              const {src, alt, title, ...rest} = props as {
                src: string;
                alt: string;
                title: string;
              } & Record<string, unknown>;
              return (
                <Img tag={Image} wFull {...rest} title={title} src={getImageSrc(src)} alt={alt}
                     width={0}
                     height={0}
                     sizes="100vw"
                />
              );
            }
          }
        }}
      />
    </div>
  );
}
