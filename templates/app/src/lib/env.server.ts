import { z } from "zod";

/**
 * Server-only environment variables.
 */
const serverEnvSchema = z.object({
  TEST: z.string().min(1, "TEST is required"),
});

export default serverEnvSchema.parse(process.env);
