import { useEffect, useState } from "react";

// ============================
// === HOW THEME IS MANAGED ===
// ============================
//  1. The inline `window.ThemeManager` script in `index.html` is the runtime
//    source of truth for applying theme before React mounts, which avoids
//    FOUC (Flash Of Unstyled Content) and keeps the root `data-theme` attribute
//    in sync.
//  2. This hook mirrors that external state into React so components can
//    re-render when the resolved theme changes.
//  3. `src/styles/globals.css` ties this to Tailwind with
//    `@custom-variant dark`, mapping dark-mode utilities to the
//    `[data-theme=dark]` data attribute.
//    https://tailwindcss.com/docs/dark-mode#using-a-data-attribute

type ThemeOption = "dark" | "light" | "system";

export function useResolvedTheme() {
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    window.ThemeManager.getTheme(),
  );

  useEffect(() => {
    // Subscribe to system theme changes so that if the user has the "system"
    // theme selected, the app will update properly when the user's system
    // theme changes.
    const handleSystemThemeChange = () => {
      setResolvedTheme(window.ThemeManager.getTheme());
    };
    window.addEventListener(
      "SYSTEM_THEME_CHANGE_EVENT",
      handleSystemThemeChange,
    );
    return () => {
      window.removeEventListener(
        "SYSTEM_THEME_CHANGE_EVENT",
        handleSystemThemeChange,
      );
    };
  }, []);

  const changeTheme = (theme: ThemeOption) => {
    window.ThemeManager.changeTheme(theme);
    setResolvedTheme(window.ThemeManager.getTheme());
  };

  return {
    resolvedTheme,
    changeTheme,
  };
}
