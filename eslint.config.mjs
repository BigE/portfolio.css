import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["js/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["js/*.{ts,mts,cts}"], plugins: { js }, extends: [ tseslint.configs.recommended ] },
  { files: ["scss/*.s?css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
