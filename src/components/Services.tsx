'use client';

import { ArrowRight, CheckCircle, Gift, Mail, Package, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const result = await response.json();
        
        if (response.ok && result.data) {
          setServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gift':
        return Gift;
      case 'Package':
        return Package;
      case 'Mail':
      default:
        return Mail;
    }
  };

  return (
    <section id="services" className="py-20" style={{background: 'linear-gradient(to bottom, white, #f3f0f2)'}}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <Star className="h-8 w-8 mr-2" style={{color: '#d4af37'}} fill="currentColor" />
            <span className="font-semibold text-lg" style={{color: '#d4af37'}}>
              Layanan Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Paket Lengkap
            </span>
            <br />
            <span style={{color: '#d4af37'}}>Pernikahan Impian</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
            Kami menyediakan layanan terbaik untuk mewujudkan pernikahan impian Anda dengan 
            sentuhan personal dan kualitas premium yang tak tertandingi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl animate-pulse">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-6"></div>
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-6"></div>
                </div>
                <div className="space-y-3 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-12 bg-gray-300 rounded-full"></div>
              </div>
            ))
          ) : (
            services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <div
                  key={service.id || index}
                  className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  style={service.popular ? {boxShadow: '0 0 0 4px rgba(209, 199, 204, 0.5)'} : {}}
                  data-aos="fade-up"
                  data-aos-delay={400 + (index * 200)}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="inline-flex items-center px-4 py-2 rounded-full font-bold text-xs tracking-wide shadow-lg" style={{background: 'linear-gradient(135deg, #d4af37, #f4e4a6)', color: '#52303f'}}>
                        <span className="mr-1">⭐</span>
                        <span>PALING POPULER</span>
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                         style={{background: index === 0 ? 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)' : 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                      <IconComponent className="h-10 w-10" style={{color: '#7c5367'}} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{color: '#52303f'}}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
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
            })
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#7c5367] to-[#52303f] rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Butuh Paket Kombinasi?</h3>
            <p className="text-xl mb-6 opacity-90">
              Dapatkan penawaran terbaik dengan paket kombinasi yang disesuaikan dengan kebutuhan Anda.
            </p>
            <button className="bg-white text-[#7c5367] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Konsultasi Paket Hemat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;