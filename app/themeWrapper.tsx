'use client'

import React from "react";
import { ThemeDefaults, ThemeProps, ThemeProvider } from "@vaneui/ui";


const overrideFunc = (theme: ThemeProps) => {
  theme.button.themes.layout.ring.base = 'ring-2';
  theme.button.themes.layout.ring.active = 'active:ring-2';
  theme.button.themes.layout.ring.hover = 'hover:ring-2';

  theme.button.themes.appearance.background.filled.primary.base = 'bg-gradient-to-br from-orange-400 to-orange-700';
  theme.button.themes.appearance.background.filled.primary.hover = 'hover:opacity-90';
  theme.button.themes.appearance.background.filled.primary.active = 'active:opacity-100';
  theme.button.themes.appearance.ring.filled.primary.base = 'ring-orange-400';

  theme.button.themes.appearance.background.outline.default.hover = 'hover:bg-gray-50';

  return theme;
};

const themeDefaults: ThemeDefaults = {
  button: {
    noShadow: true,
    pill: true,
  },
  pageTitle: {
    serif: true,
    xl: true,
  },
  sectionTitle: {
    serif: true,
    xl: true,
  },
  badge: {
    accent: true,
  }
}

export default function ThemeWrapper({
                                       children,
                                     }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider themeOverride={overrideFunc} themeDefaults={themeDefaults}>
      {children}
    </ThemeProvider>
  );
}
