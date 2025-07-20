import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createProdDatabase } from '../server/supabase';
import { courses, products, publications } from '../shared/schema';
import { or, ilike } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = createProdDatabase();
    const query = req.query.q as string;
    
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const searchTerm = `%${query.toLowerCase()}%`;
    const results = [];

    // Search courses
    const coursesData = await db.select().from(courses)
      .where(
        or(
          ilike(courses.title, searchTerm),
          ilike(courses.subtitle, searchTerm),
          ilike(courses.description, searchTerm)
        )
      );
    
    results.push(...coursesData.map(course => ({
      id: course.id,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      type: 'course' as const
    })));

    // Search products
    const productsData = await db.select().from(products)
      .where(
        or(
          ilike(products.name, searchTerm),
          ilike(products.description, searchTerm),
          ilike(products.category, searchTerm)
        )
      );
    
    results.push(...productsData.map(product => ({
      id: product.id,
      title: product.name,
      subtitle: `R$ ${product.price.toFixed(2)}`,
      description: product.description,
      type: 'product' as const
    })));

    // Search publications
    const publicationsData = await db.select().from(publications)
      .where(
        or(
          ilike(publications.title, searchTerm),
          ilike(publications.journal, searchTerm),
          ilike(publications.abstract, searchTerm)
        )
      );
    
    results.push(...publicationsData.map(pub => ({
      id: pub.id.toString(),
      title: pub.title,
      subtitle: pub.journal,
      description: pub.abstract,
      type: 'publication' as const
    })));

    // Sort by relevance
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      return aTitle - bTitle;
    });

    res.json(results.slice(0, 10));
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Failed to search" });
  }
}