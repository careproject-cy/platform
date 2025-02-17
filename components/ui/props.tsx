
export interface SizeProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export interface BreakpointProps {
  smCol?: boolean;
  mdCol?: boolean;
  lgCol?: boolean;
  xlCol?: boolean;
}

export interface TagProps {
  tag?: React.ElementType | string;
}

export type BaseComponentProps = TagProps & SizeProps & BreakpointProps & React.HTMLProps<HTMLElement>;
