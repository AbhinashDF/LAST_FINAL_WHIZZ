// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";

// server/data/sample-data.ts
var sampleDestinations = [
  {
    id: "dest-1",
    name: "Maldives",
    description: "Crystal clear waters and pristine beaches",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&h=300",
    price: "2499",
    rating: "4.8",
    location: "Indian Ocean",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "dest-2",
    name: "Tokyo, Japan",
    description: "Modern cityscape meets ancient traditions",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=400&h=300",
    price: "1899",
    rating: "4.7",
    location: "Japan",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "dest-3",
    name: "Paris, France",
    description: "The city of lights and romance",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&h=300",
    price: "1599",
    rating: "4.6",
    location: "France",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "dest-4",
    name: "Safari, Kenya",
    description: "Wildlife adventures in the savanna",
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&h=300",
    price: "3299",
    rating: "4.9",
    location: "Kenya",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  }
];
var samplePackages = [
  {
    id: "pkg-1",
    title: "Maldives Paradise Retreat",
    description: "7 days in overwater villas with private pools, spa treatments, and gourmet dining.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&h=300",
    price: "4999",
    duration: 7,
    category: "luxury",
    rating: "5.0",
    inclusions: ["Overwater villa accommodation", "All meals & premium beverages", "Spa treatments & water activities"],
    location: "Maldives",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-2",
    title: "Himalayan Base Camp Trek",
    description: "14-day guided trek to Everest Base Camp with experienced Sherpa guides.",
    imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=500&h=300",
    price: "2899",
    duration: 14,
    category: "adventure",
    rating: "4.8",
    inclusions: ["Expert Sherpa guides", "All permits & equipment", "Mountain lodge accommodation"],
    location: "Nepal",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-3",
    title: "Japan Family Discovery",
    description: "10 days exploring Tokyo, Kyoto, and Osaka with family-friendly activities.",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=500&h=300",
    price: "3299",
    duration: 10,
    category: "family",
    rating: "4.9",
    inclusions: ["Theme park tickets included", "Kid-friendly restaurants", "Cultural workshops for children"],
    location: "Japan",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-4",
    title: "Morocco Cultural Immersion",
    description: "8 days exploring imperial cities, markets, and Sahara Desert camping.",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e5cd?auto=format&fit=crop&w=500&h=300",
    price: "1899",
    duration: 8,
    category: "cultural",
    rating: "4.7",
    inclusions: ["Sahara Desert camping", "Traditional cooking classes", "Local guide experiences"],
    location: "Morocco",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-5",
    title: "Premium African Safari",
    description: "9 days luxury safari across Kenya and Tanzania with exclusive game viewing.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&h=300",
    price: "6799",
    duration: 9,
    category: "luxury",
    rating: "5.0",
    inclusions: ["Luxury tented camps", "Private game drives", "Big 5 wildlife viewing"],
    location: "Kenya & Tanzania",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-6",
    title: "Caribbean Family Fun",
    description: "7 days all-inclusive resort with kids club, water sports, and family activities.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&h=300",
    price: "2199",
    duration: 7,
    category: "family",
    rating: "4.6",
    inclusions: ["All-inclusive meals & drinks", "Kids club & teen activities", "Water sports & beach access"],
    location: "Caribbean",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-7",
    title: "India Cultural Heritage",
    description: "12 days exploring the Golden Triangle with authentic cultural experiences.",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&h=300",
    price: "2299",
    duration: 12,
    category: "cultural",
    rating: "4.8",
    inclusions: ["Taj Mahal & Red Fort tours", "Traditional dance performances", "Local cooking workshops"],
    location: "India",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-8",
    title: "Peru Machu Picchu Explorer",
    description: "9 days discovering ancient Incan civilization and local traditions.",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=500&h=300",
    price: "2799",
    duration: 9,
    category: "cultural",
    rating: "4.9",
    inclusions: ["Machu Picchu guided tour", "Sacred Valley exploration", "Andean village visits"],
    location: "Peru",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "pkg-9",
    title: "Greece Island Mythology",
    description: "10 days exploring ancient Greek culture across multiple islands.",
    imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258734?auto=format&fit=crop&w=500&h=300",
    price: "3199",
    duration: 10,
    category: "cultural",
    rating: "4.7",
    inclusions: ["Acropolis & Parthenon tours", "Archaeological site visits", "Traditional Greek cuisine"],
    location: "Greece",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  }
];
var sampleFlights = [
  {
    id: "flight-1",
    airline: "British Airways",
    from: "NYC",
    to: "LON",
    departureTime: "08:30",
    arrivalTime: "14:45",
    duration: "6h 15m",
    stops: 1,
    price: "649",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "flight-2",
    airline: "Emirates",
    from: "NYC",
    to: "DXB",
    departureTime: "23:50",
    arrivalTime: "19:30",
    duration: "12h 40m",
    stops: 0,
    price: "899",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "flight-3",
    airline: "Japan Airlines",
    from: "LAX",
    to: "NRT",
    departureTime: "11:30",
    arrivalTime: "15:45+1",
    duration: "11h 15m",
    stops: 0,
    price: "1299",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "flight-4",
    airline: "Air France",
    from: "JFK",
    to: "CDG",
    departureTime: "22:15",
    arrivalTime: "11:30+1",
    duration: "7h 15m",
    stops: 0,
    price: "789",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "flight-5",
    airline: "Kenya Airways",
    from: "JFK",
    to: "NBO",
    departureTime: "06:45",
    arrivalTime: "05:30+1",
    duration: "14h 45m",
    stops: 1,
    price: "1199",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "flight-6",
    airline: "Qatar Airways",
    from: "LAX",
    to: "MLE",
    departureTime: "14:20",
    arrivalTime: "06:15+2",
    duration: "22h 55m",
    stops: 2,
    price: "1599",
    class: "economy",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  }
];
var sampleHotels = [
  {
    id: "hotel-1",
    name: "Grand Ocean Resort",
    location: "Maldives",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=300&h=200",
    rating: "5.0",
    pricePerNight: "289",
    amenities: ["Ocean view", "Pool", "Spa", "Free WiFi"],
    description: "Luxury resort with overwater villas and world-class amenities",
    starRating: 5,
    distanceFromCenter: "0.5 miles from beach",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "hotel-2",
    name: "Tokyo Central Hotel",
    location: "Tokyo, Japan",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=300&h=200",
    rating: "4.7",
    pricePerNight: "189",
    amenities: ["City view", "Gym", "Restaurant", "Free WiFi"],
    description: "Modern hotel in the heart of Tokyo with easy access to attractions",
    starRating: 4,
    distanceFromCenter: "2 miles from city center",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "hotel-3",
    name: "Le Marais Boutique Hotel",
    location: "Paris, France",
    imageUrl: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=300&h=200",
    rating: "4.8",
    pricePerNight: "245",
    amenities: ["Historic building", "Breakfast", "Concierge", "Free WiFi"],
    description: "Charming boutique hotel in the historic Marais district",
    starRating: 4,
    distanceFromCenter: "1 mile from Louvre",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "hotel-4",
    name: "Safari Lodge Kenya",
    location: "Kenya",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=300&h=200",
    rating: "4.9",
    pricePerNight: "399",
    amenities: ["Safari tours", "Restaurant", "Pool", "Nature view"],
    description: "Authentic safari lodge with stunning wildlife views",
    starRating: 4,
    distanceFromCenter: "15 miles from Nairobi",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "hotel-5",
    name: "Taj Palace Hotel",
    location: "India",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&h=200",
    rating: "4.6",
    pricePerNight: "125",
    amenities: ["Traditional decor", "Spa", "Restaurant", "Cultural tours"],
    description: "Magnificent palace hotel showcasing Indian heritage",
    starRating: 5,
    distanceFromCenter: "3 miles from Taj Mahal",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  },
  {
    id: "hotel-6",
    name: "Santorini Cliffside Resort",
    location: "Greece",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=300&h=200",
    rating: "4.9",
    pricePerNight: "295",
    amenities: ["Sea view", "Infinity pool", "Restaurant", "Sunset terrace"],
    description: "Stunning cliffside resort with breathtaking Aegean Sea views",
    starRating: 5,
    distanceFromCenter: "2 miles from Oia",
    createdAt: /* @__PURE__ */ new Date("2024-01-01")
  }
];

