// Test script to verify Supabase connection
import postgres from 'postgres';

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
  if (!supabaseUrl) {
    console.error('❌ SUPABASE_DATABASE_URL not found in environment variables');
    return;
  }

  console.log(`📝 Connection URL pattern: ${supabaseUrl.substring(0, 30)}...`);

  try {
    console.log('⏳ Attempting to connect...');
    
    // Try with a longer timeout and SSL configuration
    const sql = postgres(supabaseUrl, {
      idle_timeout: 20,
      max_lifetime: 60 * 30,
      ssl: { rejectUnauthorized: false } // Sometimes needed for Supabase
    });

    console.log('🔗 Connection object created, testing query...');
    
    // Simple test query
    const result = await sql`SELECT 1 as test, current_timestamp as time`;
    console.log('✅ Connection successful!');
    console.log('📊 Test result:', result[0]);

    // Test if our tables exist
    console.log('🔍 Checking if tables exist...');
    try {
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('📋 Tables found:', tables.map(t => t.table_name));
    } catch (tableError) {
      console.log('ℹ️ Tables not found or error checking tables:', tableError.message);
    }

    await sql.end();
    console.log('🎉 Connection test completed successfully!');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    // Try to provide helpful suggestions
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Suggestion: Check if the Supabase project URL is correct');
      console.log('💡 Suggestion: Verify that the project is active in Supabase dashboard');
    } else if (error.message.includes('authentication')) {
      console.log('💡 Suggestion: Check if the database password is correct');
    } else if (error.message.includes('timeout')) {
      console.log('💡 Suggestion: Try again in a few minutes - might be temporary network issue');
    }
  }
}

testConnection().catch(console.error);