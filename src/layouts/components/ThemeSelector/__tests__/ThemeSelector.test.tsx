import { render } from "@testing-library/react";
import { ThemeSelector } from "../ThemeSelector";
import { createThemeManagerMock } from "./utils/ThemeManagerMock";
import { clickMenuItem, queryTriggerButton } from "./utils/queryElements";

test("should show the correct aria label and icon on the trigger button for light theme", () => {
  createThemeManagerMock({ initialTheme: "light", systemTheme: "light" });

  render(<ThemeSelector />);

  const { triggerButton, themeIcon } = queryTriggerButton();
  expect(triggerButton).toHaveAttribute(
    "aria-label",
    "Theme: light. Open theme menu",
  );
  expect(themeIcon).toHaveClass("lucide-sun");
});

test("should show the correct aria label and icon on the trigger button for dark theme", () => {
  createThemeManagerMock({ initialTheme: "dark", systemTheme: "dark" });

  render(<ThemeSelector />);

  const { triggerButton, themeIcon } = queryTriggerButton();
  expect(triggerButton).toHaveAttribute(
    "aria-label",
    "Theme: dark. Open theme menu",
  );
  expect(themeIcon).toHaveClass("lucide-moon");
});

test("should switch to light theme when light theme is selected", async () => {
  createThemeManagerMock({ initialTheme: "dark", systemTheme: "dark" });

  render(<ThemeSelector />);
  await clickMenuItem("Light");

  const { themeIcon } = queryTriggerButton();
  expect(themeIcon).toHaveClass("lucide-sun");
});

test("should switch to dark theme when dark theme is selected", async () => {
  createThemeManagerMock({ initialTheme: "light", systemTheme: "light" });

  render(<ThemeSelector />);
  await clickMenuItem("Dark");

  const { themeIcon } = queryTriggerButton();
  expect(themeIcon).toHaveClass("lucide-moon");
});

test("should switch to system theme when system theme is selected", async () => {
  createThemeManagerMock({ initialTheme: "light", systemTheme: "dark" });

  render(<ThemeSelector />);
  await clickMenuItem("System");

  const { themeIcon } = queryTriggerButton();
  expect(themeIcon).toHaveClass("lucide-moon");
});

test("should subscribe to system theme changes and update the trigger button accordingly", () => {
  createThemeManagerMock({ initialTheme: undefined, systemTheme: "light" });

  render(<ThemeSelector />);
  window.ThemeManager.handleSystemThemeChange();

  const { themeIcon } = queryTriggerButton();
  expect(themeIcon).toHaveClass("lucide-moon");
});
