import { ThemeSelector } from "../ThemeSelector/ThemeSelector";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="text-sm font-semibold text-foreground sm:text-base">
          Health Plan Advisor
        </h1>
        <ThemeSelector />
      </div>
    </header>
  );
}
