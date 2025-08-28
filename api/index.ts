import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from "crypto";
import { z } from 'zod';

// Inline the storage implementation to avoid import issues
class MemStorage {
  private destinations: Map<string, any>;
  private tripPackages: Map<string, any>;
  private bookings: Map<string, any>;
  private contacts: Map<string, any>;
  private flights: Map<string, any>;
  private hotels: Map<string, any>;

  constructor() {
    this.destinations = new Map();
    this.tripPackages = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.flights = new Map();
    this.hotels = new Map();
    this.initializePersistentData();
  }

  private initializePersistentData() {
    // Sample destinations
    const sampleDestinations = [
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

    const samplePackages = [
      {
        id: "pkg-1",
        name: "Paris Romance Package",
        description: "Experience the magic of Paris with this romantic 7-day package including luxury accommodations and guided tours.",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
        destinationId: "dest-1",
        duration: 7,
        price: 2499,
        currency: "USD",
        category: "romance",
        includes: ["Luxury hotel accommodation", "Daily breakfast", "Guided city tours", "Eiffel Tower visit", "Seine River cruise"],
        highlights: ["Eiffel Tower dinner", "Louvre Museum tour", "Montmartre exploration", "Champagne tasting"],
        createdAt: new Date("2024-01-01")
      }
    ];

    sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));
    samplePackages.forEach(pkg => this.tripPackages.set(pkg.id, pkg));
  }

  async getAllDestinations() {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string) {
    return this.destinations.get(id);
  }

  async getTripPackagesByCategory(category?: string) {
    const packages = Array.from(this.tripPackages.values());
    if (!category || category === 'all') {
      return packages;
    }
    return packages.filter(pkg => pkg.category === category);
  }

  async getTripPackage(id: string) {
    return this.tripPackages.get(id);
  }

  async createBooking(bookingData: any) {
    const id = randomUUID();
    const booking = { 
      ...bookingData, 
      id, 
      status: "pending", 
      createdAt: new Date(),
      packageId: bookingData.packageId || null,
      phone: bookingData.phone || null,
      returnDate: bookingData.returnDate || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: string) {
    return this.bookings.get(id);
  }

  async updateBookingStatus(id: string, status: string) {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async createContact(contactData: any) {
    const id = randomUUID();
    const contact = { 
      ...contactData, 
      id, 
      createdAt: new Date(),
      phone: contactData.phone || null,
      subject: contactData.subject || null,
      newsletter: contactData.newsletter || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async searchFlights(from?: string, to?: string) {
    return [];
  }

  async searchHotels(location?: string) {
    return [];
  }
}

const storage = new MemStorage();

// Simple validation schemas for API requests
const bookingSchema = z.object({
  packageId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  travelers: z.number().min(1),
  departureDate: z.string().min(1),
  returnDate: z.string().optional(),
  totalPrice: z.string().min(1)
});

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
  newsletter: z.boolean().optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req;
  const path = url?.replace('/api', '') || '';

  try {
    // Destinations API
    if (path === '/destinations' && req.method === 'GET') {
      const destinations = await storage.getAllDestinations();
      return res.json(destinations);
    }

    if (path.startsWith('/destinations/') && req.method === 'GET') {
      const id = path.split('/')[2];
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      return res.json(destination);
    }

    // Trip packages API
    if (path === '/trip-packages' && req.method === 'GET') {
      const category = req.query.category as string;
      const packages = await storage.getTripPackagesByCategory(category);
      return res.json(packages);
    }

    if (path.startsWith('/trip-packages/') && req.method === 'GET') {
      const id = path.split('/')[2];
      const tripPackage = await storage.getTripPackage(id);
      if (!tripPackage) {
        return res.status(404).json({ message: 'Trip package not found' });
      }
      return res.json(tripPackage);
    }

    // Bookings API
    if (path === '/bookings' && req.method === 'POST') {
      const parsedData = bookingSchema.parse(req.body);
      const bookingData = {
        packageId: parsedData.packageId,
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        phone: parsedData.phone,
        travelers: parsedData.travelers,
        departureDate: new Date(parsedData.departureDate),
        returnDate: parsedData.returnDate ? new Date(parsedData.returnDate) : undefined,
        totalPrice: parsedData.totalPrice
      };
      const booking = await storage.createBooking(bookingData);
      return res.status(201).json(booking);
    }

    if (path.startsWith('/bookings/') && req.method === 'GET') {
      const id = path.split('/')[2];
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      return res.json(booking);
    }

    if (path.startsWith('/bookings/') && path.endsWith('/status') && req.method === 'PATCH') {
      const id = path.split('/')[2];
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      return res.json(booking);
    }

    // Contact form API
    if (path === '/contacts' && req.method === 'POST') {
      const parsedData = contactSchema.parse(req.body);
      const contactData = {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        phone: parsedData.phone,
        subject: parsedData.subject,
        message: parsedData.message,
        newsletter: parsedData.newsletter
      };
      const contact = await storage.createContact(contactData);
      return res.status(201).json({ 
        message: 'Contact form submitted successfully',
        id: contact.id
      });
    }

    // Flights API
    if (path === '/flights' && req.method === 'GET') {
      const { from, to } = req.query;
      const flights = await storage.searchFlights(from as string, to as string);
      return res.json(flights);
    }

    // Hotels API
    if (path === '/hotels' && req.method === 'GET') {
      const { location } = req.query;
      const hotels = await storage.searchHotels(location as string);
      return res.json(hotels);
    }

    // Route not found
    return res.status(404).json({ message: 'API route not found' });

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}