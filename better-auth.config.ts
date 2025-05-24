/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { betterAuthOptions } from './src/lib/better-auth/options';

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env;

if (!DATABASE_URL || !BETTER_AUTH_URL || !BETTER_AUTH_SECRET) {
  const missing = [
    !DATABASE_URL && 'DATABASE_URL',
    !BETTER_AUTH_URL && 'BETTER_AUTH_URL',
    !BETTER_AUTH_SECRET && 'BETTER_AUTH_SECRET',
  ]
    .filter(Boolean)
    .join(', ');

  throw new Error(`Missing required environment variable(s): ${missing}`);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});
