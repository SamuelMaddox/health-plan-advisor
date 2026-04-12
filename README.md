# Health Plan Advisor - Web App<!-- omit from toc -->

- [About This App](#about-this-app)
- [Getting Started](#getting-started)
  - [Step 0 - Prerequisites](#step-0---prerequisites)
  - [Step 1 - Install Dependencies](#step-1---install-dependencies)
  - [VS Code Settings](#vs-code-settings)
  - [Step 2 - Run Development Server](#step-2---run-development-server)
- [Scripts](#scripts)
- [React Compiler Notes](#react-compiler-notes)
- [AI Agent Skills](#ai-agent-skills)
- [UI Components](#ui-components)
  - [`shadcn`](#shadcn)
  - [`class-variance-authority` (CVA)](#class-variance-authority-cva)
  - [`clsx`](#clsx)
  - [`tailwind-merge`](#tailwind-merge)
  - [`lucide-react`](#lucide-react)
  - [`tw-animate-css`](#tw-animate-css)
- [Theme](#theme)
- [Theme Configuration](#theme-configuration)
  - [Using Color Utilities](#using-color-utilities)
  - [Using Theme Variables](#using-theme-variables)
- [ESLint](#eslint)
  - [What is ESLint](#what-is-eslint)
  - [No Enums Custom Rule](#no-enums-custom-rule)
  - [Print Full Config](#print-full-config)
  - [Disable Node](#disable-node)
  - [Disable Linting Conventions](#disable-linting-conventions)
  - [Ignore root files or directories](#ignore-root-files-or-directories)
- [Prettier](#prettier)
  - [What is Prettier](#what-is-prettier)
  - [Prettier Ignore Node](#prettier-ignore-node)
  - [Prettier Disable Conventions](#prettier-disable-conventions)
- [Pre-Commit Hooks](#pre-commit-hooks)
  - [About Pre-Commit Hooks](#about-pre-commit-hooks)
  - [About Husky](#about-husky)
  - [About Lint-Staged](#about-lint-staged)
  - [Configure Git Hooks](#configure-git-hooks)
  - [Bypassing Pre-Commit Hooks](#bypassing-pre-commit-hooks)
- [VS Code Extensions](#vs-code-extensions)

## About This App

This app is a Vite + React + TypeScript project using React Router Data mode and React Compiler.

Health Plan Advisor is a web application that helps people compare health insurance options by calculating the true total cost of each plan, not just the monthly premium. It combines premiums, deductibles, copays, coinsurance, out-of-pocket maximums, and estimated medical usage to show side-by-side annual cost projections for different scenarios. The app also includes an AI chat assistant that answers plan-specific questions in plain language, explains tradeoffs, and helps users choose the plan that best fits their health needs and budget.

## Getting Started

### Step 0 - Prerequisites

- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install Node 24.0+](https://nodejs.org/en/download)

### Step 1 - Install Dependencies

Run the following command:

```terminal
npm install
```

### VS Code Settings

If you're using VS Code with the Tailwind CSS IntelliSense extension, add this to your settings.json:

```json
{
  ...
  "tailwindCSS.classFunctions": ["clsx"],
}
```

### Step 2 - Run Development Server

```terminal
npm run dev
```

## Scripts

| Script                   | Description                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Starts the Vite development server for local development.                                                                                 |
| `npm run build`          | Runs TypeScript project checks, then builds the production app with Vite.                                                                 |
| `npm run preview`        | Serves the built `dist` output locally to preview the production build.                                                                   |
| `npm run lint`           | Runs ESLint against the project using the flat config in `eslint.config.js`.                                                              |
| `npm run prettier`       | Format files to conform to the Prettier Style Guide                                                                                       |
| `npm run prettier:check` | Check if files conforms to the Prettier Style Guide without making changes. Exits with an error status if files require re-formatting     |
| `pnpm run prepare`       | This script runs automatically after you install dependencies. It triggers Husky’s installation process, which sets up Git hooks locally. |

## React Compiler Notes

React Compiler is enabled in `vite.config.ts` through Babel plugin config.

- In dev (`vite serve`): `panicThreshold` is `all_errors`
- In build: `panicThreshold` is `none`

This keeps compiler feedback strict during development while allowing production builds to proceed.

## AI Agent Skills

TODO: more details here, update prepare script above to includes skills install, what is the experimental_install about.

[Agent skills](https://www.npmjs.com/package/skills) are reusable instruction sets that extend your coding agent's capabilities. They're defined in SKILL.md files with YAML frontmatter containing a name and description.

Skills let agents perform specialized tasks like:

- Generating release notes from git history
- Creating PRs following your team's conventions
- Integrating with external tools (Linear, Notion, etc.)

Discover skills at [skills.sh](https://skills.sh/)

## UI Components

TODO: should provide link to the documentation for each of these tools

TODO: add this comment somewhere here. in fact, this should maybe be it's own sub category like shadcn and other tools are --- [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design directly in your markup.

TODO: Probably something about components being built on base ui (include link). when refering to shadcn documentation be sure to select Base UI?

Our UI is built using Tailwind CSS and shadcn/ui. Rather than using a traditional component library, shadcn provides a CLI to generate accessible, prebuilt components directly into our codebase, which we then own and customize.

Below is a breakdown of the key packages and their roles.

### `shadcn`

A CLI tool used to generate UI components directly into the codebase.

- Not a runtime dependency
- Provides prebuilt, accessible component templates
- Components are copied into the project and fully owned by us

Example:

```bash
npx shadcn add button
```

### `class-variance-authority` (CVA)

Instead of manually concatenating Tailwind classes, CVA allows us to define variants declaratively and reuse them across components.

Example problem it solves:

```tsx
<button className="bg-blue-500 rounded px-4 py-2 text-white" />
```

Now imagine variants:

- size: sm / md / lg
- variant: primary / secondary / ghost

CVA lets you define this cleanly:

```tsx
const buttonVariants = cva("rounded px-4 py-2", {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200",
    },
    size: {
      sm: "text-sm",
      lg: "text-lg",
    },
  },
});
```

### `clsx`

Utility for conditionally joining class names.

```tsx
clsx("base-class", isActive && "active");
```

Instead of:

```tsx
"base-class " + (isActive ? "active" : "");
```

### `tailwind-merge`

Resolves conflicting Tailwind classes when multiple class sources are combined.

Problem:

```tsx
"px-2 px-4"; // which wins?
```

Solution:

```tsx
twMerge("px-2 px-4"); // → "px-4"
```

This is especially important when combining:

- base styles
- variant styles
- user overrides

### `lucide-react`

Icon library used throughout the UI.

- Used by many shadcn components (e.g., buttons with icons, alerts, dropdowns)
- Lightweight and tree-shakeable

### `tw-animate-css`

Provides predefined animation utilities for Tailwind. Used for common UI interactions such as:

- dialogs
- dropdowns
- accordions

## Theme

Theming in this project is implemented using [Tailwind CSS](https://tailwindcss.com/), (TODO: with a few custom theme variables defined within the tailwind system that shadcn relies on).

TODO: maybe add something about shadcn having custom theme variables it uses, but they are an extension of tailwind theme variables, and that extension is done by following tailwinds adding custom styles documentaiton (linked in the tip below)

TODO: This comment from the useResolvedTheme hook should be duplicated here, perhaps in it's own section about the ThemeManager inline script in index.html

```ts
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
```

## Theme Configuration

> [!tip]
>
> Useful Documentation:
>
> - [Tailwind: Preflight](https://tailwindcss.com/docs/preflight) - Documents the baseline CSS reset Tailwind injects to normalize browser default styles.
> - [Tailwind: Theme](https://tailwindcss.com/docs/theme) - Explains how to configure and extend Tailwind's design tokens via the `@theme` block.
> - [Tailwind: Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) - Covers the different ways to add one-off styles outside of the standard utility class system.

TODO: Read this guide to understand how we configured the project's light and dark themes.

TODO: How does shadcn fit into this? that guide should maybe include that, as well as the this readme.

TODO: What we need to call out here is that the semantic theme variables will automatically swap values for light and dark mode, so instead of `class="bg-white dark:bg-black"` you can use `class="bg-background"` instead. the raw design system is defined in `src/styles/raw-design-system.css` (verify path is correct) and should NOT be used within the main app. this is where the color palette, light theme, and dark theme are defined here. all variables within this should NOT be used and are prepended with `ds-` for Design System (EX: `--ds-background`). Then `src/index.css` imports the `raw-design-system.css` and adds the design system variables to the tailwind theme using the Tailwind's custom `@theme inline` directive

### Using Color Utilities

> [!note]
> Source: [Using Color Utilities](https://tailwindcss.com/docs/colors#using-color-utilities)

Use color utilities like `bg-white`, `border-pink-300`, and `text-gray-950` to set the different color properties of elements in your design:

| Utility         | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| bg-\*           | Sets the [background color](https://tailwindcss.com/docs/background-color) of an element                      |
| text-\*         | Sets the [text color](https://tailwindcss.com/docs/text-color) of an element                                  |
| decoration-\*   | Sets the [text decoration color](https://tailwindcss.com/docs/text-decoration-color) of an element            |
| border-\*       | Sets the [border color](https://tailwindcss.com/docs/border-color) of an element                              |
| outline-\*      | Sets the [outline color](https://tailwindcss.com/docs/outline-color) of an element                            |
| shadow-\*       | Sets the color of [box shadows](https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color)             |
| inset-shadow-\* | Sets the color of [inset box shadows](https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color) |
| ring-\*         | Sets the color of [ring shadows](https://tailwindcss.com/docs/box-shadow#setting-the-ring-color)              |
| inset-ring-\*   | Sets the color of [inset ring shadows](https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color)  |
| accent-\*       | Sets the [accent color](https://tailwindcss.com/docs/accent-color) of form controls                           |
| caret-\*        | Sets the [caret color](https://tailwindcss.com/docs/caret-color) in form controls                             |
| fill-\*         | Sets the [fill color](https://tailwindcss.com/docs/fill) of SVG elements                                      |
| stroke-\*       | Sets the [stroke color](https://tailwindcss.com/docs/stroke) of SVG elements                                  |

### Using Theme Variables

> [!note]
> Source: [Theme Variable Namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)

Theme variables are defined in namespaces and each namespace corresponds to one or more utility class or variant APIs.

| Namespace         | Utility classes                                                       |
| ----------------- | --------------------------------------------------------------------- |
| --color-\*        | Color utilities like bg-red-500, text-sky-300, and many more          |
| --font-\*         | Font family utilities like font-sans                                  |
| --text-\*         | Font size utilities like text-xl                                      |
| --font-weight-\*  | Font weight utilities like font-bold                                  |
| --tracking-\*     | Letter spacing utilities like tracking-wide                           |
| --leading-\*      | Line height utilities like leading-tight                              |
| --breakpoint-\*   | Responsive breakpoint variants like sm:\*                             |
| --container-\*    | Container query variants like @sm:\* and size utilities like max-w-md |
| --spacing-\*      | Spacing and sizing utilities like px-4, max-h-16, and many more       |
| --radius-\*       | Border radius utilities like rounded-sm                               |
| --shadow-\*       | Box shadow utilities like shadow-md                                   |
| --inset-shadow-\* | Inset box shadow utilities like inset-shadow-xs                       |
| --drop-shadow-\*  | Drop shadow filter utilities like drop-shadow-md                      |
| --blur-\*         | Blur filter utilities like blur-md                                    |
| --perspective-\*  | Perspective utilities like perspective-near                           |
| --aspect-\*       | Aspect ratio utilities like aspect-video                              |
| --ease-\*         | Transition timing function utilities like ease-out                    |
| --animate-\*      | Animation utilities like animate-spin                                 |

## ESLint

### What is ESLint

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

### No Enums Custom Rule

Our eslint config defines a custom rule that forbids the use of `enums`. The reason for this rule is best explained by this article: [Why you should use string literal unions over enums in TypeScript](https://www.typescriptcourse.com/string-literal-unions-over-enums).

### Print Full Config

If you want to see the final rule set, all plugins, and names of all extended configs, use one of the following commands:

- Using npx: `npx eslint --print-config src/file.tsx > tmp.config.json`

### Disable Node

To disable a line of code do the following:

```js
// eslint-disable-next-line no-console -- Here's a description about why this configuration is necessary.
console.log("bar");
```

To disable a block of code do the following:

```js
/* eslint-disable no-console--
 * Here's a very long description about why this configuration is necessary
 * along with some additional information
 **/
console.log("bar");
/* eslint-enable no-console */
```

### Disable Linting Conventions

Please follow these 2 conventions When disabling a line or block of code:

**Convention 1** - Only disable the offending rule, not all of eslint. Example:

**Good** = `/* eslint disable no-console */`
**Bad** = `/* eslint disable */`

**Convention 2** - Provide a description explaining why the rule is disabled

The description must come after the rule and needs to be separated from the rule by two or more consecutive `--` characters. For example:

```js
// eslint-disable-next-line no-console -- Here's a description about why this disable comment is necessary.
console.log("hello");

/* eslint-disable-next-line no-console --
 * Here's a very very very very very very very very very very very very very
 * very long description about why this disable comment is necessary
 **/
console.log("hello");
```

### Ignore root files or directories

See ESLint documentation on [Ignoring Files and Directories](https://eslint.org/docs/latest/use/configure/ignore)

## Prettier

### What is Prettier

Prettier is used to format our code to conform to a consistent style.

### Prettier Ignore Node

In some cases prettier will reformat code that we don't want reformated. We can use `// prettier-ignore` to exclude the next node from formatting. For example:

```js
// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

will be transformed to a single line, making it harder to read, without the ignore comment:

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
```

### Prettier Disable Conventions

When disabling a line or block of code please provide an extra comment before the disable statement explaining why the rule is disabled

## Pre-Commit Hooks

> [!warning]
> Committing can seem to take a while if using the Git GUI in VS Code. This is because pre-commit hooks are running in the background before the commit is executed. If you're committing in the terminal you'll see the pre-commit hooks running.

### About Pre-Commit Hooks

A **pre-commit** hook is a script that runs automatically before a commit is finalized in Git. It’s used to catch issues early (like lint errors or formatting problems) by running checks or commands before code is committed. If the script fails, the commit is blocked.

### About Husky

> [!note]
> [Official Husky Installation Instructions](https://typicode.github.io/husky/get-started.html)

**Husky** is a tool that makes it easy to manage Git hooks (like pre-commit) in JavaScript projects. It lets you define scripts that run at various points in the Git workflow (e.g., before commits, before pushes) by placing executable files in the `.husky` directory.

The `"prepare": "husky"` script in your `package.json` ensures Husky is set up after every install; which in turns ensures git hooks are configured for you locally on your machine.

### About Lint-Staged

> [!note]
> [Official Lint-Staged Installation README.md](https://github.com/lint-staged/lint-staged)

**lint-staged** is a tool that runs scripts only on files that are staged for commit. This makes pre-commit checks fast and efficient, since only changed files are checked, not the whole codebase. Most useful for auto formatting staged files. Husky can run a prettier script, but will NOT re-stage files that have been formatted before committing.

### Configure Git Hooks

- The `.husky/pre-commit` file contains the scripts to run before commit, including `lint-staged`.
- The `lint-staged.config.js` file describes what scripts to run for what glob patterns.

### Bypassing Pre-Commit Hooks

you can bypass `pre-commit` hooks using the `--no-verify` option. Example:

```shell
`git commit -m "yolo" --no-verify`
```

## VS Code Extensions

> [!NOTE]
> Some of the extensions listed below have also been added to the workspace recommended extensions file: `.vscode/extensions.json`

| Extension Name                                                                                                 | Description                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)                            | View a Git Graph of your repository, and easily perform Git actions from the graph.                                                                                                                                                                                                                     |
| [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)                 | An AI pair programmer tool that helps you write code faster and smarter.                                                                                                                                                                                                                                |
| [GitHub Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview) | Changes VS Code's built-in markdown preview to match GitHub markdown rendering in style and content.                                                                                                                                                                                                    |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)             | Linting for markdown files to encourage standards and consistency for Markdown files.                                                                                                                                                                                                                   |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)          | Adds a stronger Markdown authoring workflow in VS Code, including automatic table of contents generation and update support.                                                                                                                                                                            |
| [open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)                  | Useful to quickly open test coverage files in browser.                                                                                                                                                                                                                                                  |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)              | The Better Comments extension will help you create more human-friendly comments in your code. With this extension, you will be able to categorise your annotations into `Alerts`, `Queries`, `TODOs`, `Highlights`,`Commented out code can also be styled to make it clear the code shouldn't be there` |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                           | Provides immediate linting when writing code                                                                                                                                                                                                                                                            |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                         | Used to automatically format code files to a consistent style                                                                                                                                                                                                                                           |
| [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)     | Adds Tailwind CSS autocomplete, linting, and hover previews for utility classes used throughout the app.                                                                                                                                                                                                |
