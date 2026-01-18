import React from 'react';
import { Page } from '../types';
import { Users, Target, Heart } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Hakkımızda</h1>
          <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Çorum'un Temizlik Mucizesi</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              2018 yılında Çorum'da "Temizlikte Mucize" sloganıyla yola çıkan firmamız, kısa sürede bölgenin en güvenilir temizlik şirketlerinden biri haline gelmiştir. Kuruluşumuzdan bu yana temel ilkemiz, müşterilerimize sadece temiz bir ortam değil, aynı zamanda sağlıklı ve huzurlu yaşam alanları sunmaktır.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Profesyonel ekipman parkurumuz, sürekli eğitim alan uzman kadromuz ve insan sağlığına zararsız, bakanlık onaylı temizlik ürünlerimizle fark yaratıyoruz. Ev temizliğinden endüstriyel temizliğe kadar geniş bir yelpazede hizmet veriyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Siz sevdiklerinize vakit ayırırken, biz zorlu temizlik işlerini üstleniyoruz.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://picsum.photos/seed/teamcleaning/800/600" 
              alt="Mucize Temizlik Ekibi" 
              className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-brand-50 p-8 rounded-xl text-center hover:-translate-y-2 transition duration-300">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-600">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Uzman Kadro</h3>
            <p className="text-gray-600">
              Her biri alanında deneyimli, güvenilir ve güler yüzlü personelimizle hizmetinizdeyiz.
            </p>
          </div>
          <div className="bg-brand-50 p-8 rounded-xl text-center hover:-translate-y-2 transition duration-300">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-600">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Misyonumuz</h3>
            <p className="text-gray-600">
              Müşteri memnuniyetini en üst düzeyde tutarak, hijyen standartlarını sürekli yükseltmek.
            </p>
          </div>
          <div className="bg-brand-50 p-8 rounded-xl text-center hover:-translate-y-2 transition duration-300">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-600">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Değerlerimiz</h3>
            <p className="text-gray-600">
              Dürüstlük, şeffaflık ve çevreye saygı, çalışma prensiplerimizin temel taşlarıdır.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gray-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Bizimle Tanışın</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
             Ofisimize kahve içmeye bekleriz. Size en uygun temizlik planını birlikte oluşturalım.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-bold transition"
          >
            İletişime Geç
          </button>
        </div>
      </div>
    </div>
  );
};
