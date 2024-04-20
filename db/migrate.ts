import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

config({ path: '.env' });

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
const db = drizzle(sql);

try {
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('db migration completed');
} catch (error) {
  console.error('db migration failed: ', error);
  process.exit(1);
}
