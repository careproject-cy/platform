import React from 'react';
import { twMerge } from "tailwind-merge"

interface ContainerProps extends React.HTMLProps<HTMLElement> {
  tag?: React.ElementType | string;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || "div";
  return (
    <Tag
      className={twMerge(
        "w-full mx-auto flex items-center max-w-7xl p-3",
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}

export default Container;