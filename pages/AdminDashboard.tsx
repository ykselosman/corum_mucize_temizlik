import React, { useState } from 'react';
import { Calendar, Check, X, Clock, MapPin, Phone, Search, Lock, LogOut, Trash2, Plus, Sparkles, Image as ImageIcon, Mail, MessageSquare, Users, ExternalLink, RefreshCw, Pencil } from 'lucide-react';
import { useData } from '../context/AppointmentContext';
import { iconOptions, getIconComponent } from '../utils/iconMapper';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Helper to convert Google Drive share links to direct image links
const convertDriveLink = (url: string) => {
    // Regex to find File ID
    const driveRegex = /\/d\/([-a-zA-Z0-9_]+)|\?id=([-a-zA-Z0-9_]+)/;
    const match = url.match(driveRegex);
    
    if (match) {
        const id = match[1] || match[2];
        // Returns a direct link that works in <img> tags
        return `https://lh3.googleusercontent.com/d/${id}`;
    }
    return url;
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { appointments, services, messages, updateStatus, deleteAppointment, addService, updateService, deleteService, deleteMessage, getStats, loading } = useData();
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'messages' | 'customers'>('appointments');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Service Form State
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: 'Sparkles',
    image: 'https://picsum.photos/seed/clean/800/600',
    basePrice: 0
  });

  const stats = getStats();

  // --- Logic for Customers Tab ---
  // Aggregate unique customers based on phone number
  const customers = Object.values(appointments.reduce((acc, curr) => {
    // Normalize phone number (simple cleanup)
    const cleanPhone = curr.customerPhone.replace(/\s/g, '');
    
    if (!acc[cleanPhone]) {
        acc[cleanPhone] = {
            name: curr.customerName,
            phone: curr.customerPhone,
            totalVisits: 0,
            totalSpent: 0,
            lastVisit: curr.createdAt
        };
    }
    
    acc[cleanPhone].totalVisits += 1;
    // Only add to spent if not rejected
    if (curr.status === 'completed' || curr.status === 'approved') {
        acc[cleanPhone].totalSpent += (curr.priceEstimate || 0);
    }
    
    // Check if this appointment is more recent
    if (new Date(curr.createdAt) > new Date(acc[cleanPhone].lastVisit)) {
        acc[cleanPhone].lastVisit = curr.createdAt;
        acc[cleanPhone].name = curr.customerName; // Update name to most recent used
    }

    return acc;
  }, {} as Record<string, { name: string, phone: string, totalVisits: number, totalSpent: number, lastVisit: string }>));

  // Filter Logic
  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredCustomers = customers.filter(c => 
     c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.phone.includes(searchTerm)
  );

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

  const handleAddService = async (e: React.FormEvent) => {
      e.preventDefault();
      // Ensure the link is converted before saving
      const finalService = {
          ...newService,
          image: convertDriveLink(newService.image)
      };

      if (editingId) {
          await updateService(editingId, finalService);
      } else {
          await addService(finalService);
      }
      
      setIsAddingService(false);
      setEditingId(null);
      setNewService({
        title: '',
        description: '',
        icon: 'Sparkles',
        image: 'https://picsum.photos/seed/clean/800/600',
        basePrice: 0
      });
  };

  const handleEditClick = (service: any) => {
      setEditingId(service.id);
      setNewService({
          title: service.title,
          description: service.description,
          icon: service.icon,
          image: service.image,
          basePrice: service.basePrice
      });
      setIsAddingService(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
      setIsAddingService(false);
      setEditingId(null);
      setNewService({
        title: '',
        description: '',
        icon: 'Sparkles',
        image: 'https://picsum.photos/seed/clean/800/600',
        basePrice: 0
      });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="bg-brand-500 p-2 rounded-lg">
                <Lock size={20} />
            </div>
            <div>
                <h1 className="font-bold text-lg leading-none">Yönetici Paneli</h1>
                <p className="text-xs text-gray-400">Mucize Temizlik Operasyon</p>
            </div>
        </div>
        <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
            <LogOut size={16} /> Çıkış Yap
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 md:space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button 
                onClick={() => setActiveTab('appointments')}
                className={`px-4 md:px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'appointments' ? 'bg-white text-brand-600 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
                <Calendar size={18} />
                Randevular
            </button>
            <button 
                onClick={() => setActiveTab('customers')}
                className={`px-4 md:px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'customers' ? 'bg-white text-brand-600 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
                <Users size={18} />
                Müşteriler
            </button>
            <button 
                onClick={() => setActiveTab('services')}
                className={`px-4 md:px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'services' ? 'bg-white text-brand-600 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
                <Sparkles size={18} />
                Hizmetler
            </button>
            <button 
                onClick={() => setActiveTab('messages')}
                className={`px-4 md:px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'messages' ? 'bg-white text-brand-600 shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
            >
                <MessageSquare size={18} />
                Mesajlar
                {messages.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
                )}
            </button>
        </div>

        {activeTab === 'appointments' && (
            <>
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Toplam Randevu</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Bekleyen</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Onaylanan</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Toplam Ciro (Tahmini)</p>
                        <p className="text-2xl font-bold text-green-600">₺{stats.earnings}</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-t-xl border-b border-gray-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                        {['all', 'pending', 'approved', 'completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {f === 'all' ? 'Tümü' : getStatusLabel(f)}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="İsim veya Hizmet ara..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 overflow-hidden">
                    {filteredAppointments.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                            <p>Randevu bulunamadı.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredAppointments.map((apt) => (
                                <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        {/* Info Section */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(apt.status)} uppercase`}>
                                                    {getStatusLabel(apt.status)}
                                                </span>
                                                <span className="text-gray-400 text-xs">#{apt.id.slice(0, 8)}</span>
                                                <span className="text-gray-400 text-xs">• {new Date(apt.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">{apt.customerName}</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <span className="w-5 text-center">🧹</span> <span className="font-medium text-brand-600">{apt.serviceName}</span>
                                                    <span className="text-gray-400 text-xs">(₺{apt.priceEstimate})</span>
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Calendar size={16} className="text-gray-400" /> {apt.date} • {apt.timeSlot}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Phone size={16} className="text-gray-400" /> <a href={`tel:${apt.customerPhone}`} className="hover:underline">{apt.customerPhone}</a>
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <MapPin size={16} className="text-gray-400" /> {apt.address}
                                                </p>
                                                {apt.notes && (
                                                    <div className="mt-3 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg">
                                                        <span className="font-bold">Not:</span> {apt.notes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions Section */}
                                        <div className="flex md:flex-col justify-end gap-2 min-w-[140px]">
                                            {apt.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => updateStatus(apt.id, 'approved')}
                                                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                                    >
                                                        <Check size={16} /> Onayla
                                                    </button>
                                                    <button 
                                                        onClick={() => updateStatus(apt.id, 'rejected')}
                                                        className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                                                    >
                                                        <X size={16} /> Reddet
                                                    </button>
                                                </>
                                            )}
                                            {apt.status === 'approved' && (
                                                <button 
                                                    onClick={() => updateStatus(apt.id, 'completed')}
                                                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                                >
                                                    <Check size={16} /> Tamamlandı
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => {
                                                    if(window.confirm('Bu randevuyu silmek istediğinize emin misiniz?')) {
                                                        deleteAppointment(apt.id);
                                                    }
                                                }}
                                                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 transition"
                                                title="Sil"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        )}

        {activeTab === 'customers' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Müşteri Listesi</h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Müşteri ara..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Müşteri</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">İletişim</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Toplam Hizmet</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Toplam Harcama</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Son Görülme</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((cust, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{cust.name}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <a href={`tel:${cust.phone}`} className="hover:text-brand-600 hover:underline">
                                            {cust.phone}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {cust.totalVisits}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-green-600">
                                        ₺{cust.totalSpent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-500 text-sm">
                                        {new Date(cust.lastVisit).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
             </div>
        )}

        {activeTab === 'services' && (
             <div className="space-y-6">
                 {/* Header & Add Button */}
                 <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-gray-800">Hizmet Listesi</h2>
                     <button 
                        onClick={() => {
                            setIsAddingService(!isAddingService);
                            if (isAddingService && editingId) {
                                cancelEdit();
                            }
                        }}
                        className={`text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition ${isAddingService ? 'bg-gray-500 hover:bg-gray-600' : 'bg-brand-600 hover:bg-brand-700'}`}
                     >
                        {isAddingService ? <X size={20} /> : <Plus size={20} />}
                        {isAddingService ? 'İptal' : 'Yeni Hizmet Ekle'}
                     </button>
                 </div>

                 {/* Add/Edit Service Form */}
                 {isAddingService && (
                     <div className="bg-white p-6 rounded-xl shadow-md border border-brand-100 animate-slide-up">
                         <h3 className="text-lg font-bold mb-4">{editingId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Oluştur'}</h3>
                         <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="col-span-1 md:col-span-2">
                                 <label className="block text-sm font-bold text-gray-700 mb-1">Hizmet Başlığı</label>
                                 <input 
                                    type="text" 
                                    required 
                                    value={newService.title}
                                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                 />
                             </div>
                             <div className="col-span-1 md:col-span-2">
                                 <label className="block text-sm font-bold text-gray-700 mb-1">Açıklama</label>
                                 <textarea 
                                    required 
                                    rows={2}
                                    value={newService.description}
                                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                 />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-1">Fiyat (₺)</label>
                                 <input 
                                    type="number" 
                                    required 
                                    min="0"
                                    value={newService.basePrice}
                                    onChange={(e) => setNewService({...newService, basePrice: parseInt(e.target.value) || 0})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                 />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-1">İkon</label>
                                 <select 
                                    value={newService.icon}
                                    onChange={(e) => setNewService({...newService, icon: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                 >
                                     {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                 </select>
                             </div>
                             <div className="col-span-1 md:col-span-2">
                                 <label className="block text-sm font-bold text-gray-700 mb-1">Görsel URL veya Drive Linki</label>
                                 <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input 
                                            type="url" 
                                            required 
                                            placeholder="https://drive.google.com/file/d/..."
                                            value={newService.image}
                                            onChange={(e) => setNewService({...newService, image: e.target.value})}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Google Drive klasörünüzdeki bir resmin "Bağlantıyı Paylaş" linkini yapıştırabilirsiniz.</p>
                                    </div>
                                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                        <img 
                                            src={convertDriveLink(newService.image)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100?text=Hata')} 
                                        />
                                    </div>
                                 </div>
                             </div>
                             <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-2">
                                 <button 
                                    type="button" 
                                    onClick={cancelEdit}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                 >
                                     İptal
                                 </button>
                                 <button 
                                    type="submit" 
                                    className="px-6 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700"
                                 >
                                     {editingId ? 'Değişiklikleri Kaydet' : 'Kaydet'}
                                 </button>
                             </div>
                         </form>
                     </div>
                 )}

                 {/* Services List */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {services.map((service) => (
                         <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group relative">
                             <div className="h-48 overflow-hidden relative">
                                 <img src={convertDriveLink(service.image)} alt={service.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                 <div className="absolute top-2 right-2 bg-white p-1.5 rounded-lg shadow-sm">
                                     {getIconComponent(service.icon, "w-5 h-5 text-brand-600")}
                                 </div>
                             </div>
                             <div className="p-5 flex-1 flex flex-col">
                                 <div className="flex justify-between items-start mb-2">
                                     <h3 className="font-bold text-gray-900 text-lg">{service.title}</h3>
                                     <span className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-sm font-bold">₺{service.basePrice}</span>
                                 </div>
                                 <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">{service.description}</p>
                                 <div className="flex gap-2">
                                     <button 
                                        onClick={() => handleEditClick(service)}
                                        className="flex-1 border border-blue-200 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                                     >
                                         <Pencil size={16} /> Düzenle
                                     </button>
                                     <button 
                                        onClick={() => {
                                            if(window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) {
                                                deleteService(service.id);
                                            }
                                        }}
                                        className="flex-1 border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2"
                                     >
                                         <Trash2 size={16} /> Sil
                                     </button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        )}

        {activeTab === 'messages' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-gray-800">Gelen Kutusu</h2>
                     <div className="text-gray-500 text-sm">
                        Toplam <strong>{messages.length}</strong> mesaj
                     </div>
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {messages.length === 0 ? (
                         <div className="p-12 text-center text-gray-500">
                             <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                             <p>Henüz mesajınız yok.</p>
                         </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {messages.map((msg) => (
                                <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-gray-900">{msg.name}</h3>
                                                <span className="text-gray-400 text-xs">• {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                                <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-brand-600">
                                                    <Mail size={14} /> {msg.email}
                                                </a>
                                                <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-brand-600">
                                                    <Phone size={14} /> {msg.phone}
                                                </a>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
                                                <p>{msg.message}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <button 
                                                onClick={() => {
                                                    if(window.confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
                                                        deleteMessage(msg.id);
                                                    }
                                                }}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Mesajı Sil"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                 </div>
            </div>
        )}
      </main>
    </div>
  );
};