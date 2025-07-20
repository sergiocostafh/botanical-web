// Try migrating via Supabase REST API instead of direct PostgreSQL connection
import { createDevDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';

async function migrateViaAPI() {
  console.log('🔄 Starting data migration via Supabase REST API...');

  try {
    // Get data from development database
    const devDb = createDevDatabase();
    
    console.log('📊 Fetching data from development database...');
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products),
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    console.log(`Found: ${coursesData.length} courses, ${productsData.length} products, ${publicationsData.length} publications, ${adminUsersData.length} admin users`);

    // Extract project details from URL
    const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
    if (!supabaseUrl) {
      throw new Error('SUPABASE_DATABASE_URL not found');
    }

    // Extract project ID from URL like: db.gswdmdygbytmqkacwngm.supabase.co
    const projectMatch = supabaseUrl.match(/db\.([^.]+)\.supabase\.co/);
    if (!projectMatch) {
      throw new Error('Could not extract project ID from Supabase URL');
    }
    
    const projectId = projectMatch[1];
    const apiUrl = `https://${projectId}.supabase.co`;
    
    console.log(`🌐 Using Supabase project: ${projectId}`);
    console.log(`📡 API URL: ${apiUrl}`);

    // We would need the Supabase service role key to use the API
    // For now, let's try a different approach - using the connection pooler
    
    console.log('🔄 Trying Supabase connection pooler...');
    
    // Try different connection string formats that Supabase supports
    const poolerUrl = supabaseUrl.replace('db.', 'aws-0-us-east-1.pooler.');
    console.log(`🔗 Pooler URL: ${poolerUrl.substring(0, 50)}...`);
    
    // Let's try a manual psql approach
    console.log('🔧 Trying manual psql execution...');
    
    // Create SQL statements
    const insertStatements = [
      '-- Clearing existing data',
      'DELETE FROM admin_users;',
      'DELETE FROM publications;', 
      'DELETE FROM products;',
      'DELETE FROM courses;',
      '',
      '-- Inserting courses',
      ...coursesData.map(course => 
        `INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES (${formatValue(course.id)}, ${formatValue(course.title)}, ${formatValue(course.subtitle)}, ${formatValue(course.type)}, ${formatValue(course.description)}, ${formatValue(course.image)}, ${formatValue(course.payment_link)}, ${formatValue(course.created_at)});`
      ),
      '',
      '-- Inserting products',
      ...productsData.map(product => 
        `INSERT INTO products (id, name, price, category, description, image, created_at) VALUES (${formatValue(product.id)}, ${formatValue(product.name)}, ${product.price}, ${formatValue(product.category)}, ${formatValue(product.description)}, ${formatValue(product.image)}, ${formatValue(product.created_at)});`
      ),
      '',
      '-- Inserting publications',
      ...publicationsData.map(pub => 
        `INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (${pub.id}, ${formatValue(pub.title)}, ${formatValue(pub.journal)}, ${pub.year}, ${formatValue(pub.abstract)}, ${formatValue(pub.link)}, ${formatValue(pub.created_at)});`
      ),
      '',
      '-- Inserting admin users',
      ...adminUsersData.map(user => 
        `INSERT INTO admin_users (id, email, password_hash, is_admin, created_at) VALUES (${formatValue(user.id)}, ${formatValue(user.email)}, ${formatValue(user.password_hash)}, ${user.is_admin}, ${formatValue(user.created_at)});`
      )
    ];

    const sqlContent = insertStatements.join('\n');
    
    // Write to a temp file and try to execute via psql
    const fs = require('fs');
    fs.writeFileSync('/tmp/migration.sql', sqlContent);
    
    console.log('📄 SQL file created at /tmp/migration.sql');
    console.log('🚀 Attempting to execute via psql...');
    
    // Try to execute the SQL file
    const { execSync } = require('child_process');
    
    try {
      const result = execSync(`timeout 30 psql "${supabaseUrl}" -f /tmp/migration.sql`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log('✅ Migration executed successfully!');
      console.log('📊 Result:', result);
    } catch (psqlError) {
      console.log('❌ psql execution failed:', psqlError.message);
      
      // Try with the pooler URL
      try {
        console.log('🔄 Trying with pooler URL...');
        const poolerResult = execSync(`timeout 30 psql "${poolerUrl}" -f /tmp/migration.sql`, { 
          encoding: 'utf8',
          stdio: 'pipe'
        });
        console.log('✅ Pooler migration executed successfully!');
        console.log('📊 Result:', poolerResult);
      } catch (poolerError) {
        console.log('❌ Pooler execution also failed:', poolerError.message);
        
        console.log('\n💡 Manual migration required. Use the following steps:');
        console.log('1. Copy the content of /tmp/migration.sql');
        console.log('2. Go to your Supabase project dashboard');
        console.log('3. Open SQL Editor');
        console.log('4. Paste and execute the SQL statements');
        console.log('\nSQL file location: /tmp/migration.sql');
      }
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

function formatValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "''")}'`;
  }
  if (value instanceof Date) {
    return `'${value.toISOString()}'`;
  }
  return String(value);
}

migrateViaAPI();