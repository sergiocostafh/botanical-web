import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = req.query.q as string;
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const searchTerm = `%${query.toLowerCase()}%`;
    const results = [];

    // Search courses
    const courses = await storage.searchCourses(searchTerm);
    results.push(...courses.map(course => ({
      id: course.id,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      type: 'course' as const
    })));

    // Search products
    const products = await storage.searchProducts(searchTerm);
    results.push(...products.map(product => ({
      id: product.id,
      title: product.name,
      subtitle: `R$ ${product.price.toFixed(2)}`,
      description: product.description,
      type: 'product' as const
    })));

    // Search publications
    const publications = await storage.searchPublications(searchTerm);
    results.push(...publications.map(pub => ({
      id: pub.id.toString(),
      title: pub.title,
      subtitle: pub.authors,
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