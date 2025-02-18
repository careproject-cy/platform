import { twMerge } from "tailwind-merge";
import { BaseComponentProps, BreakpointProps, CenteredProps, HideProps, PositionProps, ReverseProps, SizeProps } from "./props";

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
  const { className, children, tag, ...other } = baseProps;

  const otherProps: (typeof other) & Partial<ReverseProps & CenteredProps> = { ...other };

  const propsToRemove: string[] = []

  function finalize(): React.ReactElement {
    const Tag = tag || defaultTag;
    const merged = twMerge(baseClasses, ...extraClasses, className);

    propsToRemove.forEach(key => delete otherProps[key as keyof typeof otherProps])

    return (
      <Tag className={merged} {...otherProps}>
        {children}
      </Tag>
    );
  }

  const builder = {
    withSizes(sizeMap: Record<keyof SizeProps, string>) {
      const { xs, sm, md, lg, xl, ignoreSize } = otherProps;
      const sizeClass = getBooleanClass({ xs, sm, md, lg, xl }, sizeMap, "md");
      if (ignoreSize === undefined || !ignoreSize)
        extraClasses.push(sizeClass);
      Object.keys(sizeMap).forEach((key) => { propsToRemove.push(key) })
      propsToRemove.push("ignoreSize")
      return builder;
    },
    withBreakpoints(breakpointMap: Record<keyof BreakpointProps, string>) {
      const { xsCol, smCol, mdCol, lgCol, xlCol } = otherProps;
      const breakpointClass = getBooleanClass({ xsCol, smCol, mdCol, lgCol, xlCol }, breakpointMap);
      extraClasses.push(breakpointClass);
      Object.keys(breakpointMap).forEach((key) => { propsToRemove.push(key) })
      return builder;
    },
    withReverse(reverseMap: Record<keyof ReverseProps, string>) {
      const { reverse } = otherProps;
      const reverseClass = getBooleanClass({ reverse }, reverseMap);
      extraClasses.push(reverseClass);
      Object.keys(reverseMap).forEach((key) => { propsToRemove.push(key) })
      return builder;
    },
    withCentered(centeredMap: Record<keyof CenteredProps, string>) {
      const { centered, vCentered, hCentered } = otherProps;
      const centeredClass = getBooleanClass({ centered, vCentered, hCentered }, centeredMap);
      extraClasses.push(centeredClass);
      Object.keys(centeredMap).forEach((key) => { propsToRemove.push(key) })
      return builder;
    },
    withHide(hideMap: Record<keyof HideProps, string>) {
      const { xsHide, smHide, mdHide, lgHide, xlHide } = otherProps;
      const hideClass = getBooleanClass({ xsHide, smHide, mdHide, lgHide, xlHide }, hideMap);
      extraClasses.push(hideClass);
      Object.keys(hideMap).forEach((key) => { propsToRemove.push(key) })
      return builder;
    },
    withPosition(positionMap: Record<keyof PositionProps, string>) {
      const { relative, absolute, fixed, sticky, static: staticProp } = otherProps;
      const positionClass = getBooleanClass({ relative, absolute, fixed, sticky, static: staticProp }, positionMap);
      extraClasses.push(positionClass);
      Object.keys(positionMap).forEach((key) => { propsToRemove.push(key) })
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
      builder.withPosition({
        relative: "relative",
        absolute: "absolute",
        fixed: "fixed",
        sticky: "sticky",
        static: "static"
      })
      return finalize();
    },
  };

  return builder;
}
