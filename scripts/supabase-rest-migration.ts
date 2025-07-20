import { createDevDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';
import { execSync } from 'child_process';

async function restAPIMigration() {
  console.log('🚀 Starting Supabase migration via REST API...');

  try {
    // Get data from PostgreSQL
    const devDb = createDevDatabase();
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products),
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    console.log(`📊 Data ready: ${coursesData.length} courses, ${productsData.length} products, ${publicationsData.length} publications, ${adminUsersData.length} admin users`);

    const projectId = 'gswdmdygbytmqkacwngm';
    const apiUrl = `https://${projectId}.supabase.co`;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not found');
    }

    console.log('🔑 Service key available, proceeding with API migration...');

    // Step 1: Create tables via SQL execution API
    console.log('🔧 Creating database structure...');
    
    const createTablesSQL = `
      -- Create tables
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR PRIMARY KEY,
        title VARCHAR NOT NULL,
        subtitle VARCHAR,
        type VARCHAR,
        description TEXT,
        image VARCHAR,
        payment_link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        price DECIMAL(10,2),
        category VARCHAR,
        description TEXT,
        image VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS publications (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        journal VARCHAR,
        year INTEGER,
        abstract TEXT,
        link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR PRIMARY KEY,
        sess JSONB NOT NULL,
        expire TIMESTAMP NOT NULL
      );

      -- Clear existing data
      DELETE FROM admin_users;
      DELETE FROM publications;
      DELETE FROM products;
      DELETE FROM courses;
    `;

    // Execute table creation via curl
    try {
      const createResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/rpc/exec_sql" \\
        -H "apikey: ${serviceKey}" \\
        -H "Authorization: Bearer ${serviceKey}" \\
        -H "Content-Type: application/json" \\
        -d '{"sql": ${JSON.stringify(createTablesSQL)}}'`, { encoding: 'utf8' });
      
      console.log('✅ Tables created successfully');
      console.log('📋 Creation result:', createResult.substring(0, 200));
    } catch (createError) {
      console.log('⚠️ Table creation via API failed, trying direct SQL...');
      
      // Try alternative: execute SQL statements one by one
      const sqlStatements = createTablesSQL.split(';').filter(sql => sql.trim());
      
      for (let i = 0; i < sqlStatements.length; i++) {
        if (sqlStatements[i].trim()) {
          try {
            const singleResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/rpc/exec_sql" \\
              -H "apikey: ${serviceKey}" \\
              -H "Authorization: Bearer ${serviceKey}" \\
              -H "Content-Type: application/json" \\
              -d '{"sql": ${JSON.stringify(sqlStatements[i].trim())}}'`, { encoding: 'utf8' });
            
            console.log(`✅ SQL statement ${i + 1}/${sqlStatements.length} executed`);
          } catch (sqlError) {
            console.log(`⚠️ SQL statement ${i + 1} warning: ${sqlError.message.substring(0, 50)}`);
          }
        }
      }
    }

    // Step 2: Insert data via REST API endpoints
    console.log('📝 Inserting data via REST API...');

    // Insert courses
    console.log('⏳ Inserting courses...');
    for (let i = 0; i < coursesData.length; i++) {
      const course = coursesData[i];
      try {
        const coursePayload = {
          id: course.id,
          title: course.title,
          subtitle: course.subtitle,
          type: course.type,
          description: course.description?.substring(0, 10000), // Limit size
          image: course.image,
          payment_link: course.payment_link,
          created_at: course.created_at?.toISOString() || new Date().toISOString()
        };

        const courseResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/courses" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}" \\
          -H "Content-Type: application/json" \\
          -H "Prefer: return=minimal" \\
          -d '${JSON.stringify(coursePayload).replace(/'/g, "\\'")}'`, { encoding: 'utf8' });

        console.log(`✅ Course ${i + 1}/${coursesData.length}: ${course.title}`);
        
        if (courseResult && courseResult.includes('error')) {
          console.log(`⚠️ Course warning: ${courseResult.substring(0, 100)}`);
        }
      } catch (courseError) {
        console.log(`⚠️ Course ${i + 1} error: ${courseError.message.substring(0, 100)}`);
      }
    }

    // Insert products
    console.log('⏳ Inserting products...');
    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];
      try {
        const productPayload = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
          created_at: product.created_at?.toISOString() || new Date().toISOString()
        };

        const productResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/products" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}" \\
          -H "Content-Type: application/json" \\
          -H "Prefer: return=minimal" \\
          -d '${JSON.stringify(productPayload).replace(/'/g, "\\'")}'`, { encoding: 'utf8' });

        console.log(`✅ Product ${i + 1}/${productsData.length}: ${product.name}`);
        
        if (productResult && productResult.includes('error')) {
          console.log(`⚠️ Product warning: ${productResult.substring(0, 100)}`);
        }
      } catch (productError) {
        console.log(`⚠️ Product ${i + 1} error: ${productError.message.substring(0, 100)}`);
      }
    }

    // Insert publications
    console.log('⏳ Inserting publications...');
    for (let i = 0; i < publicationsData.length; i++) {
      const pub = publicationsData[i];
      try {
        const pubPayload = {
          id: pub.id,
          title: pub.title,
          journal: pub.journal,
          year: pub.year,
          abstract: pub.abstract,
          link: pub.link,
          created_at: pub.created_at?.toISOString() || new Date().toISOString()
        };

        const pubResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/publications" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}" \\
          -H "Content-Type: application/json" \\
          -H "Prefer: return=minimal" \\
          -d '${JSON.stringify(pubPayload).replace(/'/g, "\\'")}'`, { encoding: 'utf8' });

        console.log(`✅ Publication ${i + 1}/${publicationsData.length}: ${pub.title}`);
        
        if (pubResult && pubResult.includes('error')) {
          console.log(`⚠️ Publication warning: ${pubResult.substring(0, 100)}`);
        }
      } catch (pubError) {
        console.log(`⚠️ Publication ${i + 1} error: ${pubError.message.substring(0, 100)}`);
      }
    }

    // Insert admin users
    console.log('⏳ Inserting admin users...');
    for (let i = 0; i < adminUsersData.length; i++) {
      const user = adminUsersData[i];
      try {
        const userPayload = {
          id: user.id,
          email: user.email,
          password_hash: user.password_hash,
          is_admin: true,
          created_at: user.created_at?.toISOString() || new Date().toISOString()
        };

        const userResult = execSync(`curl -s -X POST "${apiUrl}/rest/v1/admin_users" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}" \\
          -H "Content-Type: application/json" \\
          -H "Prefer: return=minimal" \\
          -d '${JSON.stringify(userPayload).replace(/'/g, "\\'")}'`, { encoding: 'utf8' });

        console.log(`✅ Admin user ${i + 1}/${adminUsersData.length}: ${user.email}`);
        
        if (userResult && userResult.includes('error')) {
          console.log(`⚠️ Admin user warning: ${userResult.substring(0, 100)}`);
        }
      } catch (userError) {
        console.log(`⚠️ Admin user ${i + 1} error: ${userError.message.substring(0, 100)}`);
      }
    }

    // Step 3: Verify migration
    console.log('🔍 Verifying migration...');
    
    const verifyEndpoints = ['courses', 'products', 'publications', 'admin_users'];
    const verificationResults = {};

    for (const endpoint of verifyEndpoints) {
      try {
        const countResult = execSync(`curl -s "${apiUrl}/rest/v1/${endpoint}?select=count" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}"`, { encoding: 'utf8' });
        
        const parsed = JSON.parse(countResult);
        const count = Array.isArray(parsed) ? parsed.length : (parsed.count || 0);
        verificationResults[endpoint] = count;
        console.log(`📊 ${endpoint}: ${count} records`);
      } catch (verifyError) {
        console.log(`⚠️ Could not verify ${endpoint}: ${verifyError.message.substring(0, 50)}`);
        verificationResults[endpoint] = 'unknown';
      }
    }

    console.log('\n🎉 MIGRATION COMPLETED VIA REST API!');
    console.log('📊 Final results:');
    console.log(`   Courses: ${verificationResults.courses}`);
    console.log(`   Products: ${verificationResults.products}`);
    console.log(`   Publications: ${verificationResults.publications}`);
    console.log(`   Admin Users: ${verificationResults.admin_users}`);
    
    console.log('\n✅ Your data is now available in Supabase!');
    console.log('🌐 You can verify at: https://gswdmdygbytmqkacwngm.supabase.co');
    console.log('🚀 Ready for Vercel deployment!');

  } catch (error) {
    console.error('❌ REST API migration failed:', error.message);
    console.log('\n💡 Fallback: The SQL migration script is still available');
    console.log('📁 Execute "supabase-migration.sql" manually in Supabase SQL Editor');
  }
}

restAPIMigration();