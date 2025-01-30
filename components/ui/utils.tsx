import { twMerge } from "tailwind-merge";
import BaseComponentProps from "./props";

export const buildComponent = (props: BaseComponentProps, tag: string, classes: string) => {
  const { className, children, ...otherProps } = props;
  const Tag = props.tag || tag;
  return (
    <Tag className={twMerge(classes, className)} {...otherProps}>
      {children}
    </Tag>
  );
}
