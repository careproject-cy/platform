'use client'

import React from "react";
import { ThemeDefaults, ThemeProvider } from "@vaneui/ui";

// Instrument Serif ships one weight, so headings use the normal weight.
const themeDefaults: ThemeDefaults = {
  button: {
    main: {
      md: true,
      pill: true,
    },
  },
  iconButton: {
    pill: true,
  },
  pageTitle: {
    fontNormal: true,
  },
  sectionTitle: {
    fontNormal: true,
  },
  title: {
    fontNormal: true,
  },
  chip: {
    pill: true,
  },
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
