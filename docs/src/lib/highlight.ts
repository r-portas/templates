import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { createThemeCss } from "@tanstack/highlight/theme";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";

const highlighter = createHighlighter({
  languages: [json, shell, tsx, ts, css],
});

export const highlightCss = createThemeCss({
  dark: githubDarkTheme,
  darkSelector: ":root",
});

export const highlightMarkdownCode = createTanStackMarkdownHighlighter(highlighter);
