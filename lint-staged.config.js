const prettierSupportedFiles =
  "js,jsx,ts,tsx,cjs,mjs,cts,mts,json,json5,jsonc,md,markdown,mdx,yaml,yml,html,htm,css,scss,less,graphql,gql,vue,svelte,toml";
export default {
  [`*.{${prettierSupportedFiles}}*`]: ["eslint --fix", "prettier --write"],
};
