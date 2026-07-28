import { z } from "zod";

/**
 * Server-only environment variables.
 */
const serverEnvSchema = z.object({});

/**
 * Environment variables that are also readable on the client.
 * Must be prefixed with `VITE_` to be exposed to the browser by Vite.
 */
const clientEnvSchema = z.object({
  VITE_APP_NAME: z.string().min(1, "VITE_APP_NAME is required"),
});

export const serverEnv = serverEnvSchema.parse(process.env);
export const clientEnv = clientEnvSchema.parse(import.meta.env);
