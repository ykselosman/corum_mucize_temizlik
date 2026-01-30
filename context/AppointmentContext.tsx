import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, BookingStatus, ServiceItem, ContactMessage, Review } from '../types';
import { supabase } from '../supabaseClient';

interface DataContextType {
  appointments: Appointment[];
  services: ServiceItem[];
  messages: ContactMessage[];
  reviews: Review[];
  loading: boolean;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>;
  updateStatus: (id: string, status: BookingStatus) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, service: Omit<ServiceItem, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  addReview: (review: { serviceId: string, customerName: string, customerPhone: string, rating: number, comment: string }) => Promise<{ success: boolean, message: string }>;
  getStats: () => { total: number; pending: number; approved: number; earnings: number; messageCount: number };
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Parallel fetching for performance
      const [servicesRes, apptRes, msgRes, reviewsRes] = await Promise.all([
        supabase.from('services').select('*').order('created_at', { ascending: true }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false })
      ]);

      if (servicesRes.data) {
        setServices(servicesRes.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          image: item.image,
          basePrice: item.base_price
        })));
      }

      if (apptRes.data) {
        setAppointments(apptRes.data.map((item: any) => ({
          id: item.id,
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          serviceId: item.service_id,
          serviceName: item.service_name,
          date: item.date,
          timeSlot: item.time_slot,
          address: item.address,
          status: item.status,
          notes: item.notes,
          priceEstimate: item.price_estimate,
          createdAt: item.created_at
        })));
      }

      if (msgRes.data) {
        setMessages(msgRes.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          message: item.message,
          createdAt: item.created_at
        })));
      }

      if (reviewsRes.data) {
        setReviews(reviewsRes.data.map((item: any) => ({
          id: item.id,
          serviceId: item.service_id,
          customerName: item.customer_name,
          rating: item.rating,
          comment: item.comment,
          createdAt: item.created_at
        })));
      }
    } catch (err) {
      console.error('Data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appt: Omit<Appointment, 'id' | 'createdAt'>) => {
    const { error } = await supabase.from('appointments').insert([{
        customer_name: appt.customerName,
        customer_phone: appt.customerPhone,
        service_id: appt.serviceId,
        service_name: appt.serviceName,
        date: appt.date,
        time_slot: appt.timeSlot,
        address: appt.address,
        status: appt.status,
        notes: appt.notes,
        price_estimate: appt.priceEstimate
      }]);
    if (!error) fetchData();
  };

  const updateStatus = async (id: string, status: BookingStatus) => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (!error) setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (!error) setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const addService = async (service: Omit<ServiceItem, 'id'>) => {
    const { error } = await supabase.from('services').insert([{
        title: service.title,
        description: service.description,
        icon: service.icon,
        image: service.image,
        base_price: service.basePrice
      }]);
    if (!error) fetchData();
  };

  const updateService = async (id: string, service: Omit<ServiceItem, 'id'>) => {
    const { error } = await supabase.from('services').update({
        title: service.title,
        description: service.description,
        icon: service.icon,
        image: service.image,
        base_price: service.basePrice
      }).eq('id', id);
    if (!error) fetchData();
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) setServices(prev => prev.filter(s => s.id !== id));
  };

  const addMessage = async (message: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const { error } = await supabase.from('messages').insert([{
        name: message.name,
        email: message.email,
        phone: message.phone,
        message: message.message
      }]);
    if (!error) fetchData();
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (!error) setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addReview = async (review: { serviceId: string, customerName: string, customerPhone: string, rating: number, comment: string }) => {
    const cleanInputPhone = review.customerPhone.replace(/\s/g, '');
    const hasCompletedBooking = appointments.some(appt => {
        const cleanApptPhone = appt.customerPhone.replace(/\s/g, '');
        return cleanApptPhone === cleanInputPhone && appt.serviceId === review.serviceId && appt.status === 'completed';
    });

    if (!hasCompletedBooking) {
        return { success: false, message: 'Bu hizmetten faydalanmadınız veya hizmetiniz henüz tamamlanmadı.' };
    }

    const { error } = await supabase.from('reviews').insert([{
        service_id: review.serviceId,
        customer_name: review.customerName,
        rating: review.rating,
        comment: review.comment
      }]);

    if (!error) {
        fetchData();
        return { success: true, message: 'Yorumunuz başarıyla eklendi!' };
    }
    return { success: false, message: 'Teknik bir hata oluştu.' };
  };

  const getStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      approved: appointments.filter(a => a.status === 'approved').length,
      earnings: appointments.filter(a => a.status === 'completed').reduce((acc, curr) => acc + (curr.priceEstimate || 0), 0),
      messageCount: messages.length
    };
  };

  return (
    <DataContext.Provider value={{ appointments, services, messages, reviews, loading, addAppointment, updateStatus, deleteAppointment, addService, updateService, deleteService, addMessage, deleteMessage, addReview, getStats, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};