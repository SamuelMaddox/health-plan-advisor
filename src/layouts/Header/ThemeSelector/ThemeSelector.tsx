import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useResolvedTheme } from "./useResolvedTheme";

// TODO: somehow would like to test this and the window theme manager, something like
// Light Mode
//   1. on load shows sun icon and no data-theme attribute on html when localStorage.theme is light
//   2. on load shows sun icon and no data-theme attribute on html when no localStorage.theme and system theme is light
//   3. on click light sets localStorage.theme to light and shows sun icon
//
// Dark Mode
//   1. on load shows moon icon and data-theme="dark" attribute on html when localStorage.theme is dark
//   2. on load shows moon icon and data-theme="dark" attribute on html when no localStorage.theme but system theme is dark
//   3. on click dark sets localStorage.theme to dark and shows moon icon
//
// System Mode
//   1. on change system light updates to sun icon and no data-theme attribute on html when no localStorage.theme
//   2. on change system dark updates to moon icon and data-theme="dark" attribute on html when no localStorage.theme
//   3. on click system removes localStorage.theme, no data-theme attribute on html, and shows sun icon when system theme is light
//   4. on click system removes localStorage.theme, data-theme="dark" attribute on html, and shows moon icon when system theme is dark

export function ThemeSelector() {
  const { resolvedTheme, changeTheme } = useResolvedTheme();

  const { themeLabel, ThemeIcon } =
    resolvedTheme === "light"
      ? { themeLabel: "light", ThemeIcon: SunIcon }
      : { themeLabel: "dark", ThemeIcon: MoonIcon };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            className="transition-none"
            aria-label={`Theme: ${themeLabel}. Open theme menu`}
          />
        }
      >
        <ThemeIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => changeTheme("light")}>
            <SunIcon aria-hidden="true" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("dark")}>
            <MoonIcon aria-hidden="true" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("system")}>
            <MonitorIcon aria-hidden="true" />
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
