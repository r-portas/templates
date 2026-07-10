/**
 * Static lineage graph for the templates. Mirrors the build-order documented
 * in the root CLAUDE.md — kept here since it isn't derivable from package.json.
 */
export const LINEAGE: Record<string, { parent: string | null }> = {
  react: { parent: null },
  tss: { parent: "react" },
  "tss-tw": { parent: "tss" },
  "tss-mantine": { parent: "tss" },
  "tss-shadcn": { parent: "tss-tw" },
};

/** Templates that directly extend the given template, per the lineage graph. */
export function childTemplates(templateName: string) {
  return Object.entries(LINEAGE)
    .filter(([, { parent }]) => parent === templateName)
    .map(([name]) => name);
}
