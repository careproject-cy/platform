'use client'

import React from "react";
import { ThemeDefaults, ThemeExtraClasses, ThemeProvider } from "@vaneui/ui";

// Extra classes for custom styling (replaces old theme overrides)
const extraClasses: ThemeExtraClasses = {
  button: {
    main: {
      filled: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 hover:opacity-90 active:opacity-100',
    },
  },
  container: {
    xl: "gap-10",
    lg: "gap-8",
  }
}

const themeDefaults: ThemeDefaults = {
  button: {
    main: {
      md: true,
      noShadow: true,
      pill: true,
      primary: true,
      shadow: true,
    },
  },
  pageTitle: {
    serif: true,
    xl: true,
  },
  sectionTitle: {
    serif: true,
    xl: true,
    textCenter: true,
  },
  badge: {
    accent: true,
  }
}

export default function ThemeWrapper({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider themeDefaults={themeDefaults} extraClasses={extraClasses}>
      {children}
    </ThemeProvider>
  );
}
