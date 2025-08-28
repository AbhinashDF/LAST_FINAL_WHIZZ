// Simple TypeScript interfaces for API functions
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: string;
  location: string;
  createdAt: Date;
}

export interface InsertDestination {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: string;
  location: string;
}

export interface TripPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  duration: number;
  category: string;
  rating: string;
  inclusions: string[];
  location: string;
  createdAt: Date;
}

export interface InsertTripPackage {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  duration: number;
  category: string;
  rating: string;
  inclusions: string[];
  location: string;
}

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

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: string;
  class: string;
  createdAt: Date;
}

export interface InsertFlight {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: string;
  class?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: string;
  pricePerNight: string;
  amenities: string[];
  description: string;
  starRating: number;
  distanceFromCenter: string | null;
  createdAt: Date;
}

export interface InsertHotel {
  name: string;
  location: string;
  imageUrl: string;
  rating: string;
  pricePerNight: string;
  amenities: string[];
  description: string;
  starRating: number;
  distanceFromCenter?: string;
}
