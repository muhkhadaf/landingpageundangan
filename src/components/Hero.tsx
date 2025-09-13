'use client';

import { ArrowRight, Gift, Heart, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-300 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-emerald-300 rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6" data-aos="fade-right" data-aos-delay="100">
              <Sparkles className="h-8 w-8 text-yellow-500 mr-2" />
              <span className="text-emerald-700 font-semibold text-lg">
                Wedding Vendor Terpercaya
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" data-aos="fade-up" data-aos-delay="200">
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                Wujudkan
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                Pernikahan
              </span>
              <br />
              <span className="text-emerald-800">
                Impian Anda
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Kami menyediakan layanan lengkap untuk pernikahan impian Anda dengan 
              <span className="font-semibold text-emerald-700"> undangan eksklusif</span> dan 
              <span className="font-semibold text-yellow-600"> hantaran mewah</span> yang akan membuat hari spesial Anda tak terlupakan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="400">
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                Lihat Paket Layanan
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-yellow-500 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Konsultasi Gratis
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200" data-aos="fade-up" data-aos-delay="500">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-700">500+</div>
                <div className="text-gray-600 font-medium">Pasangan Bahagia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">5+</div>
                <div className="text-gray-600 font-medium">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-700">100%</div>
                <div className="text-gray-600 font-medium">Kepuasan Klien</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="300">
            <div className="relative bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-3xl p-8 shadow-2xl m-6">
              {/* Placeholder for wedding image */}
              <div className="aspect-square bg-gradient-to-br from-emerald-200 to-yellow-200 rounded-2xl flex items-center justify-center">
                <div className="text-center" data-aos="zoom-in" data-aos-delay="600">
                  <Heart className="h-24 w-24 text-emerald-600 mx-auto mb-4" fill="currentColor" />
                  <p className="text-emerald-700 font-semibold text-lg">Foto Pernikahan</p>
                  <p className="text-emerald-600">Momen Indah Bersama</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-emerald-800 px-4 py-2 rounded-full font-semibold shadow-lg transform rotate-12 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Premium Quality
              </div>
              <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform -rotate-12 flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Harga Terjangkau
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;