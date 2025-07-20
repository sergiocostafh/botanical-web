import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseGet, supabasePost } from './lib/supabase-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const publicationsData = await supabaseGet('publications');
      res.json(publicationsData);
    } else if (req.method === 'POST') {
      // Check admin auth
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== 'admin-token') {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const publication = await supabasePost('publications', req.body);
      res.status(201).json(publication);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Error in publications API:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}