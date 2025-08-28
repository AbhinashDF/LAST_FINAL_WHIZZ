import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.json({ 
      message: 'API is working!',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    });
  } catch (error) {
    console.error('Test API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
