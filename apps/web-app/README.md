# Web App - Health Plan Advisor <!-- omit from toc -->

- [About This App](#about-this-app)
- [Getting Started](#getting-started)
  - [Step 0 - Prerequisites](#step-0---prerequisites)
  - [Step 1 - Install Dependencies](#step-1---install-dependencies)
  - [Step 2 - Run Development Server](#step-2---run-development-server)
- [Scripts](#scripts)
- [React Compiler Notes](#react-compiler-notes)
- [VS Code Extensions](#vs-code-extensions)

## About This App

This app is a Vite + React + TypeScript project using React Router Data mode and React Compiler.

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

| Script            | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server for local development.                    |
| `npm run build`   | Runs TypeScript project checks, then builds the production app with Vite.    |
| `npm run lint`    | Runs ESLint against the project using the flat config in `eslint.config.js`. |
| `npm run preview` | Serves the built `dist` output locally to preview the production build.      |

## React Compiler Notes

React Compiler is enabled in `vite.config.ts` through Babel plugin config.

- In dev (`vite serve`): `panicThreshold` is `all_errors`
- In build: `panicThreshold` is `none`

This keeps compiler feedback strict during development while allowing production builds to proceed.

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
