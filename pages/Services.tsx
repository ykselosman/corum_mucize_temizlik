import React, { useState } from 'react';
import { useData } from '../context/AppointmentContext';
import { Page } from '../types';
import { getIconComponent } from '../utils/iconMapper';
import { Star, MessageCircle, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
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

  const handleOpenReviews = (serviceId: string) => {
      setSelectedServiceId(serviceId);
      setIsReviewModalOpen(true);
      setSubmitStatus({ type: null, message: '' });
      setReviewForm({ name: '', phone: '', rating: 5, comment: '' });
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
          setReviewForm({ name: '', phone: '', rating: 5, comment: '' }); // Clear form
          // Close modal after 2 seconds
          setTimeout(() => {
             // Optional: close modal
          }, 2000);
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
              <div key={service.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-56 relative group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md text-brand-600">
                    {getIconComponent(service.icon)}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={12} fill="currentColor" className="text-yellow-400" /> {avg} ({count})
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <span className="bg-brand-100 text-brand-800 text-sm font-bold px-3 py-1 rounded-full">
                       ₺{service.basePrice}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <button 
                      onClick={() => handleOpenReviews(service.id)}
                      className="w-full border border-gray-200 text-gray-600 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} /> Yorumları Gör / Yap
                    </button>
                    <button 
                      onClick={() => onNavigate('booking')}
                      className="w-full bg-brand-50 text-brand-700 font-semibold py-2 rounded-lg hover:bg-brand-100 transition-colors"
                    >
                      Hemen Randevu Al
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-16 bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Özel Bir Temizlik İhtiyacınız mı Var?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Listede olmayan özel talepleriniz için bizimle iletişime geçebilirsiniz. Size özel çözümler üretmekten mutluluk duyarız.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Bize Ulaşın
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-blue-800 rounded-full opacity-50"></div>
          <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-blue-800 rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
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
                      <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={24} />
                      </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                      {/* Reviews List */}
                      <div className="space-y-6 mb-8">
                          {serviceReviews.length === 0 ? (
                              <div className="text-center text-gray-400 py-4 italic">
                                  Henüz yorum yapılmamış. İlk yorumu siz yapın!
                              </div>
                          ) : (
                              serviceReviews.map(review => (
                                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                      <div className="flex justify-between items-start mb-2">
                                          <div className="font-bold text-gray-800">{review.customerName}</div>
                                          <div className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                                      </div>
                                      <div className="flex text-yellow-400 mb-2">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                          ))}
                                      </div>
                                      <p className="text-gray-600 text-sm">{review.comment}</p>
                                  </div>
                              ))
                          )}
                      </div>

                      {/* Add Review Form */}
                      <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <MessageCircle size={18} className="text-brand-600"/> Deneyiminizi Paylaşın
                          </h4>
                          
                          {submitStatus.type === 'success' ? (
                              <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center gap-3">
                                  <CheckCircle size={24} />
                                  <div>
                                      <p className="font-bold">Teşekkürler!</p>
                                      <p className="text-sm">{submitStatus.message}</p>
                                  </div>
                              </div>
                          ) : (
                              <form onSubmit={handleSubmitReview} className="space-y-4">
                                  {submitStatus.type === 'error' && (
                                      <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
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
                                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                      />
                                      <input 
                                          type="tel" 
                                          required
                                          placeholder="Telefon (Kontrol için gerekli)"
                                          value={reviewForm.phone}
                                          onChange={e => setReviewForm({...reviewForm, phone: e.target.value})}
                                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                      />
                                  </div>
                                  
                                  <div>
                                      <label className="block text-sm text-gray-600 mb-1 font-semibold">Puanınız</label>
                                      <div className="flex gap-2">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                              <button
                                                  key={star}
                                                  type="button"
                                                  onClick={() => setReviewForm({...reviewForm, rating: star})}
                                                  className="transition-transform hover:scale-110"
                                              >
                                                  <Star 
                                                      size={24} 
                                                      className={star <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                                  />
                                              </button>
                                          ))}
                                      </div>
                                  </div>

                                  <textarea 
                                      required
                                      rows={3}
                                      placeholder="Hizmetimizden memnun kaldınız mı?"
                                      value={reviewForm.comment}
                                      onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                  ></textarea>

                                  <button 
                                      type="submit"
                                      className="w-full bg-brand-600 text-white font-bold py-2.5 rounded-lg hover:bg-brand-700 transition shadow-lg shadow-brand-500/20"
                                  >
                                      Yorumu Gönder
                                  </button>
                                  <p className="text-xs text-gray-500 text-center">
                                      * Yorum yapabilmek için bu hizmetten daha önce faydalanmış olmanız gerekmektedir.
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