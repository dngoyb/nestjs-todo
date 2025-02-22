// drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Optional if you want to see SQL statements in console during migration
  verbose: true,
  // Always confirm migrations
  strict: true,
} satisfies Config;
