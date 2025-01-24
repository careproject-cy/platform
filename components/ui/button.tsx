import React from 'react';
import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  tag?: React.ElementType | string;
}

export const Button: React.FC<ButtonProps> = (props) => {
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
