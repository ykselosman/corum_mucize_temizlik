import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useData } from '../context/AppointmentContext';

export const Contact: React.FC = () => {
  const { addMessage } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
    });

    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya randevu talepleriniz için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 p-3 rounded-lg text-brand-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Adres</h3>
                  <p className="text-gray-600 mt-1">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 p-3 rounded-lg text-brand-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefon</h3>
                  <p className="text-gray-600 mt-1">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 p-3 rounded-lg text-brand-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">E-Posta</h3>
                  <p className="text-gray-600 mt-1">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-100 p-3 rounded-lg text-brand-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Çalışma Saatleri</h3>
                  <p className="text-gray-600 mt-1">Pazartesi - Cumartesi: 08:00 - 19:00</p>
                  <p className="text-gray-600">Pazar: Kapalı</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-2 rounded-2xl shadow-sm h-64 lg:h-80 overflow-hidden">
               <iframe 
                src={CONTACT_INFO.mapUrl}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mucize Temizlik Konum"
               ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
            {submitted ? (
                <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-12 rounded-lg text-center animate-fade-in">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-500 rounded-full p-2 text-white">
                            <Send size={32} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Mesajınız Alındı!</h3>
                    <p>En kısa sürede size dönüş yapacağız. Teşekkürler.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Adınız Soyadınız</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 shadow-sm"
                    placeholder="Örn: Ahmet Yılmaz"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">E-Posta Adresiniz</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 shadow-sm"
                    placeholder="mail@ornek.com"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Telefon Numaranız</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 shadow-sm"
                    placeholder="05XX XXX XX XX"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Mesajınız</label>
                    <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none resize-none placeholder:text-gray-400 shadow-sm"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-600 disabled:opacity-70 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-0.5"
                >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
                </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};