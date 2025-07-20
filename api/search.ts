import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q: query } = req.query;
  
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const results = [];
    const searchQuery = query.toLowerCase();

    // Get all data from Supabase REST API
    const SUPABASE_URL = "https://gswdmdygbytmqkacwngm.supabase.co";
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const headers = {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json"
    };

    // Search courses
    const coursesResponse = await fetch(`${SUPABASE_URL}/rest/v1/courses?select=*`, { headers });
    const coursesData = await coursesResponse.json();
    
    coursesData.filter((course: any) => 
      course.title?.toLowerCase().includes(searchQuery) ||
      course.subtitle?.toLowerCase().includes(searchQuery) ||
      course.description?.toLowerCase().includes(searchQuery)
    ).forEach((course: any) => {
      results.push({
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        type: 'course' as const
      });
    });

    // Search products
    const productsResponse = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, { headers });
    const productsData = await productsResponse.json();
    
    productsData.filter((product: any) => 
      product.name?.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery)
    ).forEach((product: any) => {
      results.push({
        id: product.id,
        title: product.name,
        subtitle: `R$ ${Number(product.price).toFixed(2)}`,
        description: product.description,
        type: 'product' as const
      });
    });

    // Search publications
    const publicationsResponse = await fetch(`${SUPABASE_URL}/rest/v1/publications?select=*`, { headers });
    const publicationsData = await publicationsResponse.json();
    
    publicationsData.filter((pub: any) => 
      pub.title?.toLowerCase().includes(searchQuery) ||
      pub.journal?.toLowerCase().includes(searchQuery) ||
      pub.abstract?.toLowerCase().includes(searchQuery)
    ).forEach((pub: any) => {
      results.push({
        id: pub.id.toString(),
        title: pub.title,
        subtitle: pub.journal,
        description: pub.abstract,
        type: 'publication' as const
      });
    });

    // Sort by relevance
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      return aTitle - bTitle;
    });

    res.json(results.slice(0, 10));
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}