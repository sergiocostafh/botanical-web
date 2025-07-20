// Export current data to JSON for manual migration
import { createDevDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';
import { writeFileSync } from 'fs';

async function exportData() {
  console.log('📊 Exporting data from PostgreSQL...');

  try {
    const devDb = createDevDatabase();

    // Fetch all data
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products),
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    const exportData = {
      courses: coursesData,
      products: productsData,
      publications: publicationsData,
      adminUsers: adminUsersData,
      exportedAt: new Date().toISOString()
    };

    // Save to JSON file
    writeFileSync('database-export.json', JSON.stringify(exportData, null, 2));
    
    console.log(`✅ Data exported successfully!`);
    console.log(`📄 File: database-export.json`);
    console.log(`📊 Summary:`);
    console.log(`   - ${coursesData.length} courses`);
    console.log(`   - ${productsData.length} products`);
    console.log(`   - ${publicationsData.length} publications`);
    console.log(`   - ${adminUsersData.length} admin users`);

    // Also create SQL insert statements
    const sqlStatements = [
      '-- Database Export SQL Statements',
      '-- Generated on: ' + new Date().toISOString(),
      '',
      '-- Courses',
      ...coursesData.map(course => 
        `INSERT INTO courses (id, title, subtitle, type, description, image, payment_link, created_at) VALUES (${formatSqlValue(course.id)}, ${formatSqlValue(course.title)}, ${formatSqlValue(course.subtitle)}, ${formatSqlValue(course.type)}, ${formatSqlValue(course.description)}, ${formatSqlValue(course.image)}, ${formatSqlValue(course.payment_link)}, ${formatSqlValue(course.created_at)});`
      ),
      '',
      '-- Products',
      ...productsData.map(product => 
        `INSERT INTO products (id, name, price, category, description, image, created_at) VALUES (${formatSqlValue(product.id)}, ${formatSqlValue(product.name)}, ${product.price}, ${formatSqlValue(product.category)}, ${formatSqlValue(product.description)}, ${formatSqlValue(product.image)}, ${formatSqlValue(product.created_at)});`
      ),
      '',
      '-- Publications',
      ...publicationsData.map(pub => 
        `INSERT INTO publications (id, title, journal, year, abstract, link, created_at) VALUES (${pub.id}, ${formatSqlValue(pub.title)}, ${formatSqlValue(pub.journal)}, ${pub.year}, ${formatSqlValue(pub.abstract)}, ${formatSqlValue(pub.link)}, ${formatSqlValue(pub.created_at)});`
      ),
      '',
      '-- Admin Users',
      ...adminUsersData.map(user => 
        `INSERT INTO admin_users (id, email, password_hash, is_admin, created_at) VALUES (${formatSqlValue(user.id)}, ${formatSqlValue(user.email)}, ${formatSqlValue(user.password_hash)}, ${user.is_admin}, ${formatSqlValue(user.created_at)});`
      )
    ];

    writeFileSync('database-export.sql', sqlStatements.join('\n'));
    console.log(`📄 SQL file: database-export.sql`);

  } catch (error) {
    console.error('❌ Export failed:', error);
  }
}

function formatSqlValue(value: any): string {
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

exportData();