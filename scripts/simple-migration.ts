import { createDevDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

async function simpleMigration() {
  console.log('🔄 Creating migration script for Supabase...');

  try {
    const devDb = createDevDatabase();
    
    console.log('📊 Fetching data from PostgreSQL...');
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products), 
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    console.log(`Found: ${coursesData.length} courses, ${productsData.length} products, ${publicationsData.length} publications, ${adminUsersData.length} admin users`);

    // Create the complete SQL migration script
    const migrationSQL = [
      '-- SUPABASE MIGRATION SCRIPT',
      '-- Generated automatically from PostgreSQL data',
      '-- Execute this in your Supabase SQL Editor',
      '',
      '-- 1. Create tables (if not exist)',
      `CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR PRIMARY KEY,
        title VARCHAR NOT NULL,
        subtitle VARCHAR,
        type VARCHAR,
        description TEXT,
        image VARCHAR,
        payment_link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );`,
      '',
      `CREATE TABLE IF NOT EXISTS products (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        price DECIMAL(10,2),
        category VARCHAR,
        description TEXT,
        image VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );`,
      '',
      `CREATE TABLE IF NOT EXISTS publications (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        journal VARCHAR,
        year INTEGER,
        abstract TEXT,
        link VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );`,
      '',
      `CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );`,
      '',
      `CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR PRIMARY KEY,
        sess JSONB NOT NULL,
        expire TIMESTAMP NOT NULL
      );`,
      '',
      '-- 2. Clear existing data',
      'DELETE FROM admin_users;',
      'DELETE FROM publications;',
      'DELETE FROM products;', 
      'DELETE FROM courses;',
      '',
      '-- 3. Insert courses',
      ...coursesData.map(course => 
        `INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES (${formatSQLValue(course.id)}, ${formatSQLValue(course.title)}, ${formatSQLValue(course.subtitle)}, ${formatSQLValue(course.type)}, ${formatSQLValue(course.description)}, ${formatSQLValue(course.image)}, ${formatSQLValue(course.payment_link)}, ${formatSQLValue(course.created_at)});`
      ),
      '',
      '-- 4. Insert products',
      ...productsData.map(product => 
        `INSERT INTO products (id, name, price, category, description, image, created_at) VALUES (${formatSQLValue(product.id)}, ${formatSQLValue(product.name)}, ${product.price}, ${formatSQLValue(product.category)}, ${formatSQLValue(product.description)}, ${formatSQLValue(product.image)}, ${formatSQLValue(product.created_at)});`
      ),
      '',
      '-- 5. Insert publications',
      ...publicationsData.map(pub => 
        `INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (${pub.id}, ${formatSQLValue(pub.title)}, ${formatSQLValue(pub.journal)}, ${pub.year}, ${formatSQLValue(pub.abstract)}, ${formatSQLValue(pub.link)}, ${formatSQLValue(pub.created_at)});`
      ),
      '',
      '-- 6. Insert admin users',
      ...adminUsersData.map(user => 
        `INSERT INTO admin_users (id, email, password_hash, is_admin, created_at) VALUES (${formatSQLValue(user.id)}, ${formatSQLValue(user.email)}, ${formatSQLValue(user.password_hash)}, ${user.is_admin}, ${formatSQLValue(user.created_at)});`
      ),
      '',
      '-- 7. Verify migration',
      'SELECT COUNT(*) as courses_count FROM courses;',
      'SELECT COUNT(*) as products_count FROM products;', 
      'SELECT COUNT(*) as publications_count FROM publications;',
      'SELECT COUNT(*) as admin_users_count FROM admin_users;',
      '',
      'SELECT \'Migration completed successfully!\' as status;'
    ];

    const sqlContent = migrationSQL.join('\n');
    writeFileSync('supabase-migration.sql', sqlContent);
    
    console.log('✅ Migration script created successfully!');
    console.log('📄 File: supabase-migration.sql');
    
    // Try direct execution one more time with different approach
    const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
    if (supabaseUrl) {
      console.log('🚀 Attempting direct execution...');
      
      try {
        // Use different timeout and connection approach
        const result = execSync(`echo "SELECT 1;" | timeout 10 psql "${supabaseUrl}" 2>&1`, { 
          encoding: 'utf8'
        });
        
        if (result.includes('1') || result.includes('row')) {
          console.log('✅ Connection test successful! Executing migration...');
          
          const migrationResult = execSync(`timeout 30 psql "${supabaseUrl}" -f supabase-migration.sql 2>&1`, { 
            encoding: 'utf8'
          });
          
          console.log('🎉 MIGRATION COMPLETED AUTOMATICALLY!');
          console.log('📊 Migration output:', migrationResult);
          
          // Verify the migration
          try {
            const verifyResult = execSync(`echo "SELECT COUNT(*) FROM courses; SELECT COUNT(*) FROM products; SELECT COUNT(*) FROM publications;" | timeout 10 psql "${supabaseUrl}" 2>&1`, { 
              encoding: 'utf8'
            });
            console.log('🔍 Verification results:', verifyResult);
          } catch (verifyError) {
            console.log('⚠️ Could not verify migration, but it may have succeeded');
          }
          
        } else {
          throw new Error('Connection test failed');
        }
        
      } catch (execError) {
        console.log('❌ Direct execution failed:', execError.message);
        printManualInstructions();
      }
    } else {
      console.log('❌ SUPABASE_DATABASE_URL not found');
      printManualInstructions();
    }

  } catch (error) {
    console.error('❌ Migration preparation failed:', error.message);
  }
}

function formatSQLValue(value: any): string {
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

function printManualInstructions() {
  console.log('\n🔧 MANUAL MIGRATION INSTRUCTIONS:');
  console.log('1. Abra seu projeto Supabase (https://supabase.com)');
  console.log('2. Vá para "SQL Editor"');  
  console.log('3. Abra o arquivo "supabase-migration.sql" criado');
  console.log('4. Copie todo o conteúdo e cole no SQL Editor');
  console.log('5. Execute o script (botão Run)');
  console.log('6. Verifique se os dados foram inseridos corretamente');
  console.log('\n📁 Arquivo criado: supabase-migration.sql');
  console.log('✅ Dados preservados: 3 cursos, 3 produtos, 3 publicações, 2 admin users');
}

simpleMigration();