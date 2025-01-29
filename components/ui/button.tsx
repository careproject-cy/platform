import React from 'react';
import { twMerge } from "tailwind-merge"
import BaseComponentProps from "./props";

export const Button: React.FC<BaseComponentProps> = (props) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || "button";
  return (
    <Tag
      className={twMerge(
        "cursor-pointer flex justify-center items-center border-1 rounded-xl px-4 py-2 text-xl font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300",
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}
