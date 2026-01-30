import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { AdminDashboard } from './pages/AdminDashboard';
import { Quote } from './pages/Quote';
import { ServiceDetail } from './pages/ServiceDetail';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Page, ServiceItem } from './types';
import { Lock, Sparkles } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // SEO: Dynamic Page Titles
  useEffect(() => {
    window.scrollTo(0, 0);
    
    let title = "Mucize Temizlik | Çorum Profesyonel Temizlik Hizmetleri";
    switch (currentPage) {
      case 'services': title = "Hizmetlerimiz | Çorum Ev ve Ofis Temizliği - Mucize Temizlik"; break;
      case 'about': title = "Hakkımızda | Mucize Temizlik Çorum'un Hijyen Markası"; break;
      case 'contact': title = "İletişim | Çorum Temizlik Şirketi Telefon ve Adres"; break;
      case 'booking': title = "Online Randevu | Çorum Temizlik Hizmeti Al"; break;
      case 'quote': title = "Fiyat Teklifi Al | Çorum Temizlik Fiyatları"; break;
      case 'service-detail': 
        if (selectedService) title = `${selectedService.title} | Çorum Profesyonel Temizlik`;
        break;
      case 'admin': title = "Yönetici Paneli | Mucize Temizlik"; break;
    }
    document.title = title;
  }, [currentPage, selectedService]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
        setIsAdminLoggedIn(true);
        setAdminPassword('');
    } else {
        alert('Hatalı şifre!');
    }
  };

  const navigateToService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
  };

  const renderAdminLogin = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                    <Lock size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Yönetici Girişi</h2>
                <p className="text-gray-500">Devam etmek için şifrenizi girin.</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                    <input 
                        type="password"
                        placeholder="Şifre"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        autoFocus
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-500/20"
                >
                    Giriş Yap
                </button>
                <button 
                    type="button"
                    onClick={() => setCurrentPage('home')}
                    className="w-full text-gray-500 text-sm hover:text-gray-800 font-medium"
                >
                    Anasayfaya Dön
                </button>
            </form>
        </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} onServiceClick={navigateToService} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} onServiceClick={navigateToService} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking />;
      case 'quote':
        return <Quote />;
      case 'service-detail':
        return selectedService ? (
          <ServiceDetail service={selectedService} onNavigate={setCurrentPage} />
        ) : (
          <Home onNavigate={setCurrentPage} onServiceClick={navigateToService} />
        );
      case 'admin':
        if (!isAdminLoggedIn) return renderAdminLogin();
        return <AdminDashboard 
            onLogout={() => {
                setIsAdminLoggedIn(false);
                setCurrentPage('home');
            }}
        />;
      default:
        return <Home onNavigate={setCurrentPage} onServiceClick={navigateToService} />;
    }
  };

  if (currentPage === 'admin') {
    return renderPage();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className={`flex-grow ${currentPage === 'home' || currentPage === 'service-detail' ? '' : 'pt-28'}`}>
        {renderPage()}
      </main>
      <WhatsAppButton />
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;