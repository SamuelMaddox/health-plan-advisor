import { eslintTargetGlobs } from "./lint-targets.js";

const prettierSupportedFiles =
  "js,jsx,cjs,mjs,cts,mts,json5,jsonc,markdown,mdx,yaml,yml,html,htm,css,scss,less,graphql,gql,vue,svelte,toml";

const eslintAndPrettierTasks = Object.fromEntries(
  eslintTargetGlobs.map((glob) => [glob, "eslint --fix"]),
);

export default {
  ...eslintAndPrettierTasks,
  [`*.{${prettierSupportedFiles}}*`]: ["prettier --write"],
};
