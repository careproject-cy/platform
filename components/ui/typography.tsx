import React from 'react';
import { componentBuilder } from "./utils";
import { TypographyComponentProps } from "./props";
import { fontMap } from "./commonValues";

export const PageTitle: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h1", "font-semibold")
    .withSizes({
      xs: "text-3xl",
      sm: "text-4xl",
      md: "text-5xl",
      lg: "text-6xl",
      xl: "text-7xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const SectionTitle: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h2", "font-semibold")
    .withSizes({
      xs: "text-2xl",
      sm: "text-3xl",
      md: "text-4xl",
      lg: "text-5xl",
      xl: "text-6xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const TextTitle: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "h3", "font-semibold")
    .withSizes({
      xs: "text-lg",
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
      xl: "text-4xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const Text: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "p", "text-gray-600 p-0 m-0")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const Link: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "a", "text-blue-500 hover:underline")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const ListItem: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "li", "text-gray-600")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();

export const List: React.FC<TypographyComponentProps> = (props) =>
  componentBuilder(props, "ul", "list-disc list-inside")
    .withSizes({
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      ignoreSize: "",
    })
    .withFont(fontMap)
    .build();
