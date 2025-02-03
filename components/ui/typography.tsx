import React from 'react';
import BaseComponentProps from "./props";
import { buildComponent } from "./utils";

export const PageTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h1",
  "text-5xl font-semibold");

export const SectionTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h2",
  "text-4xl font-semibold");

export const TextTitle: React.FC<BaseComponentProps> = (props) => buildComponent(props, "h3",
  "text-2xl font-semibold");

export const Text: React.FC<BaseComponentProps> = (props) => buildComponent(props, "p",
  "text-lg text-gray-600 p-0 m-0");
