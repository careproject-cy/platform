import React from 'react';
import { componentBuilder } from "./utils";
import { BaseComponentProps } from "./props";

export const Button: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "button",
    "cursor-pointer flex justify-center items-center border-1 rounded-xl px-4 py-2 text-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300")
    .build();
