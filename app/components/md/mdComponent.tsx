'use client'

import React from "react";
import { Md } from "@vaneui/md";
import { Img, ThemeProvider } from "@vaneui/ui";
import { getImageSrc } from "@/app/utils/images";
import Image from "next/image";

interface MdComponentProps {
  md: string;
}

export default function MdComponent({md}: MdComponentProps) {
  return (
    <ThemeProvider extraClasses={{
      text: {
        md: "leading-8 w-full",
      },
      title: {
        xs: "pt-2",
        sm: "pt-3",
        md: "pt-4",
        lg: "pt-5",
        xl: "pt-6"
      },
    }}>
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
                <Img tag={Image} {...rest} title={title} src={getImageSrc(src)} alt={alt}
                     className="w-full rounded-lg"
                     width={0}
                     height={0}
                     sizes="100vw"
                />
              );
            }
          }
        }}
      />
    </ThemeProvider>
  );
}
