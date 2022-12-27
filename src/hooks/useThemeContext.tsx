/*
 * useThemeContext.tsx
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space, 
 */

import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/themeSlice";

export function ThemeContextProvider({
  children
}: { children?: React.ReactNode}) {
  // select the theme
  const theme = useAppSelector(selectTheme);
  useEffect(() => {
    // Iterate through each value in theme object
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return <>
    {children}
  </>;
}