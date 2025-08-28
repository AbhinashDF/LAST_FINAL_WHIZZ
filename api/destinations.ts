import type { VercelRequest, VercelResponse } from '@vercel/node';

// Inline storage for destinations
const destinations = [
  {
    id: "dest-1",
    name: "Paris, France",
    description: "The City of Light offers iconic landmarks, world-class museums, and romantic ambiance.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
    country: "France",
    continent: "Europe",
    rating: 4.8,
    priceRange: "$$$",
    bestTimeToVisit: "April to October",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées"],
    createdAt: new Date("2024-01-01")
  },
  {
    id: "dest-2",
    name: "Tokyo, Japan",
    description: "A fascinating blend of ultramodern and traditional, offering unique cultural experiences.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    country: "Japan",
    continent: "Asia",
    rating: 4.9,
    priceRange: "$$$",
    bestTimeToVisit: "March to May and September to November",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Tsukiji Market"],
    createdAt: new Date("2024-01-01")
  }
];

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
      return res.json(destinations);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Destinations API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
