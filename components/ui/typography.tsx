import React from 'react';
import { buildComponent } from "./utils";
import { BaseComponentProps } from "./props";

export const PageTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h1",
  "font-semibold", {
    xs: "text-3xl",
    sm: "text-4xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl"
  });

export const SectionTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h2",
  "font-semibold", {
    xs: "text-2xl",
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl"
  });

export const TextTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h3",
  "font-semibold", {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl"
  });

export const Text: React.FC<BaseComponentProps> = (props) => buildComponent(props, "p",
  "text-gray-600 p-0 m-0", {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl"
  });

export const Link: React.FC<BaseComponentProps> = (props) => buildComponent(props, "a",
  "text-blue-500 hover:underline", {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl"
  });
