import { z } from "zod";

export const addonFrontmatterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type AddonFrontmatter = z.infer<typeof addonFrontmatterSchema>;

export type Addon = AddonFrontmatter & {
  /** The addon's markdown filename, e.g. `drizzle.md`. */
  filename: string;
};
