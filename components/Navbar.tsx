import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, UserCog } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Anasayfa', value: 'home' },
    { label: 'Kurumsal', value: 'about' },
    { label: 'Hizmetler', value: 'services' },
    { label: 'İletişim', value: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  // Logic to determine if navbar should be prominent even when not scrolled
  const isDetailHeader = currentPage === 'service-detail';
  const showProminentNav = scrolled || isDetailHeader;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-md py-2' 
        : (isDetailHeader 
            ? 'bg-white/60 backdrop-blur-md border-b border-white/20 py-3 shadow-sm' 
            : 'bg-transparent py-4')
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className={`p-2 rounded-xl mr-3 transition-colors ${showProminentNav ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-brand-600 shadow-lg'}`}>
              <Sparkles size={24} className="animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-2xl font-extrabold leading-none tracking-tight ${showProminentNav ? 'text-gray-800' : 'text-brand-900'}`}>MUCİZE</h1>
              <span className={`text-xs font-bold tracking-[0.2em] uppercase ${showProminentNav ? 'text-brand-600' : 'text-brand-700'}`}>Temizlik</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  currentPage === item.value
                    ? 'bg-brand-100 text-brand-700'
                    : showProminentNav ? 'text-gray-600 hover:bg-white/50 hover:text-brand-600' : 'text-gray-700 hover:bg-white/80 hover:text-brand-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="w-px h-6 bg-gray-300 mx-4"></div>

            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-full transition-colors ${showProminentNav ? 'text-gray-400 hover:text-brand-600' : 'text-gray-500 hover:text-brand-700'}`}
              title="Yönetici Paneli"
            >
              <UserCog size={20} />
            </button>

            <button
              onClick={() => handleNavClick('booking')}
              className="ml-4 bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Sparkles size={16} fill="white" />
              Randevu Al
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-brand-600 text-white px-3 py-1.5 rounded-full text-xs font-bold"
            >
              Randevu
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-brand-600 focus:outline-none bg-white/50 rounded-lg backdrop-blur-sm"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                  currentPage === item.value
                    ? 'bg-brand-50 text-brand-600 border border-brand-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
                onClick={() => handleNavClick('admin')}
                className="block w-full text-left px-4 py-3 rounded-xl text-lg font-medium text-gray-500 hover:text-brand-600 hover:bg-gray-50"
            >
                Yönetici Girişi
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};