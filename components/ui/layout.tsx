import React from 'react';
import { BaseComponentProps, LayoutComponentProps } from "./props";
import { componentBuilder } from "./utils";

export const Section: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "section", "w-full flex flex-col items-center")
    .withSizes({
      xs: "py-6  max-lg:py-4  max-md:py-2",
      sm: "py-8  max-lg:py-6  max-md:py-4",
      md: "py-10 max-lg:py-8  max-md:py-6",
      lg: "py-12 max-lg:py-10 max-md:py-8",
      xl: "py-14 max-lg:py-12 max-md:py-10"
    })
    .withSizes({
      xs: "px-4  max-lg:px-2  max-md:px-0",
      sm: "px-6  max-lg:px-6  max-md:px-2",
      md: "px-8  max-lg:px-6  max-md:px-4",
      lg: "px-10 max-lg:px-8  max-md:px-6",
      xl: "px-12 max-lg:px-10 max-md:px-8"
    })
    .build();

export const Container: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col items-center mx-auto w-full")
    .withSizes({
      xs: "max-w-5xl gap-6  max-lg:gap-4  max-md:gap-2",
      sm: "max-w-6xl gap-8  max-lg:gap-6  max-md:gap-4",
      md: "max-w-7xl gap-10 max-lg:gap-8  max-md:gap-6",
      lg: "max-w-8xl gap-12 max-lg:gap-10 max-md:gap-8",
      xl: "max-w-9xl gap-14 max-lg:gap-12 max-md:gap-10"
    })
    .build();

const commonGaps = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-3 max-md:gap-2",
  md: "gap-6  max-lg:gap-5 max-md:gap-4",
  lg: "gap-8  max-lg:gap-7 max-md:gap-6",
  xl: "gap-10 max-lg:gap-9 max-md:gap-8"
}

export const Col: React.FC<LayoutComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col w-full")
    .withSizes(commonGaps)
    .withReverse({
      reverse: "flex-col-reverse"
    })
    .build();

export const Row: React.FC<LayoutComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-row items-center w-full")
    .withSizes(commonGaps)
    .withReverse({
      reverse: "flex-row-reverse"
    })
    .withBreakpoints({
      xsCol: "max-xs:flex-col",
      smCol: "max-sm:flex-col",
      mdCol: "max-md:flex-col",
      lgCol: "max-lg:flex-col",
      xlCol: "max-xl:flex-col"
    })
    .build();

const gridGaps = {
  xs: "gap-2",
  sm: "gap-4  max-lg:gap-2",
  md: "gap-6  max-lg:gap-4",
  lg: "gap-8  max-lg:gap-6 max-md:gap-4",
  xl: "gap-10 max-lg:gap-8 max-md:gap-6"
}

export const Grid3: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1")
    .withSizes(gridGaps)
    .build();

export const Grid4: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1")
    .withSizes(gridGaps)
    .build();

