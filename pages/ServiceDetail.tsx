import React from 'react';
import { ServiceItem, Page } from '../types';
import { getIconComponent } from '../utils/iconMapper';
import { ArrowLeft, CheckCircle, Clock, Shield, Sparkles, Star } from 'lucide-react';
import { useData } from '../context/AppointmentContext';

interface ServiceDetailProps {
  service: ServiceItem;
  onNavigate: (page: Page) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onNavigate }) => {
  const { reviews } = useData();
  const serviceReviews = reviews.filter(r => r.serviceId === service.id);
  
  return (
    <div className="bg-white min-h-screen">
      {/* Detail Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => onNavigate('services')}
              className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 w-fit"
            >
              <ArrowLeft size={16} /> Hizmetlere Dön
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-500 p-3 rounded-2xl text-white shadow-lg">
                    {getIconComponent(service.icon, "w-8 h-8")}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white">{service.title}</h1>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex text-yellow-400">
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                   </div>
                   <span className="text-white font-bold">{serviceReviews.length > 0 ? '4.9/5.0' : '5.0/5.0'} ({serviceReviews.length} Değerlendirme)</span>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 animate-slide-up">
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Başlangıç Fiyatı</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-brand-600">₺{service.basePrice}</span>
                    <span className="text-gray-400 text-sm font-medium">'den itibaren</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Hizmet Detayları</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {service.description} Profesyonel ekibimiz, en modern ekipmanlar ve sağlığa duyarlı ürünlerle alanınızı pırıl pırıl hale getirmek için hazır.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-brand-50 p-8 rounded-3xl border border-brand-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="text-brand-600" /> Neler Dahil?
                  </h3>
                  <ul className="space-y-4">
                    {['Detaylı Yüzey Temizliği', 'Toz Alma ve Vakumlama', 'Cam ve Çerçeve Temizliği', 'Mutfak ve Banyo Dezenfeksiyonu', 'Zemin Yıkama/Cilalama', 'Atık Yönetimi'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div> {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="text-teal-600" /> Mucize Güvencesi
                  </h3>
                  <ul className="space-y-4">
                    {['%100 Memnuniyet Garantisi', 'Sigortalı ve Eğitimli Personel', 'Ekolojik Temizlik Ürünleri', 'Sabit Fiyat Garantisi', '7/24 Müşteri Desteği'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle size={18} className="text-teal-600" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </section>

            <section className="space-y-8">
               <h2 className="text-3xl font-bold text-gray-900">Nasıl Çalışıyoruz?</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: '01', title: 'Randevu', desc: 'Online veya telefonla size uygun zamanı seçin.' },
                    { step: '02', title: 'Planlama', desc: 'İhtiyacınıza göre en uygun ekibi görevlendiriyoruz.' },
                    { step: '03', title: 'Mucize', desc: 'Ekibimiz gelir ve alanınızı pırıl pırıl yapar.' },
                  ].map((item, i) => (
                    <div key={i} className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                       <span className="text-5xl font-black text-gray-200 group-hover:text-brand-100 transition-colors absolute top-4 right-4">{item.step}</span>
                       <h4 className="text-lg font-bold text-gray-900 mb-2 relative z-10">{item.title}</h4>
                       <p className="text-sm text-gray-500 relative z-10">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Sidebar Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-3xl p-8 text-white sticky top-32">
              <Sparkles className="text-brand-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">Hemen Başlayalım</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Bu hizmet için en iyi fiyatı ve müsaitlik durumunu öğrenmek için randevu oluşturun.
              </p>
              <button 
                onClick={() => onNavigate('booking')}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-500/20 hover:scale-[1.02]"
              >
                Online Randevu Al
              </button>
              <div className="mt-6 flex items-center justify-center gap-6">
                 <div className="text-center">
                    <p className="text-2xl font-bold">120+</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Tamamlanan</p>
                 </div>
                 <div className="w-px h-10 bg-gray-800"></div>
                 <div className="text-center">
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Ortalama</p>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
               <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Clock size={18} className="text-brand-600"/> Süre Bilgisi</h4>
               <p className="text-sm text-gray-600">
                 Bu hizmet ortalama <strong>4-6 saat</strong> sürmektedir. Alanın büyüklüğüne ve durumuna göre süre değişiklik gösterebilir.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};