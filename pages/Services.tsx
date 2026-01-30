
import React, { useState } from 'react';
import { useData } from '../context/AppointmentContext';
import { Page, ServiceItem } from '../types';
import { getIconComponent } from '../utils/iconMapper';
import { Star, MessageCircle, X, CheckCircle, AlertCircle, ArrowRight, Info } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: Page) => void;
  onServiceClick?: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, onServiceClick }) => {
  const { services, reviews, addReview, loading } = useData();
  
  // Modal State
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Form State
  const [reviewForm, setReviewForm] = useState({
      name: '',
      phone: '',
      rating: 5,
      comment: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleOpenReviews = (e: React.MouseEvent, serviceId: string) => {
      e.stopPropagation(); // Kart tıklamasını engelle
      setSelectedServiceId(serviceId);
      setIsReviewModalOpen(true);
      setSubmitStatus({ type: null, message: '' });
      setReviewForm({ name: '', phone: '', rating: 5, comment: '' });
  };

  const handleBookingClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Kart tıklamasını engelle
      onNavigate('booking');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedServiceId) return;

      const result = await addReview({
          serviceId: selectedServiceId,
          customerName: reviewForm.name,
          customerPhone: reviewForm.phone,
          rating: reviewForm.rating,
          comment: reviewForm.comment
      });

      if (result.success) {
          setSubmitStatus({ type: 'success', message: result.message });
          setReviewForm({ name: '', phone: '', rating: 5, comment: '' });
      } else {
          setSubmitStatus({ type: 'error', message: result.message });
      }
  };

  const selectedService = services.find(s => s.id === selectedServiceId);
  const serviceReviews = reviews.filter(r => r.serviceId === selectedServiceId);
  const averageRating = serviceReviews.length > 0 
      ? (serviceReviews.reduce((acc, curr) => acc + curr.rating, 0) / serviceReviews.length).toFixed(1) 
      : "0.0";

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evinizden ofisinize, her türlü mekan için profesyonel temizlik çözümleri sunuyoruz. İhtiyacınıza uygun paketi seçin, gerisini bize bırakın.
          </p>
        </div>

        {loading ? (
           <div className="text-center p-12 text-gray-500 text-xl">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const count = reviews.filter(r => r.serviceId === service.id).length;
              const avg = count > 0 
                ? (reviews.filter(r => r.serviceId === service.id).reduce((a, c) => a + c.rating, 0) / count).toFixed(1)
                : "Yeni";

              return (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer border border-transparent hover:border-brand-200"
                onClick={() => onServiceClick?.(service)}
              >
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-md text-brand-600">
                    {getIconComponent(service.icon)}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={12} fill="currentColor" className="text-yellow-400" /> {avg} ({count})
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                    <span className="bg-brand-100 text-brand-800 text-sm font-bold px-3 py-1 rounded-full">
                       ₺{service.basePrice}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onServiceClick?.(service); }}
                      className="w-full flex items-center justify-center gap-2 text-brand-600 font-bold text-sm py-2 hover:bg-brand-50 rounded-lg transition-colors"
                    >
                      Detaylı Bilgi ve Süreç <ArrowRight size={16} />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={(e) => handleOpenReviews(e, service.id)}
                          className="flex items-center justify-center gap-1 border border-gray-200 text-gray-500 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <MessageCircle size={14} /> Yorumlar
                        </button>
                        <button 
                          onClick={handleBookingClick}
                          className="flex items-center justify-center gap-1 bg-brand-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20"
                        >
                          <CheckCircle size={14} /> Randevu
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-16 bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Özel Bir Temizlik İhtiyacınız mı Var?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto font-medium">
              Listede olmayan özel talepleriniz için bizimle iletişime geçebilirsiniz. Size özel çözümler üretmekten mutluluk duyarız.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-xl"
            >
              Bize Ulaşın
            </button>
          </div>
          <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-blue-800 rounded-full opacity-30"></div>
          <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-blue-800 rounded-full opacity-30"></div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsReviewModalOpen(false)}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                  {/* Modal Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedService.title} - Yorumlar</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                             <span className="flex items-center text-yellow-500 font-bold"><Star size={14} fill="currentColor" className="mr-1"/> {averageRating}</span>
                             <span>•</span>
                             <span>{serviceReviews.length} Değerlendirme</span>
                          </div>
                      </div>
                      <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2">
                          <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6 mb-8">
                          {serviceReviews.length === 0 ? (
                              <div className="text-center text-gray-400 py-10 italic border-2 border-dashed border-gray-100 rounded-2xl">
                                  Henüz yorum yapılmamış. İlk yorumu siz yapın!
                              </div>
                          ) : (
                              serviceReviews.map(review => (
                                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className="font-bold text-gray-900">{review.customerName}</div>
                                          <div className="text-xs text-gray-400 font-medium">{new Date(review.createdAt).toLocaleDateString()}</div>
                                      </div>
                                      <div className="flex text-yellow-400 mb-3">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                                          ))}
                                      </div>
                                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                                  </div>
                              ))
                          )}
                      </div>

                      <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <MessageCircle size={18} className="text-brand-600"/> Deneyimini Paylaş
                          </h4>
                          
                          {submitStatus.type === 'success' ? (
                              <div className="bg-white text-green-700 p-6 rounded-xl flex flex-col items-center gap-3 text-center border border-green-100">
                                  <div className="bg-green-100 p-2 rounded-full"><CheckCircle size={32} /></div>
                                  <div>
                                      <p className="font-bold text-lg">Teşekkürler!</p>
                                      <p className="text-sm font-medium">{submitStatus.message}</p>
                                  </div>
                              </div>
                          ) : (
                              <form onSubmit={handleSubmitReview} className="space-y-4">
                                  {submitStatus.type === 'error' && (
                                      <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                                          <AlertCircle size={18} /> {submitStatus.message}
                                      </div>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <input 
                                          type="text" 
                                          required
                                          placeholder="Adınız Soyadınız"
                                          value={reviewForm.name}
                                          onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                                      />
                                      <input 
                                          type="tel" 
                                          required
                                          placeholder="Telefon (Sadece Kontrol İçin)"
                                          value={reviewForm.phone}
                                          onChange={e => setReviewForm({...reviewForm, phone: e.target.value})}
                                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                                      />
                                  </div>
                                  
                                  <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                                      <label className="text-xs font-bold text-gray-500 uppercase">Hizmet Puanı</label>
                                      <div className="flex gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                              <button
                                                  key={star}
                                                  type="button"
                                                  onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                  className="transition-transform hover:scale-125 p-1"
                                              >
                                                  <Star 
                                                      size={20} 
                                                      className={star <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                                                  />
                                              </button>
                                          ))}
                                      </div>
                                  </div>

                                  <textarea 
                                      required
                                      rows={3}
                                      placeholder="Temizlik kalitemiz nasıldı? Yorumlarınızı bekliyoruz..."
                                      value={reviewForm.comment}
                                      onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm"
                                  ></textarea>

                                  <button 
                                      type="submit"
                                      className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-500/20"
                                  >
                                      Yorumu Yayınla
                                  </button>
                                  <p className="text-[10px] text-gray-500 text-center font-medium">
                                      * Güvenlik gereği sadece hizmeti tamamlanmış müşterilerimizin yorumları yayınlanmaktadır.
                                  </p>
                              </form>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
