import type { AppThemeManager, AppThemeOption } from "@/types/appTheme";

// TODO: This mock may be different if i can move the real ThemeManager out of
// index.html and into it's own file. If that happens, this mock can be
// simplified by just importing the real ThemeManager and using it directly,
// localstorage and matchMedia("(prefers-color-scheme: dark)") will just need
// to be mocked instead of the whole thing.

export function createThemeManagerMock({
  initialTheme,
  systemTheme,
}: {
  initialTheme: AppThemeOption | undefined;
  systemTheme: Omit<AppThemeOption, "system">;
}) {
  let currentTheme = initialTheme;
  let currentSystemTheme = systemTheme;

  window.ThemeManager = {
    getTheme: vi
      .fn()
      .mockImplementation(() =>
        currentTheme !== "system" ? currentTheme : currentSystemTheme,
      ),
    handleSystemThemeChange: vi.fn().mockImplementation(() => {
      currentSystemTheme = currentSystemTheme === "light" ? "dark" : "light";
      window.dispatchEvent(new Event("SYSTEM_THEME_CHANGE_EVENT"));
    }),
    changeTheme: vi.fn().mockImplementation((newTheme: AppThemeOption) => {
      currentTheme = newTheme;
    }),
  } as AppThemeManager;
}
