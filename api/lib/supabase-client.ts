// Supabase REST API client for Vercel functions
const SUPABASE_URL = "https://gswdmdygbytmqkacwngm.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzd2RtZHlnYnl0bXFrYWN3bmdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjQ0ODU4MSwiZXhwIjoyMDYyMDI0NTgxfQ.wW8nKyU4S4J1pKJjJHqw_QhGVJSJCJpKLQOsE6HLrQY";

export async function supabaseGet(table: string) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
      headers: {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${table}:`, error);
    throw error;
  }
}

export async function supabasePost(table: string, data: any) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${table}:`, error);
    throw error;
  }
}