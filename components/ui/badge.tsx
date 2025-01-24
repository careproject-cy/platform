import React from 'react';
import { twMerge } from "tailwind-merge"

interface SectionProps extends React.HTMLProps<HTMLElement> {
  tag?: React.ElementType | string;
}

const Badge: React.FC<SectionProps> = (props) => {
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