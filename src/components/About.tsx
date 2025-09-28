'use client';

import { Award, Clock, Heart, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';


interface Testimonial {
  id: number;
  customer_name: string;
  rating: number;
  testimonial_text: string;
  photo_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

const About = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const result = await response.json();
        
        if (response.ok && result.data) {
          // Filter only active testimonials and sort by sort_order
          const activeTestimonials = result.data
            .filter((testimonial: Testimonial) => testimonial.is_active)
            .sort((a: Testimonial, b: Testimonial) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setTestimonials(activeTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep empty array if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Pasangan Bahagia",
      color: "purple"
    },
    {
      icon: Award,
      number: "5+",
      label: "Tahun Pengalaman",
      color: "light"
    },
    {
      icon: Heart,
      number: "100%",
      label: "Kepuasan Klien",
      color: "emerald"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Customer Support",
      color: "yellow"
    }
  ];

  return (
    <section id="about" className="py-20" style={{background: 'linear-gradient(to bottom, #f3f0f2, white)'}}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <Heart className="h-8 w-8 mr-2" style={{color: '#d4af37'}} fill="currentColor" />
            <span className="font-semibold text-lg" style={{color: '#d4af37'}}>
              Tentang Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Nanda Invitation
            </span>
            <br />
            <span style={{color: '#d4af37'}}>Wedding Vendor</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto mb-20">
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Mewujudkan Pernikahan Impian dengan 
              <span style={{color: '#7c5367'}}> Sentuhan Personal</span>
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Nanda Invitation adalah wedding vendor terpercaya yang telah berpengalaman lebih dari 5 tahun 
                dalam industri pernikahan. Kami memahami bahwa setiap pasangan memiliki visi unik untuk 
                hari bahagia mereka.
              </p>
              <p>
                Dengan tim kreatif yang berpengalaman, kami mengkhususkan diri dalam pembuatan undangan 
                pernikahan eksklusif dan hantaran yang berkesan. Setiap produk dibuat dengan perhatian 
                detail dan kualitas premium untuk memastikan momen spesial Anda menjadi tak terlupakan.
              </p>
              <p>
                Komitmen kami adalah memberikan pelayanan terbaik dengan harga yang terjangkau, 
                tanpa mengorbankan kualitas dan kepuasan klien.
              </p>
            </div>
            
            {/* Values */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{backgroundColor: '#52303f'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Kualitas Premium</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Material terbaik dengan finishing berkualitas tinggi</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#7c5367'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Desain Custom</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Setiap produk disesuaikan dengan tema dan preferensi Anda</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#52303f'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Tepat Waktu</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Pengerjaan sesuai timeline yang telah disepakati</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#7c5367'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Harga Terjangkau</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Kualitas premium dengan harga yang kompetitif</p>
              </div>
            </div>
          </div>

          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20" data-aos="fade-up" data-aos-delay="600">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: stat.color === 'purple' ? '#f3f0f2' : stat.color === 'light' ? '#f8f6f7' : stat.color === 'emerald' ? '#e8e1e5' : '#ede7ea'}}>
                  <IconComponent className="h-8 w-8" style={{color: stat.color === 'purple' ? '#7c5367' : stat.color === 'light' ? '#b8a5b0' : stat.color === 'emerald' ? '#52303f' : '#d1c7cc'}} />
                </div>
                <div className="text-3xl font-bold mb-2" style={{color: stat.color === 'purple' ? '#52303f' : stat.color === 'light' ? '#7c5367' : stat.color === 'emerald' ? '#52303f' : '#7c5367'}}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Testimoni Customer</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman luar biasa dari pasangan yang telah mempercayai layanan kami
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="overflow-hidden relative">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading testimonials...</span>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="flex animate-scroll-left space-x-6">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div key={`first-${testimonial.id}`} className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
                  <div className="flex items-center mb-4">
                    {testimonial.photo_url ? (
                      <Image 
                        src={testimonial.photo_url} 
                        alt={testimonial.customer_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          // Fallback to Heart icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${testimonial.photo_url ? 'hidden' : ''}`} style={{background: index % 2 === 0 ? 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)' : 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                      <Heart className="h-6 w-6" style={{color: index % 2 === 0 ? '#7c5367' : '#b8a5b0'}} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{testimonial.customer_name}</h4>
                      <div className="flex" style={{color: '#d4af37'}}>
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{testimonial.testimonial_text}&rdquo;</p>
                </div>
              ))}
              
              {/* Second set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div key={`second-${testimonial.id}`} className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
                  <div className="flex items-center mb-4">
                    {testimonial.photo_url ? (
                      <Image 
                        src={testimonial.photo_url} 
                        alt={testimonial.customer_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          // Fallback to Heart icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${testimonial.photo_url ? 'hidden' : ''}`} style={{background: index % 2 === 0 ? 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)' : 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                      <Heart className="h-6 w-6" style={{color: index % 2 === 0 ? '#7c5367' : '#b8a5b0'}} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{testimonial.customer_name}</h4>
                      <div className="flex" style={{color: '#d4af37'}}>
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{testimonial.testimonial_text}&rdquo;</p>
                </div>
              ))}

              {/* Third set for extra smooth transition */}
              {testimonials.map((testimonial, index) => (
                <div key={`third-${testimonial.id}`} className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
                  <div className="flex items-center mb-4">
                    {testimonial.photo_url ? (
                      <Image 
                        src={testimonial.photo_url} 
                        alt={testimonial.customer_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          // Fallback to Heart icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${testimonial.photo_url ? 'hidden' : ''}`} style={{background: index % 2 === 0 ? 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)' : 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                      <Heart className="h-6 w-6" style={{color: index % 2 === 0 ? '#7c5367' : '#b8a5b0'}} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{testimonial.customer_name}</h4>
                      <div className="flex" style={{color: '#d4af37'}}>
                        {'★'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{testimonial.testimonial_text}&rdquo;</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;