
export interface SizeProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export interface TagProps {
  tag?: React.ElementType | string;
}

export type BaseComponentProps = TagProps & SizeProps & React.HTMLProps<HTMLElement>;
