import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('Simple test API called:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  return res.json({ 
    message: 'Simple test API is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
