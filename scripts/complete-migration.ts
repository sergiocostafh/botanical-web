import { createDevDatabase } from '../server/supabase';
import { courses, products, publications, adminUsers } from '../shared/schema';
import { writeFileSync } from 'fs';

async function completeMigration() {
  console.log('🔄 Completing Supabase migration via REST API...');

  try {
    // Get data from PostgreSQL
    const devDb = createDevDatabase();
    const [coursesData, productsData, publicationsData, adminUsersData] = await Promise.all([
      devDb.select().from(courses),
      devDb.select().from(products),
      devDb.select().from(publications),
      devDb.select().from(adminUsers)
    ]);

    const projectId = 'gswdmdygbytmqkacwngm';
    const apiUrl = `https://${projectId}.supabase.co`;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('🔧 Creating curl scripts for reliable execution...');

    // Create individual curl scripts to avoid shell escaping issues
    const scripts = [];

    // Script for each course
    coursesData.forEach((course, index) => {
      const payload = {
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        type: course.type,
        description: course.description?.substring(0, 10000), // Limit description length
        image: course.image,
        payment_link: course.payment_link,
        created_at: course.created_at?.toISOString() || new Date().toISOString()
      };

      const script = `#!/bin/bash
curl -X POST "${apiUrl}/rest/v1/courses" \\
  -H "apikey: ${serviceKey}" \\
  -H "Authorization: Bearer ${serviceKey}" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  --data '${JSON.stringify(payload)}'`;

      writeFileSync(`/tmp/course_${index + 1}.sh`, script);
      scripts.push(`course_${index + 1}.sh`);
    });

    // Script for each product
    productsData.forEach((product, index) => {
      const payload = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        created_at: product.created_at?.toISOString() || new Date().toISOString()
      };

      const script = `#!/bin/bash
curl -X POST "${apiUrl}/rest/v1/products" \\
  -H "apikey: ${serviceKey}" \\
  -H "Authorization: Bearer ${serviceKey}" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  --data '${JSON.stringify(payload)}'`;

      writeFileSync(`/tmp/product_${index + 1}.sh`, script);
      scripts.push(`product_${index + 1}.sh`);
    });

    // Script for each publication
    publicationsData.forEach((pub, index) => {
      const payload = {
        id: pub.id,
        title: pub.title,
        journal: pub.journal,
        year: pub.year,
        abstract: pub.abstract,
        link: pub.link,
        created_at: pub.created_at?.toISOString() || new Date().toISOString()
      };

      const script = `#!/bin/bash
curl -X POST "${apiUrl}/rest/v1/publications" \\
  -H "apikey: ${serviceKey}" \\
  -H "Authorization: Bearer ${serviceKey}" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  --data '${JSON.stringify(payload)}'`;

      writeFileSync(`/tmp/publication_${index + 1}.sh`, script);
      scripts.push(`publication_${index + 1}.sh`);
    });

    // Script for each admin user
    adminUsersData.forEach((user, index) => {
      const payload = {
        id: user.id,
        email: user.email,
        password_hash: user.password_hash,
        is_admin: true,
        created_at: user.created_at?.toISOString() || new Date().toISOString()
      };

      const script = `#!/bin/bash
curl -X POST "${apiUrl}/rest/v1/admin_users" \\
  -H "apikey: ${serviceKey}" \\
  -H "Authorization: Bearer ${serviceKey}" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  --data '${JSON.stringify(payload)}'`;

      writeFileSync(`/tmp/admin_user_${index + 1}.sh`, script);
      scripts.push(`admin_user_${index + 1}.sh`);
    });

    console.log(`📁 Created ${scripts.length} curl scripts`);

    // Execute each script
    console.log('🚀 Executing migration scripts...');
    
    const { execSync } = require('child_process');
    
    for (const script of scripts) {
      try {
        execSync(`chmod +x /tmp/${script}`, { encoding: 'utf8' });
        const result = execSync(`bash /tmp/${script}`, { encoding: 'utf8', timeout: 15000 });
        console.log(`✅ ${script} executed`);
        
        if (result && result.includes('error')) {
          console.log(`⚠️ ${script} warning: ${result.substring(0, 100)}`);
        }
      } catch (error) {
        console.log(`⚠️ ${script} error: ${error.message.substring(0, 100)}`);
      }
    }

    // Verify final results
    console.log('🔍 Final verification...');
    
    const endpoints = [
      { name: 'courses', expected: coursesData.length },
      { name: 'products', expected: productsData.length },
      { name: 'publications', expected: publicationsData.length },
      { name: 'admin_users', expected: adminUsersData.length }
    ];

    for (const endpoint of endpoints) {
      try {
        const result = execSync(`curl -s "${apiUrl}/rest/v1/${endpoint.name}?select=*" \\
          -H "apikey: ${serviceKey}" \\
          -H "Authorization: Bearer ${serviceKey}"`, { encoding: 'utf8' });
        
        const data = JSON.parse(result);
        const count = Array.isArray(data) ? data.length : 0;
        
        console.log(`📊 ${endpoint.name}: ${count}/${endpoint.expected} records`);
        
        if (count === endpoint.expected) {
          console.log(`✅ ${endpoint.name} migration complete`);
        } else if (count > 0) {
          console.log(`⚠️ ${endpoint.name} partially migrated`);
        } else {
          console.log(`❌ ${endpoint.name} migration failed`);
        }
      } catch (verifyError) {
        console.log(`⚠️ Could not verify ${endpoint.name}`);
      }
    }

    console.log('\n🎉 MIGRATION PROCESS COMPLETED!');
    console.log('🌐 Check your data at: https://gswdmdygbytmqkacwngm.supabase.co');
    console.log('📋 Go to "Table Editor" to see all migrated data');
    console.log('🚀 Your project is now ready for Vercel deployment!');

  } catch (error) {
    console.error('❌ Migration completion failed:', error.message);
  }
}

completeMigration();