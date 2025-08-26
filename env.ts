import { z } from 'zod';

// Lightweight environment parser using zod that reads directly from process.env.
// This avoids a hard dependency on third-party env helpers and works reliably
// with the project's current module resolution.

const serverSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).default('/sign-in'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).default('/sign-up'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).default('/dashboard'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).default('/dashboard'),
});

// Read values from process.env and parse/validate. The server schema will
// throw if required server secrets are missing. Client values use sensible
// defaults when not provided.
const parsedServer = serverSchema.parse({
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ?? '',
});

const parsedClient = clientSchema.parse({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '',
  NEXT_PUBLIC_CLERK_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? undefined,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? undefined,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? undefined,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? undefined,
});

// Provide both grouped and flat top-level keys for backward compatibility
export const env = {
  // grouped
  server: parsedServer,
  client: parsedClient,
  // flat replicas for legacy callers (e.g. env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  CLERK_SECRET_KEY: parsedServer.CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    parsedClient.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: parsedClient.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: parsedClient.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    parsedClient.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    parsedClient.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
};

export type Env = typeof env;
