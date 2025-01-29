import React from 'react';
import { twMerge } from "tailwind-merge"
import BaseComponentProps from "./props";

const PageTitle: React.FC<BaseComponentProps> = (props) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || "h1";
  return (
    <Tag
      className={twMerge(
        "text-5xl font-semibold",
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}

export default PageTitle;