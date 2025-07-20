import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Simple authentication for demo
    if (username === 'admin' && password === 'admin123') {
      res.json({ 
        token: 'admin-token',
        user: {
          id: 'admin',
          email: 'admin@botanical.com',
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}