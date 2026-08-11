/** Addon filenames are resolved against the addons directory, so keep them to characters that are safe in a path segment, and require the markdown extension. */
const ADDON_FILENAME_PATTERN = /^[a-z0-9-]+\.md$/;

/** The authoring template for drafting new addons. Servable, but excluded from the public listing. */
const TEMPLATE_FILENAME = "_template.md";

/** The slug `_template.md` is served under, e.g. for building its `/addons/$slug.md` URL. */
export const TEMPLATE_ADDON_SLUG = "_template";

/**
 * Whether a filename is safe to resolve against the addons directory.
 *
 * @param filename - The filename to validate.
 *
 * @remarks
 * Includes the authoring template (`_template.md`) alongside real addons, since both are
 * served through the same `/addons/$slug.md` route. Use {@link isListableAddonFilename}
 * to exclude the template from the public addon listing.
 */
export function isValidAddonFilename(filename: string) {
  return filename === TEMPLATE_FILENAME || ADDON_FILENAME_PATTERN.test(filename);
}

/**
 * Whether a filename should appear in the public addon listing.
 *
 * @param filename - The filename to validate.
 *
 * @remarks
 * Excludes the authoring template (`_template.md`), which is servable but isn't a real addon.
 */
export function isListableAddonFilename(filename: string) {
  return filename !== TEMPLATE_FILENAME && isValidAddonFilename(filename);
}

/**
 * The site-relative path the raw markdown for an addon is served from.
 *
 * @param slug - The addon's slug, excluding the file extension, e.g. `docker`.
 */
export function addonPath(slug: string) {
  return `/addons/${slug}.md`;
}

/**
 * The absolute URL an addon's raw markdown is served from, for handing to a coding agent
 * that isn't running in this browser session.
 *
 * @param slug - The addon's slug, excluding the file extension, e.g. `docker`.
 *
 * @remarks
 * Client-only: resolves against `window.location.origin`.
 */
export function getAddonUrl(slug: string) {
  return new URL(addonPath(slug), window.location.origin).toString();
}
