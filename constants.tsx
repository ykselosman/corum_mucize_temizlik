import { Testimonial } from './types';

// Services are now fetched dynamically from Supabase.
// Keeping Testimonials static for now, but they could also be moved to DB.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Ev Hanımı",
    comment: "Çorum'da bulabileceğiniz en iyi temizlik şirketi. Ekip çok saygılı ve işini titizlikle yapıyor. Mucize Temizlik ekibine teşekkürler!",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "İşletme Sahibi",
    comment: "Ofisimiz için düzenli hizmet alıyoruz. Sabah geldiğimizde her yer mis gibi kokuyor. Profesyonellik arayanlara tavsiye ederim.",
    rating: 5
  },
  {
    id: 3,
    name: "Elif Kaya",
    role: "Öğretmen",
    comment: "İnşaat sonrası temizlik için çağırdım, gerçekten 'mucize' gibi temizlediler. O kadar tozu nasıl yok ettiler inanamadım.",
    rating: 4
  }
];

export const CONTACT_INFO = {
  address: "Gazi Caddesi, No: 123, Merkez / Çorum",
  phone: "+90 (364) 222 33 44",
  email: "bilgi@mucizetemizlik.com",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48685.23274268616!2d34.9255675!3d40.5491176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x408636594c3c33d1%3A0x7c0598686766444!2zw4dvcnVtLCBNZXJrZXovw4dvcnVt!5e0!3m2!1str!2str!4v1698765432100!5m2!1str!2str"
};