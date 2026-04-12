/// <reference types="vite/client" />

// The ThemeManager that is defined in an inline script in index.html.
interface ThemeManager {
  changeTheme(theme: "dark" | "light" | "system"): void;
  getTheme(): "dark" | "light";
}

interface Window {
  ThemeManager: ThemeManager;
}
