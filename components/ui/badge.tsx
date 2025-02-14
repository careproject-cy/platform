import React from 'react';
import { buildComponent } from "./utils";
import { BaseComponentProps } from "./props";

export const Badge: React.FC<BaseComponentProps> = (props) => buildComponent(props, "span", 
  "font-mono text-sm font-semibold px-3 py-1 bg-gray-200 rounded-full text-gray-600 uppercase w-fit");
