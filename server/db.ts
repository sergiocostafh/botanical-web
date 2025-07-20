import { getDatabase } from './supabase';

// Use environment-appropriate database
export const db = getDatabase();