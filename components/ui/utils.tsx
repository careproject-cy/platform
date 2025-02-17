import { twMerge } from "tailwind-merge";
import { BaseComponentProps, BreakpointProps, HideProps, ReverseProps, SizeProps } from "./props";

function getBooleanClass<
  T extends Record<string, boolean | undefined>
>(
  props: T,
  classes?: Record<keyof T, string>,
  fallbackKey?: keyof T
): string {
  if (!classes) return "";
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && props[key]) {
      return classes[key] ?? "";
    }
  }
  return fallbackKey ? classes[fallbackKey] ?? "" : "";
}

export function componentBuilder(
  baseProps: BaseComponentProps,
  defaultTag: string,
  baseClasses: string
) {
  const extraClasses: string[] = [];
  const {
    className,
    children,
    tag,
    ...other
  } = baseProps;

  let otherProps: (typeof other) & ReverseProps = { ...other };

  function finalize(): React.ReactElement {
    const Tag = tag || defaultTag;
    const merged = twMerge(baseClasses, ...extraClasses, className);
    return (
      <Tag className={merged} {...otherProps}>
        {children}
      </Tag>
    );
  }

  const builder = {
    withSizes(sizeMap: Record<keyof SizeProps, string>) {
      const {
        xs, sm, md, lg, xl, ignoreSize,
        ...remainingProps
      } = otherProps;
      const sizeClass = getBooleanClass(
        { xs, sm, md, lg, xl },
        sizeMap,
        "md"
      );
      if (ignoreSize === undefined || !ignoreSize)
        extraClasses.push(sizeClass);
      otherProps = remainingProps;
      return builder;
    },
    withBreakpoints(breakpointMap: Record<keyof BreakpointProps, string>) {
      const {
        xsCol, smCol, mdCol, lgCol, xlCol,
        ...remainingProps
      } = otherProps;
      const breakpointClass = getBooleanClass(
        { xsCol, smCol, mdCol, lgCol, xlCol },
        breakpointMap
      );
      extraClasses.push(breakpointClass);
      otherProps = remainingProps;
      return builder;
    },
    withReverse(reverseMap: Record<keyof ReverseProps, string>) {
      const {
        reverse,
        ...remainingProps
      } = otherProps;
      const reverseClass = getBooleanClass({ reverse }, reverseMap);
      extraClasses.push(reverseClass);
      otherProps = remainingProps;
      return builder;
    },
    withHide(hideMap: Record<keyof HideProps, string>) {
      const {
        xsHide, smHide, mdHide, lgHide, xlHide,
        ...remainingProps
      } = otherProps;
      const hideClass = getBooleanClass(
        { xsHide, smHide, mdHide, lgHide, xlHide },
        hideMap
      );
      extraClasses.push(hideClass);
      otherProps = remainingProps;
      return builder;
    },
    build() {
      builder.withHide({
        xsHide: "max-xs:hidden",
        smHide: "max-sm:hidden",
        mdHide: "max-md:hidden",
        lgHide: "max-lg:hidden",
        xlHide: "max-xl:hidden"
      })
      return finalize();
    },
  };

  return builder;
}
