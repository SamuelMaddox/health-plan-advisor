# Health Plan Advisor - Web App<!-- omit from toc -->

- [About This App](#about-this-app)
- [Getting Started](#getting-started)
  - [Step 0 - Prerequisites](#step-0---prerequisites)
  - [Step 1 - Install Dependencies](#step-1---install-dependencies)
  - [Step 2 - Run Development Server](#step-2---run-development-server)
- [Scripts](#scripts)
- [React Compiler Notes](#react-compiler-notes)
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

### Step 2 - Run Development Server

```terminal
npm run dev
```

## Scripts

| Script                   | Description                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Starts the Vite development server for local development.                                                                             |
| `npm run build`          | Runs TypeScript project checks, then builds the production app with Vite.                                                             |
| `npm run preview`        | Serves the built `dist` output locally to preview the production build.                                                               |
| `npm run lint`           | Runs ESLint against the project using the flat config in `eslint.config.js`.                                                          |
| `npm run prettier`       | Format files to conform to the Prettier Style Guide                                                                                   |
| `npm run prettier:check` | Check if files conforms to the Prettier Style Guide without making changes. Exits with an error status if files require re-formatting |

## React Compiler Notes

React Compiler is enabled in `vite.config.ts` through Babel plugin config.

- In dev (`vite serve`): `panicThreshold` is `all_errors`
- In build: `panicThreshold` is `none`

This keeps compiler feedback strict during development while allowing production builds to proceed.

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
