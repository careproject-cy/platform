import React from 'react';
import { twMerge } from "tailwind-merge"

interface SectionProps extends React.HTMLProps<HTMLElement> {
  tag?: React.ElementType | string;
}

const Section: React.FC<SectionProps> = (props) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || "section";
  return (
    <Tag
      className={twMerge(
        "w-full flex flex-col items-center",
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}

export default Section;