import { z } from "zod";

export const packageJsonSchema = z.object({
  name: z.string(),
  description: z.string(),
  dependencies: z.record(z.string(), z.string()),
  devDependencies: z.record(z.string(), z.string()),
});

export type PackageJson = z.infer<typeof packageJsonSchema>;
