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
  // Use multiple connection string attempts for Supabase
  const possibleUrls = [
    process.env.SUPABASE_DATABASE_URL,
    "postgresql://postgres.gswdmdygbytmqkacwngm:4DmE1dxWZW9lqPYq@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
    "postgresql://postgres:4DmE1dxWZW9lqPYq@db.gswdmdygbytmqkacwngm.supabase.co:5432/postgres"
  ].filter(Boolean);

  const connectionString = possibleUrls[0];
  if (!connectionString) {
    throw new Error("No Supabase connection string available");
  }

  console.log('Attempting Supabase connection with:', connectionString.substring(0, 40) + '...');
  
  try {
    return createDatabase(connectionString);
  } catch (error) {
    console.error('Supabase connection failed:', error.message);
    throw error;
  }
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