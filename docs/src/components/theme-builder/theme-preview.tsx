import { MantineProvider } from "@mantine/core";

import { buildPreviewTheme, type ThemeConfig } from "@/lib/theme-builder";

import { PreviewGallery } from "./preview-gallery";

import classes from "./theme-preview.module.css";

/**
 * Renders the component gallery under the theme currently being built.
 *
 * @remarks
 * The nested provider is configured so it colours only this subtree:
 * - `cssVariablesSelector` scopes the emitted `<style>` to the wrapper. Mantine writes the
 *   scheme-specific block as `<selector>[data-mantine-color-scheme="..."]`, so the wrapper
 *   has to carry both attributes itself.
 * - `getRootElement` returns nothing so this provider doesn't stamp a colour scheme onto
 *   `<html>` and fight the root provider.
 * - Global classes and variable de-duplication are off: the former would emit a second copy
 *   of the breakpoint stylesheet, the latter only applies to `:root`/`:host` selectors.
 */
export function ThemePreview({ config }: { config: ThemeConfig }) {
  return (
    <MantineProvider
      theme={buildPreviewTheme(config)}
      cssVariablesSelector="[data-theme-preview]"
      deduplicateCssVariables={false}
      withGlobalClasses={false}
      getRootElement={() => undefined}
      forceColorScheme="light"
    >
      <div
        data-theme-preview
        data-mantine-color-scheme="light"
        className={classes.surface}
        id="preview"
      >
        <PreviewGallery />
      </div>
    </MantineProvider>
  );
}
