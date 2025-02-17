
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

export interface TagProps {
  tag?: React.ElementType | string;
}

export interface ReverseProps {
  reverse?: boolean;
}

export type BaseComponentProps = TagProps & Partial<SizeProps & IgnoreSizeProps & BreakpointProps> & React.HTMLProps<HTMLElement>;

export type LayoutComponentProps = BaseComponentProps & ReverseProps;
