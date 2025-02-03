import React from 'react';
import BaseComponentProps from "./props";
import { buildComponent } from "./utils";

export const Divider: React.FC<BaseComponentProps> = (props) => buildComponent(props, "div", 
  "bg-gray-200 w-full h-px");
