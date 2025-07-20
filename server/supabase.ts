import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

// Configuration for different environments
export function createDatabase(connectionString: string) {
  const sql = postgres(connectionString);
  return drizzle(sql, { schema });
}

// Development database (current PostgreSQL)
export function createDevDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set for development database");
  }
  return createDatabase(process.env.DATABASE_URL);
}

// Production database (Supabase)
export function createProdDatabase() {
  // Use hardcoded connection string (same as frontend does)
  const supabaseUrl = process.env.SUPABASE_DATABASE_URL || 
    "postgresql://postgres.gswdmdygbytmqkacwngm:4DmE1dxWZW9lqPYq@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
  
  if (!supabaseUrl) {
    throw new Error("SUPABASE_DATABASE_URL must be set for production database");
  }
  return createDatabase(supabaseUrl);
}

// Get the appropriate database based on environment
export function getDatabase() {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
  
  if (isProduction) {
    return createProdDatabase();
  } else {
    return createDevDatabase();
  }
}