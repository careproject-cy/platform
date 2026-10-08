'use client'

import React from "react";
import { ThemeDefaults, ThemeProvider } from "@vaneui/ui";

const themeDefaults: ThemeDefaults = {
  button: {
    main: {
      md: true,
      pill: true,
      primary: true,
    },
  },
  pageTitle: {
    serif: true,
    lg: true,
  },
  sectionTitle: {
    serif: true,
    xl: true,
  },
  badge: {
    secondary: true,
  }
}

export default function ThemeWrapper({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider themeDefaults={themeDefaults}>
      {children}
    </ThemeProvider>
  );
}
