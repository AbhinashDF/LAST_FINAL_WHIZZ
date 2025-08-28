import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Debug information
  const debugInfo = {
    method: req.method,
    url: req.url,
    path: req.url?.replace('/api', ''),
    query: req.query,
    headers: req.headers,
    body: req.body
  };

  console.log('Debug API call:', debugInfo);

  // Test endpoint
  if (req.url === '/api/test') {
    return res.json({ 
      message: 'API is working!',
      debug: debugInfo
    });
  }

  // Test destinations endpoint
  if (req.url === '/api/destinations') {
    return res.json({ 
      message: 'Destinations endpoint reached!',
      debug: debugInfo
    });
  }

  return res.status(404).json({ 
    message: 'API route not found',
    debug: debugInfo
  });
}
