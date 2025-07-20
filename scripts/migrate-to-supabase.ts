import { createDevDatabase, createProdDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';
import postgres from 'postgres';

async function migrateData() {
  console.log('🔄 Starting data migration from PostgreSQL to Supabase...');

  try {
    // Connect to both databases
    const devDb = createDevDatabase();
    
    console.log('🔗 Attempting Supabase connection with different configurations...');
    
    // Try multiple connection configurations
    const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
    if (!supabaseUrl) {
      throw new Error('SUPABASE_DATABASE_URL not found');
    }
    
    // Configuration 1: Standard connection
    let prodDb;
    try {
      console.log('   Trying standard connection...');
      prodDb = createProdDatabase();
      await prodDb`SELECT 1`; // Test connection
      console.log('✅ Standard connection successful');
    } catch (error1) {
      console.log('❌ Standard connection failed:', error1.message);
      
      // Configuration 2: With SSL disabled
      try {
        console.log('   Trying connection with SSL disabled...');
        const sql = postgres(supabaseUrl, {
          ssl: false,
          idle_timeout: 20,
          max_lifetime: 60 * 30,
        });
        await sql`SELECT 1`;
        prodDb = sql;
        console.log('✅ SSL disabled connection successful');
      } catch (error2) {
        console.log('❌ SSL disabled failed:', error2.message);
        
        // Configuration 3: With custom SSL settings
        try {
          console.log('   Trying connection with custom SSL...');
          const sql = postgres(supabaseUrl, {
            ssl: { rejectUnauthorized: false },
            idle_timeout: 20,
            max_lifetime: 60 * 30,
          });
          await sql`SELECT 1`;
          prodDb = sql;
          console.log('✅ Custom SSL connection successful');
        } catch (error3) {
          console.log('❌ Custom SSL failed:', error3.message);
          
          // Configuration 4: Alternative URL format
          try {
            console.log('   Trying alternative URL format...');
            // Sometimes Supabase URLs need different ports or formats
            const altUrl = supabaseUrl.replace(':5432', ':6543').replace('db.', 'aws-0-us-east-1.pooler.');
            console.log(`   Alt URL pattern: ${altUrl.substring(0, 50)}...`);
            const sql = postgres(altUrl, {
              ssl: { rejectUnauthorized: false },
              idle_timeout: 30,
              max_lifetime: 60 * 30,
            });
            await sql`SELECT 1`;
            prodDb = sql;
            console.log('✅ Alternative URL connection successful');
          } catch (error4) {
            console.log('❌ Alternative URL failed:', error4.message);
            
            // Configuration 5: Pooler connection
            try {
              console.log('   Trying pooler connection...');
              const poolerUrl = supabaseUrl.replace('db.', 'aws-0-us-east-1.pooler.');
              console.log(`   Pooler URL pattern: ${poolerUrl.substring(0, 50)}...`);
              const sql = postgres(poolerUrl, {
                ssl: true,
                idle_timeout: 30,
                max_lifetime: 60 * 30,
              });
              await sql`SELECT 1`;
              prodDb = sql;
              console.log('✅ Pooler connection successful');
            } catch (error5) {
              console.log('❌ Pooler connection failed:', error5.message);
              throw new Error(`All connection attempts failed. Errors: Standard(${error1.message}), SSL-disabled(${error2.message}), Custom-SSL(${error3.message}), Alt-URL(${error4.message}), Pooler(${error5.message})`);
            }
          }
        }
      }
    }

    console.log('📊 Fetching data from development database...');

    // Fetch all data from development database
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products),
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    console.log(`Found: ${coursesData.length} courses, ${productsData.length} products, ${publicationsData.length} publications, ${adminUsersData.length} admin users`);

    // Clear existing data in production (optional)
    console.log('🧹 Clearing existing data in Supabase...');
    await Promise.all([
      prodDb.delete(courses),
      prodDb.delete(products),
      prodDb.delete(publications),
      prodDb.delete(adminUsers)
    ]);

    // Insert data into production database
    console.log('📥 Inserting data into Supabase...');

    if (coursesData.length > 0) {
      await prodDb.insert(courses).values(coursesData);
      console.log(`✅ Migrated ${coursesData.length} courses`);
    }

    if (productsData.length > 0) {
      await prodDb.insert(products).values(productsData);
      console.log(`✅ Migrated ${productsData.length} products`);
    }

    if (publicationsData.length > 0) {
      await prodDb.insert(publications).values(publicationsData);
      console.log(`✅ Migrated ${publicationsData.length} publications`);
    }

    if (adminUsersData.length > 0) {
      await prodDb.insert(adminUsers).values(adminUsersData);
      console.log(`✅ Migrated ${adminUsersData.length} admin users`);
    }

    console.log('🎉 Migration completed successfully!');

    // Verify migration
    console.log('🔍 Verifying migration...');
    const [verifyCoursesData, verifyProductsData, verifyPublicationsData] = await Promise.all([
      prodDb.select().from(courses),
      prodDb.select().from(products),
      prodDb.select().from(publications)
    ]);

    console.log(`Verified: ${verifyCoursesData.length} courses, ${verifyProductsData.length} products, ${verifyPublicationsData.length} publications in Supabase`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData();
}

export { migrateData };