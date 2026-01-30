import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const WhatsAppButton: React.FC = () => {
  const message = encodeURIComponent("Merhaba Mucize Temizlik, bilgi almak istiyorum.");
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group"
      aria-label="WhatsApp ile İletişime Geç"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap text-sm">
        Hızlı Teklif Al
      </span>
      <MessageCircle size={28} fill="currentColor" className="text-white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
      </span>
    </a>
  );
};