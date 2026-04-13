export type AppThemeOption = "dark" | "light" | "system";

// The ThemeManager that is defined in an inline script in index.html.
export interface AppThemeManager {
  changeTheme(theme: AppThemeOption): void;
  handleSystemThemeChange(): void;
  getTheme(): "light" | "dark";
}
