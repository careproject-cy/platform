'use client'

import React from "react";
import { ThemeDefaults, ThemeExtraClasses, ThemeProvider } from "@vaneui/ui";

// Extra classes for custom styling (replaces old theme overrides)
const extraClasses: ThemeExtraClasses = {
  button: {
    // Primary filled buttons get the orange gradient
    primary: 'ring-2',
    filled: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 hover:opacity-90 active:opacity-100 ring-orange-400',
  },
}

const themeDefaults: ThemeDefaults = {
  button: {
    noShadow: true,
    pill: true,
    primary: true,
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
