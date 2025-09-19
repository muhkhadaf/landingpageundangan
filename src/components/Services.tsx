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
    <section id="services" className="py-20" style={{background: 'linear-gradient(to bottom, white, #f3f0f2)'}}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <Star className="h-8 w-8 mr-2" style={{color: '#d1c7cc'}} fill="currentColor" />
            <span className="font-semibold text-lg" style={{color: '#52303f'}}>
              Layanan Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Paket Lengkap
            </span>
            <br />
            <span style={{color: '#d1c7cc'}}>Pernikahan Impian</span>
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
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={service.popular ? {boxShadow: '0 0 0 4px rgba(209, 199, 204, 0.5)'} : {}}
                data-aos="fade-up"
                data-aos-delay={400 + (index * 200)}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-6 py-2 rounded-full font-bold text-sm shadow-lg" style={{background: 'linear-gradient(to right, #d1c7cc, #b8a5b0)', color: '#52303f'}}>
                      ⭐ PALING POPULER
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                       style={{background: index === 0 ? 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)' : 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                    <IconComponent className="h-10 w-10" style={{color: index === 0 ? '#7c5367' : '#b8a5b0'}} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" style={{color: '#7c5367'}} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold" style={{color: '#52303f'}}>{service.price}</span>
                      <span className="text-gray-500 text-sm block">per item</span>
                    </div>
                  </div>
                  <button className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                          style={{
                            background: index === 0 ? 'linear-gradient(to right, #7c5367, #52303f)' : 'linear-gradient(to right, #d1c7cc, #b8a5b0)',
                            color: index === 0 ? 'white' : '#52303f'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.background = index === 0 ? 'linear-gradient(to right, #52303f, #3d1f2a)' : 'linear-gradient(to right, #b8a5b0, #9d8a96)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.background = index === 0 ? 'linear-gradient(to right, #7c5367, #52303f)' : 'linear-gradient(to right, #d1c7cc, #b8a5b0)';
                          }}>
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
          <div className="rounded-3xl p-8 text-white" style={{background: 'linear-gradient(to right, #7c5367, #d1c7cc)'}}>
            <h3 className="text-3xl font-bold mb-4">Butuh Paket Kombinasi?</h3>
            <p className="text-xl mb-6 opacity-90">
              Dapatkan diskon spesial untuk pemesanan undangan + hantaran sekaligus!
            </p>
            <button className="bg-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{color: '#52303f'}}>
              Konsultasi Paket Hemat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;