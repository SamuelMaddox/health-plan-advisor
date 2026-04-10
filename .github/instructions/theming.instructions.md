---
applyTo: "src/**/*.{ts,tsx,css}"
description: "Theme and styling rules for Tailwind v4 + shadcn + design-system tokens"
---

# Theme And Styling Instructions

- Prefer semantic Tailwind theme utilities in UI code (for example `bg-background`, `text-foreground`, `border-border`).
- Avoid raw color utilities when a semantic utility exists.
- Do not use `--ds-*` variables directly in component files.
- Keep raw design tokens and token mapping in stylesheet files.
- Reuse existing shadcn components and variants before creating custom primitives.
- Keep dark/light behavior token-driven; avoid duplicated per-component light/dark color logic unless necessary.
