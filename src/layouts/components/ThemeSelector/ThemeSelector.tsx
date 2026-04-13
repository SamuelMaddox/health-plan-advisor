import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useResolvedTheme } from "./hooks/useResolvedTheme";

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
