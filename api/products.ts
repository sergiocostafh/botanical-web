import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const products = await storage.getProducts();
      res.json(products);
    } else if (req.method === 'POST') {
      // Check admin auth
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== 'admin-token') {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Error in products API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}