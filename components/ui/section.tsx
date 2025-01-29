import React from 'react';
import { twMerge } from "tailwind-merge"
import BaseComponentProps from "./props";

const Section: React.FC<BaseComponentProps> = (props) => {
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