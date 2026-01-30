import React from 'react';

export type Page = 'home' | 'about' | 'services' | 'contact' | 'booking' | 'admin' | 'quote' | 'service-detail' | 'blog';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  address: string;
  status: BookingStatus;
  notes?: string;
  priceEstimate?: number;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  basePrice: number;
  details?: string[]; // Added for detail page
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export interface Review {
  id: string;
  serviceId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}