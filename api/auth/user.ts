import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check for admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Simple token validation for demo
    const token = authHeader.split(' ')[1];
    if (token !== 'admin-token') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Return admin user info
    res.json({
      id: 'admin',
      email: 'admin@botanical.com',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
}