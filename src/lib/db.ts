import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../shared/schema';

if (!process.env.SUPABASE_URL) {
  throw new Error(
    "SUPABASE_URL must be set. Please add your Supabase project URL.",
  );
}

if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_ANON_KEY must be set. Please add your Supabase anon key.",
  );
}

// Create Supabase client for auth and other features
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// For Drizzle with Supabase, we use the direct PostgreSQL connection string
// You can get this from your Supabase dashboard under Settings > Database
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Get your PostgreSQL connection string from Supabase dashboard > Settings > Database"
  );
}

// Create postgres connection for Drizzle
const client = postgres(databaseUrl);
export const db = drizzle(client, { schema });