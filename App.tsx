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
import { Page } from './types';
import { Lock } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
        setIsAdminLoggedIn(true);
        setAdminPassword('');
    } else {
        alert('Hatalı şifre!');
    }
  };

  const renderAdminLogin = () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                        autoFocus
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition"
                >
                    Giriş Yap
                </button>
                <button 
                    type="button"
                    onClick={() => setCurrentPage('home')}
                    className="w-full text-gray-500 text-sm hover:text-gray-800"
                >
                    Anasayfaya Dön
                </button>
            </form>
            <div className="mt-4 text-center text-xs text-gray-400">
                İpucu: Şifre 'admin123'
            </div>
        </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking />;
      case 'quote':
        return <Quote />;
      case 'admin':
        if (!isAdminLoggedIn) return renderAdminLogin();
        return <AdminDashboard 
            onLogout={() => {
                setIsAdminLoggedIn(false);
                setCurrentPage('home');
            }}
        />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  // If Admin Dashboard is active, don't show Navbar/Footer
  if (currentPage === 'admin') {
    return renderPage();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;