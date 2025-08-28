import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../shared/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const destinations = await storage.getAllDestinations();
      return res.json(destinations);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Destinations API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
