
export interface SizeProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export interface IgnoreSizeProps {
  ignoreSize?: boolean;
}

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

export type BaseComponentProps = TagProps & Partial<SizeProps & IgnoreSizeProps & BreakpointProps & HideProps & PositionProps> & React.HTMLProps<HTMLElement>;

export type LayoutComponentProps = BaseComponentProps & ReverseProps & CenteredProps;
