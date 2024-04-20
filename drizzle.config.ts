import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!, // TODO: figure out types for .env
  },
  out: './drizzle',
  verbose: true,
  strict: true,
} satisfies Config;
