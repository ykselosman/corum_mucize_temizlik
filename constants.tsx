
import { Testimonial, BlogPost } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Ev Hanımı",
    comment: "Çorum'da bulabileceğiniz en iyi temizlik şirketi. Ekip çok saygılı ve işini titizlikle yapıyor.",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "İşletme Sahibi",
    comment: "Ofisimiz için düzenli hizmet alıyoruz. Profesyonellik arayanlara tavsiye ederim.",
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Kahve Lekesi Nasıl Çıkar?',
    excerpt: 'Evdeki doğal yöntemlerle en zorlu lekelerden kurtulmanın yolları...',
    image: 'https://images.unsplash.com/photo-1558317374-067df5f15430?auto=format&fit=crop&w=800&q=80',
    date: '12 Mayıs 2024',
    author: 'Mucize Ekibi'
  },
  {
    id: '2',
    title: 'Bahar Temizliği Rehberi',
    // Fix: Removed 'year' property which is not defined in BlogPost interface
    excerpt: 'Evinizi yaza hazırlarken dikkat etmeniz gereken 10 kritik nokta.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    date: '20 Nisan 2024',
    author: 'Mucize Ekibi'
  }
];

export const FAQS = [
  {
    question: 'Temizlik sırasında evde bulunmam gerekiyor mu?',
    answer: 'Hayır, profesyonel ve güvenilir ekibimize anahtarınızı teslim edebilirsiniz. Temizlik bitiminde kontrol için sizi arıyoruz.'
  },
  {
    question: 'Hangi temizlik ürünlerini kullanıyorsunuz?',
    answer: 'Sağlık Bakanlığı onaylı, anti-alerjik ve doğa dostu profesyonel temizlik ürünleri kullanıyoruz.'
  },
  {
    question: 'Randevu iptali yapabilir miyim?',
    answer: 'Randevunuzu 24 saat öncesine kadar ücretsiz olarak iptal edebilir veya erteleyebilirsiniz.'
  }
];

export const CERTIFICATES = [
  { name: 'TSE Hizmet Yeterlilik', icon: 'ShieldCheck' },
  { name: 'ISO 9001:2015', icon: 'CheckCircle' },
  { name: 'Hijyen Eğitimi Sertifikası', icon: 'Star' }
];

export const CONTACT_INFO = {
  address: "Ulukavak Mah. Akpınar 8.Sk, Merkez / Çorum",
  phone: "0 542 823 76 51",
  whatsapp: "905428237651",
  email: "bilgi@mucizetemizlik.com",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3031.2546913786045!2d34.94676677643297!3d40.55805254702533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40872a9d5763ee25%3A0xc0e1cd9e053e1aad!2zVWx1a2F2YWssIEFrcMSxbmFyIDguIFNrLiwgMTkwNDAgw4dvcnVtIE1lcmtlei_Dh29ydW0sIFTDvHJraXll!5e0!3m2!1str!2sch!4v1769804626189!5m2!1str!2sch"
};
