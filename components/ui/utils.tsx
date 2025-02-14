import { twMerge } from "tailwind-merge";
import { BaseComponentProps, SizeProps } from "./props";

export const buildComponent = (props: BaseComponentProps, defaultTag: string, classes: string, sizeClasses?: Record<keyof (SizeProps), string>) => {
  const { className, children, tag, xs, sm, md, lg, xl, ...otherProps } = props;
  const Tag = tag || defaultTag;
  const sizeClass = !sizeClasses ? ""
    : xs ? sizeClasses?.xs
      : sm ? sizeClasses?.sm
        : md ? sizeClasses?.md
          : lg ? sizeClasses?.lg
            : xl ? sizeClasses?.xl
              : sizeClasses?.md; // default to md

  return (
    <Tag className={twMerge(classes, sizeClass, className)} {...otherProps}>
      {children}
    </Tag>
  );
}
