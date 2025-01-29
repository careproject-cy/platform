import React from 'react';
import { twMerge } from "tailwind-merge"
import BaseComponentProps from "./props";

const Badge: React.FC<BaseComponentProps> = (props) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || "span";
  return (
    <Tag
      className={twMerge(
        "font-mono text-sm font-semibold px-3 py-1 bg-gray-200 rounded-full text-gray-600 uppercase w-fit",
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}

export default Badge;