// server/storage.ts
var MemStorage = class {
  users;
  destinations;
  tripPackages;
  bookings;
  contacts;
  flights;
  hotels;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.destinations = /* @__PURE__ */ new Map();
    this.tripPackages = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.flights = /* @__PURE__ */ new Map();
    this.hotels = /* @__PURE__ */ new Map();
    this.initializePersistentData();
  }
  initializePersistentData() {
    sampleDestinations.forEach((dest) => this.destinations.set(dest.id, dest));
    samplePackages.forEach((pkg) => this.tripPackages.set(pkg.id, pkg));
    sampleFlights.forEach((flight) => this.flights.set(flight.id, flight));
    sampleHotels.forEach((hotel) => this.hotels.set(hotel.id, hotel));
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Destination operations
  async getAllDestinations() {
    return Array.from(this.destinations.values());
  }
  async getDestination(id) {
    return this.destinations.get(id);
  }
  async createDestination(insertDestination) {
    const id = randomUUID();
    const destination = { ...insertDestination, id, createdAt: /* @__PURE__ */ new Date() };
    this.destinations.set(id, destination);
    return destination;
  }
  // Trip package operations
  async getAllTripPackages() {
    return Array.from(this.tripPackages.values());
  }
  async getTripPackagesByCategory(category) {
    const packages = Array.from(this.tripPackages.values());
    if (!category || category === "all") {
      return packages;
    }
    return packages.filter((pkg) => pkg.category === category);
  }
  async getTripPackage(id) {
    return this.tripPackages.get(id);
  }
  async createTripPackage(insertTripPackage) {
    const id = randomUUID();
    const tripPackage = { ...insertTripPackage, id, createdAt: /* @__PURE__ */ new Date() };
    this.tripPackages.set(id, tripPackage);
    return tripPackage;
  }
  // Booking operations
  async getAllBookings() {
    return Array.from(this.bookings.values());
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = randomUUID();
    const booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      packageId: insertBooking.packageId || null,
      phone: insertBooking.phone || null,
      returnDate: insertBooking.returnDate || null
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async updateBookingStatus(id, status) {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return void 0;
  }
  // Contact operations
  async getAllContacts() {
    return Array.from(this.contacts.values());
  }
  async getContact(id) {
    return this.contacts.get(id);
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      phone: insertContact.phone || null,
      subject: insertContact.subject || null,
      newsletter: insertContact.newsletter || null
    };
    this.contacts.set(id, contact);
    return contact;
  }
  // Flight operations
  async getAllFlights() {
    return Array.from(this.flights.values());
  }
  async searchFlights(from, to) {
    const flights2 = Array.from(this.flights.values());
    if (!from && !to) {
      return flights2;
    }
    return flights2.filter((flight) => {
      const matchFrom = !from || flight.from.toLowerCase().includes(from.toLowerCase());
      const matchTo = !to || flight.to.toLowerCase().includes(to.toLowerCase());
      return matchFrom && matchTo;
    });
  }
  async createFlight(insertFlight) {
    const id = randomUUID();
    const flight = {
      ...insertFlight,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      class: insertFlight.class || "economy"
    };
    this.flights.set(id, flight);
    return flight;
  }
  // Hotel operations
  async getAllHotels() {
    return Array.from(this.hotels.values());
  }
  async searchHotels(location) {
    const hotels2 = Array.from(this.hotels.values());
    if (!location) {
      return hotels2;
    }
    return hotels2.filter(
      (hotel) => hotel.location.toLowerCase().includes(location.toLowerCase()) || hotel.name.toLowerCase().includes(location.toLowerCase())
    );
  }
  async createHotel(insertHotel) {
    const id = randomUUID();
    const hotel = {
      ...insertHotel,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      distanceFromCenter: insertHotel.distanceFromCenter || null
    };
    this.hotels.set(id, hotel);
    return hotel;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var tripPackages = pgTable("trip_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(),
  // days
  category: text("category").notNull(),
  // luxury, adventure, family, cultural
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  inclusions: text("inclusions").array().notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packageId: varchar("package_id").references(() => tripPackages.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  travelers: integer("travelers").notNull(),
  departureDate: timestamp("departure_date").notNull(),
  returnDate: timestamp("return_date"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  // pending, confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var flights = pgTable("flights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  airline: text("airline").notNull(),
  from: text("from_location").notNull(),
  to: text("to_location").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  duration: text("duration").notNull(),
  stops: integer("stops").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  class: text("class").notNull().default("economy"),
  createdAt: timestamp("created_at").defaultNow()
});
var hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  amenities: text("amenities").array().notNull(),
  description: text("description").notNull(),
  starRating: integer("star_rating").notNull(),
  distanceFromCenter: text("distance_from_center"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true });
var insertDestinationSchema = createInsertSchema(destinations).omit({ id: true, createdAt: true });
var insertTripPackageSchema = createInsertSchema(tripPackages).omit({ id: true, createdAt: true });
var insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, status: true });
var insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
var insertFlightSchema = createInsertSchema(flights).omit({ id: true, createdAt: true });
var insertHotelSchema = createInsertSchema(hotels).omit({ id: true, createdAt: true });

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/destinations", async (_req, res) => {
    try {
      const destinations2 = await storage.getAllDestinations();
      res.json(destinations2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });
  app2.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });
  app2.get("/api/trip-packages", async (req, res) => {
    try {
      const category = req.query.category;
      const packages = await storage.getTripPackagesByCategory(category);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip packages" });
    }
  });
  app2.get("/api/trip-packages/:id", async (req, res) => {
    try {
      const tripPackage = await storage.getTripPackage(req.params.id);
      if (!tripPackage) {
        return res.status(404).json({ message: "Trip package not found" });
      }
      res.json(tripPackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip package" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });
  app2.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });
  app2.get("/api/flights", async (req, res) => {
    try {
      const { from, to } = req.query;
      const flights2 = await storage.searchFlights(from, to);
      res.json(flights2);
    } catch (error) {
      res.status(500).json({ message: "Failed to search flights" });
    }
  });
  app2.get("/api/hotels", async (req, res) => {
    try {
      const { location } = req.query;
      const hotels2 = await storage.searchHotels(location);
      res.json(hotels2);
    } catch (error) {
      res.status(500).json({ message: "Failed to search hotels" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
