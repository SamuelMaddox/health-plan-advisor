import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslintReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import { eslintTargets } from "./lint-targets.js";
// import css from "@eslint/css"; // 🟡 TODO: Does this work yet for TailwindCSS v4.0?
// import tailwind from "eslint-plugin-tailwindcss"; // 🟡 TODO: Does this work yet for TailwindCSS v4.0

export default defineConfig([
  globalIgnores(["dist", ".agents/**"]),
  comments.recommended,
  {
    rules: {
      "@eslint-community/eslint-comments/require-description": "error",
    },
  },
  {
    files: [eslintTargets.typescript],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintReact.configs["strict-typescript"],
      eslintReact.configs["disable-conflict-eslint-plugin-react"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // 🟡 TODO: What about the unofficial but very popular eslint-plugin-tailwindcss plugin? as of
      // 4/1/2026 it does not yet support TailwindCSS v4.0
      // tailwind.configs["flat/recommended"], // 🟡 TODO: Does this work yet for TailwindCSS v4.0?
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-alert": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message:
            "Enums are forbidden. Use string union types instead. Example: type Suit = 'HEARTS' | 'DIAMONDS' | 'SPADES' | 'CLUBS';",
        },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
    },
  },
  // 🟡 TODO: If you are NOT using TailwindCSS then it should be safe to uncomment this object and
  // remove the `languageOptions` property
  // 🟡 TODO: Does this work yet for TailwindCSS v4.0?
  // {
  //   files: ["**/*.css"],
  //   language: "css/css",
  //   languageOptions: {
  //     tolerant: true, // 🟡 This may be required due to custom syntax that TailwindCSS uses
  //     customSyntax: tailwindSyntax, // 🟡 This has not been updated yet for TailwindCSS v4.0
  //   },
  //   extends: [css.configs.recommended],
  // },
  {
    files: [eslintTargets.json],
    ignores: ["package-lock.json"],
    language: "json/json",
    extends: [json.configs.recommended],
  },
  {
    files: [eslintTargets.markdown],
    extends: [markdown.configs.recommended],
    language: "markdown/gfm", // 🟡 Optional, include this property if using Github-flavored markdown
    rules: {
      "markdown/no-missing-label-refs": "off", // 🟡 Optional, this rule doesn't work with Github-flavored markdown alerts
    },
  },
]);
