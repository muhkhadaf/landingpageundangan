'use client';

import { Award, Clock, Heart, Users } from 'lucide-react';

const About = () => {
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
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div data-aos="fade-right" data-aos-delay="400">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Mewujudkan Pernikahan Impian dengan 
              <span style={{color: '#7c5367'}}> Sentuhan Personal</span>
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Eternal Bliss adalah wedding vendor terpercaya yang telah berpengalaman lebih dari 5 tahun 
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
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{backgroundColor: '#52303f'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Kualitas Premium</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Material terbaik dengan finishing berkualitas tinggi</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#f8f6f7'}}>
                <h4 className="font-semibold mb-2" style={{color: '#52303f'}}>Desain Custom</h4>
                <p className="text-sm" style={{color: '#7c5367'}}>Setiap produk disesuaikan dengan tema dan preferensi Anda</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#52303f'}}>
                <h4 className="font-semibold mb-2" style={{color: '#f3f0f2'}}>Tepat Waktu</h4>
                <p className="text-sm" style={{color: '#f3f0f2'}}>Pengerjaan sesuai timeline yang telah disepakati</p>
              </div>
              <div className="p-4 rounded-xl" style={{backgroundColor: '#f8f6f7'}}>
                <h4 className="font-semibold mb-2" style={{color: '#52303f'}}>Harga Terjangkau</h4>
                <p className="text-sm" style={{color: '#7c5367'}}>Kualitas premium dengan harga yang kompetitif</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative" data-aos="fade-left" data-aos-delay="500">
            <div className="rounded-3xl p-8 shadow-xl" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #f8f6f7)'}}>
              <div className="aspect-square rounded-2xl flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #e8e1e5, #ede7ea)'}}>
                <div className="text-center" data-aos="zoom-in" data-aos-delay="700">
                  <Users className="h-24 w-24 mx-auto mb-4" style={{color: '#7c5367'}} />
                  <p className="font-semibold text-lg" style={{color: '#52303f'}}>Tim Profesional</p>
                  <p style={{color: '#7c5367'}}>Berpengalaman & Kreatif</p>
                </div>
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
          <div className="flex animate-scroll-left space-x-6">
            {/* First set of testimonials */}
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)'}}>
                  <Heart className="h-6 w-6" style={{color: '#7c5367'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Andi & Sari</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Undangan yang dibuat sangat indah dan sesuai dengan tema pernikahan kami. Pelayanan sangat memuaskan!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                  <Heart className="h-6 w-6" style={{color: '#b8a5b0'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Budi & Maya</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Hantaran yang disiapkan sangat unik dan berkesan. Tamu undangan sampai terpukau melihatnya!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)'}}>
                  <Heart className="h-6 w-6" style={{color: '#7c5367'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Dika & Rina</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Tim yang sangat profesional dan responsif. Hasil akhir melebihi ekspektasi kami!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                  <Heart className="h-6 w-6" style={{color: '#b8a5b0'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Fajar & Dewi</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Proses pemesanan mudah dan hasilnya sangat memuaskan. Highly recommended!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)'}}>
                  <Heart className="h-6 w-6" style={{color: '#7c5367'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Hendra & Lisa</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Kualitas undangan premium dengan harga yang terjangkau. Terima kasih atas pelayanan terbaiknya!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                  <Heart className="h-6 w-6" style={{color: '#b8a5b0'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Indra & Putri</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Detail yang sangat diperhatikan dan hasil yang sempurna. Pernikahan kami jadi tak terlupakan!&rdquo;</p>
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #e8e1e5)'}}>
                  <Heart className="h-6 w-6" style={{color: '#7c5367'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Andi & Sari</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Undangan yang dibuat sangat indah dan sesuai dengan tema pernikahan kami. Pelayanan sangat memuaskan!&rdquo;</p>
            </div>
            
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg w-80">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #f8f6f7, #ede7ea)'}}>
                  <Heart className="h-6 w-6" style={{color: '#b8a5b0'}} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Budi & Maya</h4>
                  <div className="flex" style={{color: '#d4af37'}}>
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&ldquo;Hantaran yang disiapkan sangat unik dan berkesan. Tamu undangan sampai terpukau melihatnya!&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;