import { z } from "zod";

export const packageJsonSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const fullPackageJsonSchema = packageJsonSchema.extend({
  dependencies: z.record(z.string(), z.string()),
  devDependencies: z.record(z.string(), z.string()),
});
