'use client';

import { ArrowRight, CheckCircle, Gift, Mail, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Mail,
      title: "Undangan Pernikahan",
      description: "Desain undangan eksklusif yang mencerminkan kepribadian dan tema pernikahan Anda",
      features: [
        "Desain custom sesuai tema",
        "Berbagai pilihan kertas premium",
        "Cetak digital & offset berkualitas tinggi",
        "Packaging mewah",
        "Revisi unlimited"
      ],
      price: "Mulai dari Rp 5.000",
      popular: false
    },
    {
      icon: Gift,
      title: "Hantaran Pernikahan",
      description: "Hantaran cantik dan bermakna yang akan memukau keluarga besar kedua belah pihak",
      features: [
        "Konsep hantaran unik & kreatif",
        "Dekorasi sesuai tema pernikahan",
        "Packaging premium & elegan",
        "Koordinasi pengiriman",
        "Konsultasi gratis"
      ],
      price: "Mulai dari Rp 150.000",
      popular: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <Star className="h-8 w-8 text-yellow-500 mr-2" fill="currentColor" />
            <span className="text-emerald-700 font-semibold text-lg">
              Layanan Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Paket Lengkap
            </span>
            <br />
            <span className="text-yellow-600">Pernikahan Impian</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
            Kami menyediakan layanan terbaik untuk mewujudkan pernikahan impian Anda dengan 
            sentuhan personal dan kualitas premium yang tak tertandingi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  service.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                }`}
                data-aos="fade-up"
                data-aos-delay={400 + (index * 200)}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                      ⭐ PALING POPULER
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                    index === 0 ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
                  }`}>
                    <IconComponent className={`h-10 w-10 ${
                      index === 0 ? 'text-emerald-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-emerald-700">{service.price}</span>
                      <span className="text-gray-500 text-sm block">per item</span>
                    </div>
                  </div>
                  <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center ${
                    index === 0 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 hover:from-yellow-600 hover:to-yellow-500'
                  }`}>
                    Pesan Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-600 to-yellow-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Butuh Paket Kombinasi?</h3>
            <p className="text-xl mb-6 opacity-90">
              Dapatkan diskon spesial untuk pemesanan undangan + hantaran sekaligus!
            </p>
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Konsultasi Paket Hemat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;