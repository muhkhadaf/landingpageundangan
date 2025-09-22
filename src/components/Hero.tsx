'use client';

import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden" style={{background: 'linear-gradient(to bottom right, #f3f0f2, white, #f8f6f7)'}}>
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{backgroundColor: '#7c5367'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full opacity-30 animate-bounce" style={{backgroundColor: '#7c5367'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-15 animate-pulse" style={{backgroundColor: '#7c5367'}}></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 rounded-full opacity-25 animate-bounce" style={{backgroundColor: '#7c5367'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6" data-aos="fade-right" data-aos-delay="100">
              <Sparkles className="h-8 w-8 mr-2" style={{color: '#d4af37'}} />
              <span className="font-semibold text-lg" style={{color: '#d4af37'}}>
                Wedding Vendor Terpercaya
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" data-aos="fade-up" data-aos-delay="200">
              <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                Wujudkan
              </span>
              <br />
              <span style={{color: '#d4af37'}}>
                Pernikahan
              </span>
              <br />
              <span style={{color: '#52303f'}}>
                Impian Anda
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Kami menyediakan layanan lengkap untuk pernikahan impian Anda dengan 
              <span className="font-semibold" style={{color: '#52303f'}}> undangan eksklusif</span> dan 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="400">
              <button className="text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center" style={{background: 'linear-gradient(to right, #7c5367, #52303f)'}} onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(to right, #52303f, #7c5367)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';
            }}>
                Lihat Paket Layanan
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{borderColor: '#d1c7cc', color: '#d1c7cc'}} onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#d1c7cc';
              target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = '#7c5367';
            }}>
                Konsultasi Gratis
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200" data-aos="fade-up" data-aos-delay="500">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#52303f'}}>500+</div>
                <div className="text-gray-600 font-medium">Pasangan Bahagia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#d1c7cc'}}>5+</div>
                <div className="text-gray-600 font-medium">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#52303f'}}>100%</div>
                <div className="text-gray-600 font-medium">Kepuasan Klien</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="300">
            <div className="relative rounded-3xl p-8 shadow-2xl m-6" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #e8dde2)'}}>
              {/* Hero Image */}
              <div className="aspect-square rounded-2xl overflow-hidden" data-aos="zoom-in" data-aos-delay="600">
                <Image 
                  src="/undangan_digital_hero.png" 
                  alt="Undangan Digital Pernikahan" 
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 px-4 py-2 rounded-full font-semibold shadow-lg transform rotate-12 flex items-center gap-2" style={{backgroundColor: '#d1c7cc', color: '#52303f'}}>
                <Sparkles className="h-4 w-4" />
                Premium Quality
              </div>
              <div className="absolute -bottom-2 -left-2 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform -rotate-12 flex items-center gap-2" style={{backgroundColor: '#7c5367'}}>
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