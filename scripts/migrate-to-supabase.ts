import { createDevDatabase, createProdDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';

async function migrateData() {
  console.log('🔄 Starting data migration from PostgreSQL to Supabase...');

  try {
    // Connect to both databases
    const devDb = createDevDatabase();
    const prodDb = createProdDatabase();

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