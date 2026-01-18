import React from 'react';

export type Page = 'home' | 'about' | 'services' | 'contact' | 'booking' | 'admin' | 'quote';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Appointment {
  id: string; // UUID from Supabase
  customerName: string; // mapped from customer_name
  customerPhone: string; // mapped from customer_phone
  serviceId: string; // mapped from service_id
  serviceName: string; // mapped from service_name
  date: string;
  timeSlot: string; // mapped from time_slot
  address: string;
  status: BookingStatus;
  notes?: string;
  priceEstimate?: number; // mapped from price_estimate
  createdAt: string; // mapped from created_at
}

export interface ServiceItem {
  id: string; // UUID
  title: string;
  description: string;
  icon: string; // Store icon name as string
  image: string;
  basePrice: number; // mapped from base_price
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string; // mapped from created_at
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
  serviceId: string; // mapped from service_id
  customerName: string; // mapped from customer_name
  rating: number;
  comment: string;
  createdAt: string; // mapped from created_at
}