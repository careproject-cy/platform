import React from 'react';
import { buildComponent } from "./utils";
import { BaseComponentProps } from "./props";

export const Divider: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div", 
  "bg-gray-200 w-full h-px");
