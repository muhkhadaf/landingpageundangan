'use client';

import { Eye, ShoppingCart, Star, Package } from 'lucide-react';
import Link from 'next/link';

const HantaranSection = () => {
  const hantaranPackages = [
    {
      id: 1,
      name: "Paket Hantaran Mewah",
      category: "Premium",
      price: "Rp 2.500.000",
      items: "15 Item",
      rating: 4.9,
      image: "bg-gradient-to-br from-amber-200 to-yellow-300",
      description: "Paket lengkap dengan peralatan rumah tangga berkualitas tinggi"
    },
    {
      id: 2,
      name: "Paket Hantaran Tradisional",
      category: "Traditional",
      price: "Rp 1.800.000",
      items: "12 Item",
      rating: 4.8,
      image: "bg-gradient-to-br from-emerald-200 to-green-300",
      description: "Hantaran dengan sentuhan tradisional dan elegan"
    },
    {
      id: 3,
      name: "Paket Hantaran Modern",
      category: "Modern",
      price: "Rp 2.200.000",
      items: "14 Item",
      rating: 4.7,
      image: "bg-gradient-to-br from-blue-200 to-cyan-300",
      description: "Desain modern dengan fungsi praktis untuk kehidupan sehari-hari"
    },
    {
      id: 4,
      name: "Paket Hantaran Ekonomis",
      category: "Budget",
      price: "Rp 1.200.000",
      items: "10 Item",
      rating: 4.6,
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      description: "Pilihan terjangkau tanpa mengurangi kualitas dan keindahan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white" id="hantaran">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">
            Paket Hantaran Pernikahan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Koleksi paket hantaran lengkap dengan berbagai pilihan sesuai kebutuhan dan budget Anda
          </p>
        </div>

        {/* Hantaran Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {hantaranPackages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Package Preview */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <div className={`w-full h-full ${pkg.image} flex items-center justify-center relative`}>
                  {/* Mock hantaran preview */}
                  <div className="grid grid-cols-3 gap-4 p-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-emerald-600" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-yellow-500 text-emerald-800 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
                    {pkg.category}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    {pkg.rating}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Lihat Detail Paket</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-800 flex-1 pr-2">{pkg.name}</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {pkg.items}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">{pkg.description}</p>
                
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 mb-4 sm:mb-5 md:mb-6">{pkg.price}</p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm md:text-base">Beli</span>
                  </button>
                  <Link href={`/hantaran/${pkg.id}`}>
                    <button className="border-2 border-yellow-500 text-yellow-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-emerald-800 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm md:text-base">Detail</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <Link href="/hantaran">
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Lihat Semua Paket Hantaran
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HantaranSection;