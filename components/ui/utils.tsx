import { twMerge } from "tailwind-merge";
import { BaseComponentProps, BreakpointProps, SizeProps } from "./props";

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

  let otherProps = { ...other };

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
        xs, sm, md, lg, xl,
        ...remainingProps
      } = otherProps;
      const sizeClass = getBooleanClass(
        { xs, sm, md, lg, xl },
        sizeMap,
        "md"
      );
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
        { xsCol , smCol, mdCol, lgCol, xlCol },
        breakpointMap,
        "mdCol"
      );
      extraClasses.push(breakpointClass);
      otherProps = remainingProps;
      return builder;
    },
    build() {
      return finalize();
    },
  };

  return builder;
}
