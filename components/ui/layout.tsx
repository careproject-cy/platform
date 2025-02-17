import React from 'react';
import { BaseComponentProps } from "./props";
import { componentBuilder } from "./utils";

export const Section: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "section", "w-full flex flex-col items-center")
    .withSizes({
      xs: "p-6  max-lg:p-4  max-md:p-2",
      sm: "p-8  max-lg:p-6  max-md:p-4",
      md: "p-10 max-lg:p-8  max-md:p-6",
      lg: "p-12 max-lg:p-10 max-md:p-8",
      xl: "p-14 max-lg:p-12 max-md:p-10"
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

export const Col: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col w-full ")
    .withSizes({
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-10"
    })
    .build();

export const Row: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-row items-center w-full")
    .withSizes({
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-10"
    })
    .build();

export const Grid3: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-lg:gap-4")
    .build();

export const Grid4: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 max-lg:gap-4")
    .build();

