import React from 'react';
import { componentBuilder } from "./utils";
import { BaseComponentProps } from "./props";

export const Badge: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "span",
    "font-mono text-sm font-semibold px-3 py-1 bg-gray-200 rounded-full text-gray-600 uppercase w-fit")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      ignoreSize: "",
    })
    .build();
