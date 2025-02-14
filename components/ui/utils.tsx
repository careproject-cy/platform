import { twMerge } from "tailwind-merge";
import { BaseComponentProps } from "./props";

export const buildComponent = (props: BaseComponentProps, defaultTag: string, classes: string) => {
  const { className, children, tag, ...otherProps } = props;
  const Tag = tag || defaultTag;

  return (
    <Tag className={twMerge(classes, className)} {...otherProps}>
      {children}
    </Tag>
  );
}
