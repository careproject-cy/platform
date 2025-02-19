
export interface SizeProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  ignoreSize?: boolean;
}

export interface FontWeightProps {
  thin?: boolean;
  extralight?: boolean;
  light?: boolean;
  normal?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  extrabold?: boolean;
  black?: boolean;
}

export interface FontStyleProps {
  italic?: boolean;
  notItalic?: boolean;
}

export interface TextDecorationProps {
  underline?: boolean;
  lineThrough?: boolean;
  noUnderline?: boolean;
  overline?: boolean;
}

export interface TextTransformProps {
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  normalCase?: boolean;
}

export type FontProps = FontWeightProps & FontStyleProps & TextDecorationProps & TextTransformProps;

export interface BreakpointProps {
  xsCol?: boolean;
  smCol?: boolean;
  mdCol?: boolean;
  lgCol?: boolean;
  xlCol?: boolean;
}

export interface HideProps {
  xsHide?: boolean;
  smHide?: boolean;
  mdHide?: boolean;
  lgHide?: boolean;
  xlHide?: boolean;
}

export interface PositionProps {
  relative?: boolean;
  absolute?: boolean;
  fixed?: boolean;
  sticky?: boolean;
  static?: boolean;
}

export interface TagProps {
  tag?: React.ElementType | string;
}

export interface ReverseProps {
  reverse?: boolean;
}

export interface CenteredProps {
  centered?: boolean;
  vCentered?: boolean;
  hCentered?: boolean;
}

export type BaseComponentProps = TagProps & Partial<SizeProps & BreakpointProps & HideProps & PositionProps> & React.HTMLProps<HTMLElement>;

export type LayoutComponentProps = BaseComponentProps & ReverseProps & CenteredProps;

export type TypographyComponentProps = BaseComponentProps & FontProps;
