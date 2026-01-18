import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, ChevronRight, ChevronLeft, CreditCard, Sparkles } from 'lucide-react';
import { Appointment, BookingStatus } from '../types';
import { useData } from '../context/AppointmentContext';
import { getIconComponent } from '../utils/iconMapper';

export const Booking: React.FC = () => {
  const { addAppointment, services, loading } = useData();
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  
  // Form State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [info, setInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    roomCount: '2+1' // Default
  });

  const selectedService = services.find(s => s.id === selectedServiceId);

  const nextStep = () => setStep(p => p + 1);
  const prevStep = () => setStep(p => p - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    // Create new appointment object
    const newAppointment: Omit<Appointment, 'id' | 'createdAt'> = {
      customerName: info.name,
      customerPhone: info.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      date: date,
      timeSlot: time,
      address: info.address,
      status: 'pending',
      notes: `${info.roomCount} - ${info.notes}`,
      priceEstimate: selectedService.basePrice
    };

    await addAppointment(newAppointment);
    setStep(4); // Success step
  };

  const steps = [
    { num: 1, title: 'Hizmet Seçimi' },
    { num: 2, title: 'Tarih & Saat' },
    { num: 3, title: 'Bilgileriniz' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Online Randevu Oluştur</h1>
          <div className="flex items-center justify-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 w-3/4 mx-auto"></div>
            {steps.map((s) => (
              <div key={s.num} className={`flex flex-col items-center mx-4 sm:mx-12 relative z-10 transition-all duration-500`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s.num ? 'bg-brand-600 text-white scale-110 shadow-lg shadow-brand-500/30' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                  {step > s.num ? <CheckCircle size={20} /> : s.num}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-brand-600' : 'text-gray-400'}`}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative transition-all duration-500 border border-gray-100">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="text-brand-500" /> Bir Hizmet Seçin
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 hover:shadow-md ${selectedServiceId === service.id ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200' : 'border-gray-100 hover:border-brand-200'}`}
                  >
                    <div className={`p-3 rounded-lg ${selectedServiceId === service.id ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {getIconComponent(service.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                         <h3 className="font-bold text-gray-900">{service.title}</h3>
                         <span className="text-sm font-bold text-brand-600">₺{service.basePrice}</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedServiceId === service.id ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-300'}`}>
                      {selectedServiceId === service.id && <CheckCircle size={14} />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  disabled={!selectedServiceId}
                  onClick={nextStep}
                  className="bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-500/30"
                >
                  Devam Et <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="text-brand-500" /> Tarih ve Saat Seçimi
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tercih Edilen Tarih</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none shadow-sm cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Saat Aralığı</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['09:00 - 13:00', '13:00 - 17:00', '17:00 - 21:00', 'Tam Gün'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`p-3 rounded-xl text-sm font-medium border transition-all ${time === slot ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105' : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-gray-50'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm flex items-start gap-3 border border-blue-100">
                <Clock className="shrink-0 mt-0.5" size={18} />
                <p>Seçtiğiniz saat aralığı tahmini başlangıç saatidir. Ekibimiz gelmeden 30 dakika önce sizi arayacaktır.</p>
              </div>

              <div className="mt-8 flex justify-between">
                <button 
                  onClick={prevStep}
                  className="text-gray-500 font-bold hover:text-gray-800 px-4 py-2"
                >
                  Geri Dön
                </button>
                <button 
                  disabled={!date || !time}
                  onClick={nextStep}
                  className="bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-500/30"
                >
                  Devam Et <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: User Info */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-8 animate-fade-in h-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-brand-500" /> İletişim ve Adres
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ad Soyad</label>
                      <input 
                        required
                        type="text" 
                        value={info.name}
                        onChange={(e) => setInfo({...info, name: e.target.value})}
                        className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 shadow-sm"
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefon</label>
                      <input 
                        required
                        type="tel" 
                        value={info.phone}
                        onChange={(e) => setInfo({...info, phone: e.target.value})}
                        className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none placeholder:text-gray-400 shadow-sm"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ev Tipi</label>
                      <select 
                        value={info.roomCount}
                        onChange={(e) => setInfo({...info, roomCount: e.target.value})}
                        className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none shadow-sm cursor-pointer"
                      >
                         <option>1+1</option>
                         <option>2+1</option>
                         <option>3+1</option>
                         <option>4+1 ve üzeri</option>
                         <option>Villa / Müstakil</option>
                         <option>Ofis</option>
                      </select>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Adres</label>
                      <textarea 
                        required
                        rows={3}
                        value={info.address}
                        onChange={(e) => setInfo({...info, address: e.target.value})}
                        className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none resize-none placeholder:text-gray-400 shadow-sm"
                        placeholder="Mahalle, Sokak, Apt No, Daire..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ek Notlar</label>
                      <textarea 
                        rows={2}
                        value={info.notes}
                        onChange={(e) => setInfo({...info, notes: e.target.value})}
                        className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none resize-none placeholder:text-gray-400 shadow-sm"
                        placeholder="Evde evcil hayvan var, vb."
                      />
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                <button 
                  type="button"
                  onClick={prevStep}
                  className="text-gray-500 font-bold hover:text-gray-800"
                >
                  Geri Dön
                </button>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">Tahmini Tutar</p>
                        <p className="text-xl font-bold text-brand-600">₺{selectedService?.basePrice}</p>
                    </div>
                    <button 
                    type="submit"
                    className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-0.5"
                    >
                    Randevuyu Onayla <CheckCircle size={20} />
                    </button>
                </div>
              </div>
            </form>
          )}

          {/* Success Step */}
          {step === 4 && (
             <div className="flex flex-col items-center justify-center h-full p-12 text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="text-green-600 w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Harika! Randevunuz Alındı.</h2>
                <p className="text-gray-600 max-w-md mb-8">
                    Talebiniz başarıyla oluşturuldu. Operasyon ekibimiz <strong>{info.phone}</strong> numarasından size ulaşarak kesin onay verecektir.
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-md mb-8 text-left border border-gray-200">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Hizmet:</span>
                        <span className="font-bold text-gray-900">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Tarih:</span>
                        <span className="font-bold text-gray-900">{date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Saat:</span>
                        <span className="font-bold text-gray-900">{time}</span>
                    </div>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                >
                    Anasayfaya Dön
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};