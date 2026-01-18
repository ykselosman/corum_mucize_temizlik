import React from 'react';
import { Sparkles, Phone, MapPin, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Page } from '../types';
import { CONTACT_INFO } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-brand-500" />
              <span className="text-xl font-bold">Mucize Temizlik</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Çorum ve çevresinde profesyonel, güvenilir ve uygun fiyatlı temizlik hizmetleri sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-100">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-brand-500 transition">Anasayfa</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-brand-500 transition">Hakkımızda</button></li>
              <li><button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-brand-500 transition">Hizmetlerimiz</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-brand-500 transition">İletişim</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-100">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-brand-500 shrink-0" />
                <span className="text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-100">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mucize Temizlik. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};
