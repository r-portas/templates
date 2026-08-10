/** Addon filenames are resolved against the addons directory, so keep them to characters that are safe in a path segment, and require the markdown extension. */
const ADDON_FILENAME_PATTERN = /^[a-z0-9-]+\.md$/;

/**
 * Whether a filename is safe to resolve against the addons directory.
 *
 * @param filename - The filename to validate.
 *
 * @remarks
 * Excludes filenames starting with `_` (e.g. `_template.md`), so authoring templates
 * placed alongside real addons aren't listed or served.
 */
export function isValidAddonFilename(filename: string) {
  return ADDON_FILENAME_PATTERN.test(filename);
}

/**
 * The site-relative path the raw markdown for an addon is served from.
 */
export function addonPath(filename: string) {
  return `/addons/${filename}`;
}
