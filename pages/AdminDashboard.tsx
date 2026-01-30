import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, X, Clock, MapPin, Phone, Search, Lock, LogOut, Trash2, Plus, Sparkles, Image as ImageIcon, Mail, MessageSquare, Users, ExternalLink, RefreshCw, Pencil, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useData } from '../context/AppointmentContext';
import { iconOptions, getIconComponent } from '../utils/iconMapper';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { 
    appointments, 
    services, 
    messages, 
    updateStatus, 
    deleteAppointment, 
    addService, 
    updateService, 
    deleteService, 
    deleteMessage, 
    getStats, 
    loading 
  } = useData();

  const [activeTab, setActiveTab] = useState<'appointments' | 'calendar' | 'services' | 'messages' | 'customers'>('appointments');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Service Management States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    icon: 'Sparkles',
    image: '',
    basePrice: 0
  });

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  const stats = getStats();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         apt.customerPhone.includes(searchTerm) ||
                         apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
        case 'pending': return 'Bekliyor';
        case 'approved': return 'Onaylandı';
        case 'completed': return 'Tamamlandı';
        case 'rejected': return 'Reddedildi';
        default: return status;
    }
  };

  const openAddService = () => {
    setEditingServiceId(null);
    setServiceFormData({ title: '', description: '', icon: 'Sparkles', image: '', basePrice: 0 });
    setIsServiceModalOpen(true);
  };

  const openEditService = (s: any) => {
    setEditingServiceId(s.id);
    setServiceFormData({ title: s.title, description: s.description, icon: s.icon, image: s.image, basePrice: s.basePrice });
    setIsServiceModalOpen(true);
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
        await updateService(editingServiceId, serviceFormData);
    } else {
        await addService(serviceFormData);
    }
    setIsServiceModalOpen(false);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    
    const calendarDays = [];
    // Adjust for Monday start if preferred, but keeping Sunday for standard 0-6 JS getDay()
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-fade-in overflow-hidden">
            <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-3">
                    <button 
                      onClick={handlePrevMonth} 
                      className="p-3 bg-white hover:bg-brand-50 text-gray-700 hover:text-brand-600 border border-gray-200 rounded-xl transition-all shadow-sm active:scale-95"
                      title="Önceki Ay"
                    >
                      <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={handleNextMonth} 
                      className="p-3 bg-white hover:bg-brand-50 text-gray-700 hover:text-brand-600 border border-gray-200 rounded-xl transition-all shadow-sm active:scale-95"
                      title="Sonraki Ay"
                    >
                      <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {dayNames.map(name => <div key={name} className="text-center text-xs font-bold text-gray-400 uppercase pb-4">{name}</div>)}
                {calendarDays.map((day, idx) => {
                    if (day === null) return <div key={idx} className="h-24 md:h-32 bg-gray-50/50 rounded-lg"></div>;
                    
                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayAppointments = appointments.filter(a => a.date === dateStr);

                    return (
                        <div key={idx} className={`h-24 md:h-32 border border-gray-100 rounded-xl p-2 transition hover:shadow-md relative group overflow-hidden ${dayAppointments.length > 0 ? 'bg-brand-50/20' : 'bg-white'}`}>
                            <span className="text-sm font-bold text-gray-400 absolute top-2 right-2">{day}</span>
                            <div className="mt-6 space-y-1">
                                {dayAppointments.slice(0, 3).map(a => (
                                    <div key={a.id} className={`text-[9px] md:text-[10px] p-1 rounded font-bold truncate border ${getStatusColor(a.status)}`}>
                                        {a.customerName.split(' ')[0]} - {a.serviceName}
                                    </div>
                                ))}
                                {dayAppointments.length > 3 && <div className="text-[9px] text-gray-500 font-bold px-1">+{dayAppointments.length - 3} daha...</div>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="bg-brand-500 p-2 rounded-lg text-white"><Lock size={20} /></div>
            <div>
                <h1 className="font-bold text-lg leading-none">Mucize Temizlik</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Admin Yönetim Paneli</p>
            </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition bg-white/10 px-4 py-2 rounded-lg">
            <LogOut size={16} /> Çıkış Yap
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Toplam Randevu', value: stats.total, icon: <CalendarIcon />, color: 'text-brand-600', bg: 'bg-brand-50' },
                { label: 'Bekleyenler', value: stats.pending, icon: <Clock />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Onaylananlar', value: stats.approved, icon: <Check />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Yeni Mesajlar', value: stats.messageCount, icon: <Mail />, color: 'text-purple-600', bg: 'bg-purple-50' }
            ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>{stat.icon}</div>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                </div>
            ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
                { id: 'appointments', label: 'Randevular', icon: <CalendarIcon size={18}/> },
                { id: 'calendar', label: 'Takvim Görünümü', icon: <RefreshCw size={18}/> },
                { id: 'customers', label: 'Müşteriler', icon: <Users size={18}/> },
                { id: 'services', label: 'Hizmetler', icon: <Sparkles size={18}/> },
                { id: 'messages', label: 'Mesajlar', icon: <MessageSquare size={18}/> },
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)} 
                    className={`px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin text-brand-600 mb-4"><RefreshCw size={40} /></div>
                <p className="text-gray-500 font-medium">Veriler yükleniyor...</p>
            </div>
        ) : (
            <>
                {activeTab === 'appointments' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Müşteri, telefon veya hizmet ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                {['all', 'pending', 'approved', 'completed', 'rejected'].map(f => (
                                    <button 
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${filter === f ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        {f === 'all' ? 'Hepsi' : getStatusLabel(f)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Appointments List */}
                        <div className="space-y-4">
                            {filteredAppointments.length === 0 ? (
                                <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                                    Randevu bulunamadı.
                                </div>
                            ) : filteredAppointments.map(apt => (
                                <div key={apt.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(apt.status)}`}>
                                                {getStatusLabel(apt.status).toUpperCase()}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900">{apt.customerName}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Sparkles size={16} className="text-brand-500" /> <span className="font-bold">{apt.serviceName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <CalendarIcon size={16} className="text-brand-500" /> {apt.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock size={16} className="text-brand-500" /> {apt.timeSlot}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={16} className="text-brand-500" /> {apt.customerPhone}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 lg:col-span-2">
                                                <MapPin size={16} className="text-brand-500" /> {apt.address}
                                            </div>
                                        </div>
                                        {apt.notes && (
                                            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 italic">
                                                <strong>Not:</strong> {apt.notes}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:flex-col lg:flex-row">
                                        {apt.status === 'pending' && (
                                            <button onClick={() => updateStatus(apt.id, 'approved')} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition">Onayla</button>
                                        )}
                                        {apt.status === 'approved' && (
                                            <button onClick={() => updateStatus(apt.id, 'completed')} className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition">Tamamlandı</button>
                                        )}
                                        {apt.status !== 'rejected' && apt.status !== 'completed' && (
                                            <button onClick={() => updateStatus(apt.id, 'rejected')} className="px-4 py-2 border border-red-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-50 transition">İptal Et</button>
                                        )}
                                        <button onClick={() => deleteAppointment(apt.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Sil">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'calendar' && renderCalendar()}

                {activeTab === 'customers' && (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fade-in">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Müşteri</th>
                                    <th className="px-6 py-4">Telefon</th>
                                    <th className="px-6 py-4">Toplam Randevu</th>
                                    <th className="px-6 py-4 text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {Array.from(new Set(appointments.map(a => a.customerPhone))).map(phone => {
                                    const customerApts = appointments.filter(a => a.customerPhone === phone);
                                    const name = customerApts[0].customerName;
                                    return (
                                        <tr key={phone} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-bold text-gray-900">{name}</td>
                                            <td className="px-6 py-4 text-gray-600">{phone}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-xs font-bold">
                                                    {customerApts.length} Hizmet
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a href={`tel:${phone}`} className="text-brand-600 hover:underline font-bold text-sm">Ara</a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={openAddService} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition shadow-lg">
                                <Plus size={20} /> Yeni Hizmet Ekle
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(s => (
                                <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                    <img src={s.image} className="h-40 w-full object-cover" alt={s.title} />
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl">{s.title}</h3>
                                            <div className="bg-brand-50 p-2 rounded-lg text-brand-600">{getIconComponent(s.icon)}</div>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-6">{s.description}</p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                            <span className="font-bold text-brand-600">₺{s.basePrice}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => openEditService(s)} className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition">
                                                    <Pencil size={20} />
                                                </button>
                                                <button onClick={() => deleteService(s.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="space-y-4 animate-fade-in">
                        {messages.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                                Mesaj bulunamadı.
                            </div>
                        ) : messages.map(msg => (
                            <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{msg.name}</h3>
                                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Mail size={14}/> {msg.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={14}/> {msg.phone}</span>
                                            <span className="flex items-center gap-1"><Clock size={14}/> {new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteMessage(msg.id)} className="text-gray-400 hover:text-red-600 p-2 rounded-lg transition">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed border border-gray-100">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
      </main>

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-slide-up">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-2xl font-bold text-gray-900">{editingServiceId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</h3>
                    <button onClick={() => setIsServiceModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>
                <form onSubmit={handleServiceSubmit} className="p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Hizmet Adı</label>
                        <input 
                            required
                            type="text" 
                            value={serviceFormData.title}
                            onChange={e => setServiceFormData({...serviceFormData, title: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            placeholder="Örn: Ofis Temizliği"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
                        <textarea 
                            required
                            rows={3}
                            value={serviceFormData.description}
                            onChange={e => setServiceFormData({...serviceFormData, description: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                            placeholder="Hizmet detaylarını yazın..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">İkon Seçimi</label>
                            <select 
                                value={serviceFormData.icon}
                                onChange={e => setServiceFormData({...serviceFormData, icon: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            >
                                {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Başlangıç Fiyatı (₺)</label>
                            <input 
                                required
                                type="number" 
                                value={serviceFormData.basePrice}
                                onChange={e => setServiceFormData({...serviceFormData, basePrice: Number(e.target.value)})}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Görsel URL (Unsplash önerilir)</label>
                        <input 
                            required
                            type="text" 
                            value={serviceFormData.image}
                            onChange={e => setServiceFormData({...serviceFormData, image: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                    <button type="submit" className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-500/20">
                        {editingServiceId ? 'Güncelle' : 'Kaydet'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};