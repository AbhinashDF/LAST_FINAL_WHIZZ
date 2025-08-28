// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface InsertUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Destination types
export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  country: string;
  continent: string;
  rating: number;
  priceRange: string;
  bestTimeToVisit: string;
  highlights: string[];
  createdAt: Date;
}

export interface InsertDestination {
  name: string;
  description: string;
  image: string;
  country: string;
  continent: string;
  rating: number;
  priceRange: string;
  bestTimeToVisit: string;
  highlights: string[];
}

// Trip package types
export interface TripPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  destinationId: string;
  duration: number;
  price: number;
  currency: string;
  category: string;
  includes: string[];
  highlights: string[];
  createdAt: Date;
}

export interface InsertTripPackage {
  name: string;
  description: string;
  image: string;
  destinationId: string;
  duration: number;
  price: number;
  currency: string;
  category: string;
  includes: string[];
  highlights: string[];
}

// Booking types
export interface Booking {
  id: string;
  packageId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  travelers: number;
  departureDate: Date;
  returnDate: Date | null;
  totalPrice: string;
  status: string;
  createdAt: Date;
}

export interface InsertBooking {
  packageId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  travelers: number;
  departureDate: Date;
  returnDate?: Date;
  totalPrice: string;
}

// Contact types
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  newsletter: boolean | null;
  createdAt: Date;
}

export interface InsertContact {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  newsletter?: boolean;
}

// Flight types
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  class: string;
  stops: number;
  createdAt: Date;
}

export interface InsertFlight {
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  class?: string;
  stops: number;
}

// Hotel types
export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  distanceFromCenter: number | null;
  createdAt: Date;
}

export interface InsertHotel {
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  distanceFromCenter?: number;
}
