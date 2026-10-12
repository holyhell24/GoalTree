import { useEffect, useState } from "react";
import type { ColorTheme } from "../components/ThemeSelector/types";

const storageKey = "goaltree-theme";
function loadTheme(): ColorTheme {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "ocean" || saved === "autumn" || saved === "midnight"
      ? saved
      : "forest";
  } catch {
    return "forest";
  }
}

export function useColorTheme() {
  const [theme, setTheme] = useState(loadTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      /* Keep the theme usable without storage. */
    }
  }, [theme]);
  return { theme, setTheme };
}
