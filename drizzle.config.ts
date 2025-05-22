import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit configuration file
 *
 * Docs: https://orm.drizzle.team/docs/drizzle-config-file
 */
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
