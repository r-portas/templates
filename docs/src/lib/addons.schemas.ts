import { z } from "zod";

export const addonFrontmatterSchema = z.object({
  description: z.string().min(1),
});

export type AddonFrontmatter = z.infer<typeof addonFrontmatterSchema>;
