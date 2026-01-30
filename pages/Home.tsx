import React, { useState } from 'react';
import { Page, ServiceItem } from '../types';
import { useData } from '../context/AppointmentContext';
import { getIconComponent } from '../utils/iconMapper';
import { FAQS, BLOG_POSTS, CERTIFICATES } from '../constants';
import { ShieldCheck, Clock, ArrowRight, Droplets, SprayCan, Star, ChevronDown, ChevronUp } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onServiceClick?: (service: ServiceItem) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onServiceClick }) => {
  const { services, loading } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble w-24 h-24 left-[10%] bottom-[-20px] animate-float opacity-40 bg-brand-200"></div>
          <div className="bubble w-16 h-16 left-[20%] bottom-[-20px] animate-float-delayed opacity-30 bg-teal-200"></div>
          <div className="bubble w-40 h-40 right-[5%] top-[20%] animate-pulse-slow opacity-20 bg-teal-100"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
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
                <button onClick={() => onNavigate('booking')} className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Clock size={20} /> Hemen Randevu Al
                </button>
                <div className="flex items-center gap-4">
                  {CERTIFICATES.map((cert, i) => (
                    <div key={i} className="flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity">
                      {getIconComponent(cert.icon, "w-6 h-6 text-brand-700")}
                      <span className="text-[10px] font-bold text-brand-900 mt-1 uppercase tracking-tighter">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative animate-fade-in">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="https://lh3.googleusercontent.com/d/1FMJFWT4EK_A7E17lvg_3GJx4i41gRsWy" alt="Çorum Profesyonel Temizlik - Mucize Temizlik" className="w-full h-auto object-cover" />
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-float-delayed">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck size={24} /></div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Güvence</p>
                        <p className="font-bold text-gray-800">%100 Memnuniyet</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
            ) : services.slice(0, 3).map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brand-200 flex flex-col h-full transform hover:-translate-y-2 cursor-pointer"
                onClick={() => onServiceClick ? onServiceClick(service) : onNavigate('services')}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  <img src={service.image} alt={`${service.title} - Çorum Temizlik`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                     <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Başlangıç</span>
                     <span className="text-brand-600 font-bold">₺{service.basePrice}</span>
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-white p-2.5 rounded-xl shadow-lg text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    {getIconComponent(service.icon)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{service.description}</p>
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
            <button onClick={() => onNavigate('services')} className="inline-flex items-center justify-center px-10 py-4 border-2 border-brand-100 rounded-full text-brand-700 bg-white hover:bg-brand-50 hover:border-brand-200 font-bold transition-all duration-300 shadow-sm hover:shadow-md">
                Tüm Hizmetleri Görüntüle
            </button>
          </div>
        </div>
      </section>

      {/* Before/After Transformation Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Gözle Görülür Fark</h2>
              <p className="text-gray-600">Mucize Temizlik kalitesini yakından inceleyin.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80', label: 'Mutfak Temizliği' },
                { before: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80', after: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80', label: 'Banyo Dezenfeksiyonu' }
              ].map((item, idx) => (
                <div key={idx} className="relative group rounded-3xl overflow-hidden shadow-xl h-80">
                   <img src={item.after} className="absolute inset-0 w-full h-full object-cover" alt={`${item.label} Sonrası`} />
                   <div className="absolute inset-0 w-full h-full object-cover animate-[reveal_4s_infinite_alternate]" style={{ clipPath: 'inset(0 50% 0 0)', backgroundImage: `url(${item.before})`, backgroundSize: 'cover' }}></div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full font-bold text-brand-600 shadow-lg">{item.label}</div>
                   </div>
                   <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">ÖNCE</div>
                   <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">SONRA</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Why Us? */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="animate-slide-up">
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
                      <div className="bg-brand-500 p-3 rounded-lg text-white shadow-lg shadow-brand-500/50">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 bg-brand-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl"></div>
                <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Mucize Temizlik Personeli" className="relative rounded-[2rem] shadow-2xl border-4 border-gray-800" />
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

      {/* Blog & Tips Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <div>
                 <h2 className="text-4xl font-extrabold text-gray-900">Temizlik Rehberi</h2>
                 <p className="text-gray-600 mt-2">Pratik bilgiler ve uzman tavsiyeleri.</p>
              </div>
              <button className="text-brand-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">Tümünü Gör <ArrowRight size={20}/></button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row border border-gray-100 hover:shadow-xl transition-all group">
                   <div className="md:w-1/3 h-48 md:h-full overflow-hidden">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={post.title} />
                   </div>
                   <div className="p-8 md:w-2/3 flex flex-col justify-center">
                      <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">{post.date}</span>
                      <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{post.title}</h3>
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>
                      <button className="text-gray-900 font-bold flex items-center gap-2">Haberin Devamı <ArrowRight size={16}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900">Merak Edilenler</h2>
              <p className="text-gray-600 mt-2">Hizmetlerimiz hakkında en çok sorulan sorular.</p>
           </div>
           
           <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-2 border-gray-50 rounded-2xl overflow-hidden">
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                   >
                      <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                      {openFaq === i ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-gray-400" />}
                   </button>
                   <div className={`transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                   </div>
                </div>
              ))}
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
          <p className="text-brand-100 text-xl mb-10">Online randevu sistemimizle 2 dakika içinde temizlik hizmetinizi planlayın.</p>
          <button onClick={() => onNavigate('booking')} className="bg-white text-brand-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-50 hover:scale-105 transition-all shadow-2xl">
            Randevu Oluştur
          </button>
        </div>
      </section>
    </div>
  );
};