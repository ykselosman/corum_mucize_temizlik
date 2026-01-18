import React, { useState } from 'react';
import { useData } from '../context/AppointmentContext';
import { CheckCircle } from 'lucide-react';
import { getIconComponent } from '../utils/iconMapper';

export const Quote: React.FC = () => {
  const { services, loading } = useData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    squareMeters: '',
    roomCount: '1+1',
    date: '',
    name: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (id: string) => {
    setFormData(prev => ({ ...prev, serviceType: id }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.serviceType) {
        alert("Lütfen bir hizmet türü seçiniz.");
        return;
    }
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success state
  };

  if (loading) return <div className="text-center p-10">Yükleniyor...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Hızlı Fiyat Teklifi Al</h1>
          <p className="text-gray-600 mt-2">Birkaç basit adımda size özel fiyatı öğrenin.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Hangi hizmeti almak istiyorsunuz?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map(s => (
                            <div 
                                key={s.id}
                                onClick={() => handleServiceSelect(s.id)}
                                className={`cursor-pointer p-4 border-2 rounded-xl flex items-center gap-4 transition-all ${formData.serviceType === s.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-brand-300'}`}
                            >
                                <div className={`${formData.serviceType === s.id ? 'text-brand-600' : 'text-gray-400'}`}>
                                    {getIconComponent(s.icon)}
                                </div>
                                <span className="font-medium text-gray-900">{s.title}</span>
                                {formData.serviceType === s.id && <div className="ml-auto text-brand-600"><CheckCircle size={20}/></div>}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end pt-4">
                        <button onClick={nextStep} className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition">
                            Devam Et
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Detaylar ve İletişim</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ev Tipi / Büyüklüğü</label>
                            <select 
                                name="roomCount" 
                                value={formData.roomCount} 
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            >
                                <option value="1+0">Stüdyo (1+0)</option>
                                <option value="1+1">1+1</option>
                                <option value="2+1">2+1</option>
                                <option value="3+1">3+1</option>
                                <option value="4+1">4+1 ve üzeri</option>
                                <option value="villa">Villa / Müstakil</option>
                                <option value="ofis">Ofis / İşyeri</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tahmini Metrekare</label>
                            <input 
                                type="number" 
                                name="squareMeters" 
                                placeholder="Örn: 120"
                                value={formData.squareMeters}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">İstenen Tarih</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    required
                                    placeholder="05XX XXX XX XX"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ek Notlar (Opsiyonel)</label>
                            <textarea 
                                name="notes" 
                                rows={3}
                                value={formData.notes}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button type="button" onClick={prevStep} className="text-gray-600 font-medium px-6 py-3 hover:bg-gray-100 rounded-lg transition">
                            Geri Dön
                        </button>
                        <button type="submit" className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition">
                            Teklifi Gönder
                        </button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Talebiniz Alındı!</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Sayın {formData.name}, hizmet talebiniz bize ulaştı. Ekibimiz en kısa sürede <strong>{formData.phone}</strong> numarasından sizinle iletişime geçerek fiyat teklifini sunacaktır.
                    </p>
                    <button onClick={() => window.location.reload()} className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition">
                        Anasayfaya Dön
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};