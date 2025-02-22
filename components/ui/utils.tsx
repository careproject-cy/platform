import { twMerge } from "tailwind-merge";
import { BaseComponentProps, BreakpointProps, CenteredProps, CommonAppearanceProps, FontFamilyProps, FontStyleProps, FontWeightProps, GapProps, HideProps, PositionProps, ReverseProps, RowColProps, SizeProps, TextAppearanceProps, TextDecorationProps, TextTransformProps } from "./props";
import { fontFamilyClasses, fontStyleClasses, fontWeightClasses, textAppearanceClasses, textDecorationClasses, textTransformClasses } from "./commonValues";

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
  const otherProps: (typeof other) & Partial<ReverseProps & CenteredProps & GapProps & RowColProps> = { ...other };
  const propsToRemove: string[] = []

  const registerKeys = (keys: string[]) => {
    keys.forEach((key) => propsToRemove.push(key));
  };

  const withBooleanProps = <T extends Record<string, string>>(
    propMap: Record<keyof T, string>,
    fallbackKey?: keyof T
  ) => {
    // Build a subset of props from otherProps for the keys in the map.
    const propsSubset: Partial<Record<keyof T, boolean>> = {} as Partial<Record<keyof T, boolean>>;
    const keys = Object.keys(propMap) as (keyof T)[];
    keys.forEach((key) => {
      if (key in otherProps) {
        propsSubset[key] = otherProps[key as keyof typeof otherProps];
      }
    });
    // Compute the class.
    const newClass = getBooleanClass(propsSubset, propMap, fallbackKey);
    extraClasses.push(newClass);
    // Register all keys found in the map.
    registerKeys(keys as string[]);
    return builder;
  };

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
    withSizes: (sizeMap: Record<keyof SizeProps, string>) => withBooleanProps(sizeMap, "md"),
    withBreakpoints: (breakpointMap: Record<keyof BreakpointProps, string>) => withBooleanProps(breakpointMap),
    withReverse: (reverseMap: Record<keyof ReverseProps, string>) => withBooleanProps(reverseMap),
    withCentered: (centeredMap: Record<keyof CenteredProps, string>) => withBooleanProps(centeredMap),
    withHide: (hideMap: Record<keyof HideProps, string>) => withBooleanProps(hideMap),
    withPosition: (positionMap: Record<keyof PositionProps, string>) => withBooleanProps(positionMap),
    withFontWeight: (fontWeight: Record<keyof FontWeightProps, string>) => withBooleanProps(fontWeight),
    withFontStyle: (fontStyle: Record<keyof FontStyleProps, string>) => withBooleanProps(fontStyle),
    withFontFamily: (fontFamily: Record<keyof FontFamilyProps, string>) => withBooleanProps(fontFamily),
    withTextDecoration: (textDecoration: Record<keyof TextDecorationProps, string>) => withBooleanProps(textDecoration),
    withTextTransform: (textTransform: Record<keyof TextTransformProps, string>) => withBooleanProps(textTransform),
    withTextAppearance: (appearance: Record<keyof TextAppearanceProps & CommonAppearanceProps, string>) => withBooleanProps(appearance, "primary"),

    withGaps: (gapMap: Record<keyof GapProps, string>, sizeMap: Record<keyof SizeProps, string>) =>
      otherProps.noGap !== undefined && otherProps.noGap ? withBooleanProps(gapMap) : builder.withSizes(sizeMap),

    withTypography: () => builder
      .withFontFamily(fontFamilyClasses)
      .withFontStyle(fontStyleClasses)
      .withFontWeight(fontWeightClasses)
      .withTextDecoration(textDecorationClasses)
      .withTextTransform(textTransformClasses)
      .withTextAppearance(textAppearanceClasses),

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
