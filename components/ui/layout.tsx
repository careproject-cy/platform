import React from 'react';
import { BaseComponentProps } from "./props";
import { buildComponent } from "./utils";

export const Section: React.FC<BaseComponentProps> = (props) => buildComponent(props, "section",
  "w-full flex flex-col items-center");

export const Container: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div",
  "w-full mx-auto flex flex-col items-center max-w-7xl p-5");

export const Col: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div",
  "flex flex-col");

export const Row: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div",
  "flex flex-row items-center");

export const Grid3: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div",
  "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6");

export const Grid4: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div",
  "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6");
