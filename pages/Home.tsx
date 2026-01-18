import React from 'react';
import { Page } from '../types';
import { useData } from '../context/AppointmentContext';
import { getIconComponent } from '../utils/iconMapper';
import { ShieldCheck, Clock, ArrowRight, Droplets, SprayCan, Star } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { services, loading } = useData();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Animated Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        {/* Animated Bubbles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble w-24 h-24 left-[10%] bottom-[-20px] animate-float opacity-40 bg-brand-200"></div>
          <div className="bubble w-16 h-16 left-[20%] bottom-[-20px] animate-float-delayed opacity-30 bg-teal-200"></div>
          <div className="bubble w-32 h-32 left-[80%] bottom-[-40px] animate-float opacity-40 bg-blue-200" style={{ animationDuration: '8s' }}></div>
          <div className="bubble w-12 h-12 left-[60%] bottom-[-10px] animate-float-delayed opacity-50 bg-brand-300" style={{ animationDuration: '5s' }}></div>
          <div className="bubble w-40 h-40 right-[5%] top-[20%] animate-pulse-slow opacity-20 bg-teal-100"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-brand-100 text-brand-600 font-semibold text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                </span>
                Çorum'un En Hijyenik Temizlik Hizmeti
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Hayatınıza <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-400">
                   Mucizevi Bir 
                </span> <br/>
                Dokunuş.
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Eviniz, ofisiniz veya inşaat sonrası alanlarınız için profesyonel, güvenilir ve derinlemesine temizlik çözümleri.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => onNavigate('booking')}
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Clock size={20} />
                  Hemen Randevu Al
                </button>
                <button 
                  onClick={() => onNavigate('services')}
                  className="px-8 py-4 bg-white text-gray-700 hover:text-brand-600 border-2 border-transparent hover:border-brand-200 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Hizmetleri İncele
                </button>
              </div>

              <div className="flex items-center gap-4 pt-4 text-sm text-gray-500 font-medium">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                </div>
                <span>500+ Mutlu Müşteri</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://lh3.googleusercontent.com/d/1FMJFWT4EK_A7E17lvg_3GJx4i41gRsWy" 
                  alt="Professional Cleaning" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-float-delayed">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Güvence</p>
                        <p className="font-bold text-gray-800">%100 Memnuniyet</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Hover Cards */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-600 font-bold tracking-wider uppercase text-sm bg-brand-50 px-4 py-1 rounded-full">Hizmetlerimiz</span>
            <h2 className="text-4xl font-extrabold text-gray-900">Pırıl Pırıl Bir Ortam İçin</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-brand-500 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
                <div className="col-span-3 text-center text-gray-500">Hizmetler yükleniyor...</div>
            ) : services.slice(0, 3).map((service, idx) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brand-200 flex flex-col h-full transform hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate('services')}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                     <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Başlangıç</span>
                     <span className="text-brand-600 font-bold">₺{service.basePrice}</span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 z-20 bg-white p-2.5 rounded-xl shadow-lg text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    {getIconComponent(service.icon)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between group/btn">
                    <span className="text-sm font-bold text-gray-500 group-hover/btn:text-brand-600 transition-colors">Detayları İncele</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                       <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-brand-100 rounded-full text-brand-700 bg-white hover:bg-brand-50 hover:border-brand-200 font-bold transition-all duration-300 shadow-sm hover:shadow-md"
            >
                Tüm Hizmetleri Görüntüle
            </button>
          </div>
        </div>
      </section>

       {/* Why Us? - Animated Features */}
       <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  Temizlikte <br/>
                  <span className="text-brand-400">Standartları Yükseltiyoruz</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Sıradan bir temizlikten fazlası. Bilimsel yaklaşım, profesyonel ekipmanlar ve insan sağlığına duyarlı ürünler kullanıyoruz.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: 'Anti-Bakteriyel Temizlik', desc: 'Gözle görülmeyen bakterilere karşı %99 koruma.', icon: <Droplets /> },
                    { title: 'Profesyonel Ekipman', desc: 'Endüstriyel vakum ve buharlı temizlik makineleri.', icon: <SprayCan /> },
                    { title: 'Sigortalı Personel', desc: 'Güvenilir, eğitimli ve referanslı temizlik ekibi.', icon: <ShieldCheck /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="bg-brand-500 p-3 rounded-lg text-white shadow-lg shadow-brand-500/50">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="relative">
                <div className="absolute inset-0 bg-brand-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Cleaning worker" 
                  className="relative rounded-[2rem] shadow-2xl border-4 border-gray-800"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl text-gray-900 max-w-xs animate-float">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="text-yellow-400 flex"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
                      <span className="font-bold">5.0</span>
                   </div>
                   <p className="font-medium text-sm">"Hayatımda gördüğüm en detaylı temizlikti. Teşekkürler!"</p>
                   <p className="text-gray-500 text-xs mt-2">- Zeynep K.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-teal-500"></div>
        <div className="absolute inset-0 opacity-20">
            <div className="bubble w-40 h-40 left-10 top-10 bg-white"></div>
            <div className="bubble w-20 h-20 right-20 bottom-20 bg-white"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-6">Tertemiz Bir Başlangıca Hazır Mısınız?</h2>
          <p className="text-brand-100 text-xl mb-10">
            Online randevu sistemimizle 2 dakika içinde temizlik hizmetinizi planlayın.
          </p>
          <button 
            onClick={() => onNavigate('booking')}
            className="bg-white text-brand-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-50 hover:scale-105 transition-all shadow-2xl"
          >
            Randevu Oluştur
          </button>
        </div>
      </section>
    </div>
  );
};