import { z } from "zod";

export const addonFrontmatterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type AddonFrontmatter = z.infer<typeof addonFrontmatterSchema>;

export type Addon = AddonFrontmatter & {
  /** The addon's filename without its extension, used as the URL slug. */
  slug: string;
};

export type AddonWithContent = Addon & {
  /** The raw markdown source, frontmatter included. */
  content: string;
};
