/// <reference types="vite/client" />

import type { AppThemeManager } from "./types/appTheme";

declare global {
  interface Window {
    ThemeManager: AppThemeManager;
  }
}
