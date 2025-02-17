import React from 'react';
import { BaseComponentProps } from "./props";
import { componentBuilder } from "./utils";

export const Section: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "section", "w-full flex flex-col items-center")
    .build();

export const Container: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full mx-auto flex flex-col items-center max-w-7xl p-5")
    .build();

export const Col: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-col")
    .build();

export const Row: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "flex flex-row items-center")
    .build();

export const Grid3: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-lg:gap-4")
    .build();

export const Grid4: React.FC<BaseComponentProps> = (props) =>
  componentBuilder(props, "div", "w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 max-lg:gap-4")
    .build();

