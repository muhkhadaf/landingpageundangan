'use client';

import { Eye, ShoppingCart, X, Check } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface Template {
  id: number;
  title: string;
  category: string;
  price: string;
  image_url?: string;
  images?: string[];
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  packages?: Package[];
}

interface Package {
  id: number;
  name: string;
  price: number;
  price_display: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}

const TemplateSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  // Fetch templates from API with packages
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/templates?is_active=true&limit=6&include_packages=true');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const result = await response.json();
        const templatesData = result.data || [];
        setTemplates(templatesData);
        
        // Set first category as default if no category is selected
        if (templatesData.length > 0 && !selectedCategory) {
          const firstCategory = templatesData[0].category;
          setSelectedCategory(firstCategory);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [selectedCategory]);

  // Get unique categories from templates
  const categories = Array.from(new Set(templates.map(t => t.category)));

  // Filter templates based on selected category
  const filteredTemplates = templates.filter(template => template.category === selectedCategory);

  // Fallback gradient colors for templates without images
  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-purple-200 to-purple-300',
      'bg-gradient-to-br from-amber-200 to-amber-300',
      'bg-gradient-to-br from-gray-200 to-slate-300',
      'bg-gradient-to-br from-pink-200 to-rose-300',
      'bg-gradient-to-br from-amber-200 to-orange-300',
      'bg-gradient-to-br from-blue-200 to-cyan-300'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-20" id="templates" style={{background: 'linear-gradient(to bottom, white, #f8f6f7)'}}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-4" style={{color: '#52303f'}}>
            Template Undangan Pilihan
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Koleksi template undangan pernikahan terbaik dengan desain elegan dan modern
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                selectedCategory === category
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 hover:shadow-md'
              }`}
              style={
                selectedCategory === category
                  ? { 
                      background: 'linear-gradient(to right, #7c5367, #52303f)',
                      color: 'white'
                    }
                  : { 
                      borderColor: '#7c5367',
                      backgroundColor: 'white',
                      color: '#374151'
                    }
              }
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#7c5367';
                  target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = 'white';
                  target.style.color = '#374151';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size="large" message="Memuat template..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-white px-4 py-2 rounded-lg transition-colors" style={{backgroundColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#52303f';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#7c5367';}}
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Templates Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {filteredTemplates.map((template, index) => (
            <div 
              key={template.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Template Preview */}
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                <div 
                  className={`w-full h-full ${template.image_url ? '' : getGradientClass(index)} flex items-center justify-center relative`} 
                  style={(() => {
                    // Use thumbnail (image_url) for card display
                    const thumbnailUrl = template.image_url;
                    return thumbnailUrl ? {
                      backgroundImage: `url(${thumbnailUrl})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center'
                    } : {};
                  })()}
                >
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Preview Template</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2" style={{color: '#52303f'}}>{template.title}</h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4" style={{color: '#d4af37'}}>
                  {(() => {
                    const numericPrice = typeof template.price === 'number' 
                      ? template.price 
                      : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                    return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                  })()}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={() => {
                      setSelectedTemplate(template);
                      // Gunakan packages dari template yang dipilih
                      if (template.packages && template.packages.length > 0) {
                        setPackages(template.packages);
                      } else {
                        // Fallback ke packages default jika template tidak memiliki packages
                        setPackages([
                          {
                            id: 1,
                            name: "Paket Basic",
                            price: 150000,
                            price_display: "Rp 150.000",
                            features: [
                              "Template undangan digital",
                              "Maksimal 100 tamu",
                              "1x revisi gratis",
                              "Support WhatsApp"
                            ],
                            is_popular: false,
                            sort_order: 1
                          },
                          {
                            id: 2,
                            name: "Paket Premium",
                            price: 250000,
                            price_display: "Rp 250.000",
                            features: [
                              "Template undangan digital",
                              "Maksimal 300 tamu",
                              "3x revisi gratis",
                              "Support WhatsApp",
                              "Musik background",
                              "Galeri foto (10 foto)"
                            ],
                            is_popular: true,
                            sort_order: 2
                          },
                          {
                            id: 3,
                            name: "Paket Deluxe",
                            price: 400000,
                            price_display: "Rp 400.000",
                            features: [
                              "Template undangan digital",
                              "Unlimited tamu",
                              "Unlimited revisi",
                              "Support WhatsApp 24/7",
                              "Musik background",
                              "Galeri foto (25 foto)",
                              "Video prewedding",
                              "Live streaming"
                            ],
                            is_popular: false,
                            sort_order: 3
                          }
                        ]);
                      }
                      setIsModalOpen(true);
                    }}
                    className="flex-1 text-white px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{background: 'linear-gradient(to right, #7c5367, #52303f)'}} 
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(to right, #52303f, #3d1f2a)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';
                    }}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm md:text-base">Beli</span>
                  </button>
                  <Link href={`/templates/${template.id}`}>
                    <button 
                      className="border-2 px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2" 
                      style={{borderColor: '#7c5367', color: '#7c5367'}} 
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = '#7c5367';
                        target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = 'transparent';
                        target.style.color = '#7c5367';
                      }}
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm md:text-base">Detail</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <Link href="/templates">
            <button 
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              style={{background: 'linear-gradient(to right, #d4af37, #f4e4a6)', color: '#52303f'}} 
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(to right, #f4e4a6, #f9f1c4)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(to right, #d4af37, #f4e4a6)';
              }}
            >
              Lihat Semua Template
            </button>
          </Link>
        </div>
      </div>

      {/* Modal Pilihan Paket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold" style={{color: '#52303f'}}>Pilih Paket untuk {selectedTemplate?.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Pilih paket yang sesuai dengan kebutuhan Anda</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
             <div className="p-3 sm:p-6">
                {/* Tampilkan packages dari template yang dipilih */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                    {packages.map((pkg) => (
                  <div 
                     key={pkg.id}
                     className={`relative border-2 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-lg min-h-[280px] sm:min-h-[350px] lg:min-h-[400px] flex flex-col ${
                       pkg.is_popular 
                         ? 'border-purple-500 bg-purple-50' 
                         : 'border-gray-200 hover:border-purple-300'
                     }`}
                   >
                    {pkg.is_popular && (
                       <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                         <span className="bg-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                           Terpopuler
                         </span>
                       </div>
                     )}
                    
                    <div className="text-center mb-3 sm:mb-4 lg:mb-6">
                       <h4 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2" style={{color: '#52303f'}}>{pkg.name}</h4>
                       <div className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4" style={{color: '#d4af37'}}>{pkg.price_display}</div>
                     </div>

                    <ul className="space-y-1 sm:space-y-2 lg:space-y-3 mb-3 sm:mb-6 lg:mb-8 flex-grow">
                       {pkg.features.map((feature, index) => (
                         <li key={index} className="flex items-start gap-1 sm:gap-2 lg:gap-3">
                           <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mt-0.5 flex-shrink-0" style={{color: '#7c5367'}} />
                           <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                         </li>
                       ))}
                     </ul>

                    <div className="mt-auto">
                       <button 
                         className={`w-full py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3 lg:px-4 rounded-md sm:rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                           pkg.is_popular
                             ? 'text-white shadow-lg'
                             : 'border-2'
                         }`}
                         style={pkg.is_popular ? {background: 'linear-gradient(to right, #7c5367, #52303f)'} : {borderColor: '#7c5367', color: '#7c5367'}}
                         onMouseEnter={(e) => {
                           const target = e.target as HTMLButtonElement;
                           if (pkg.is_popular) {
                             target.style.background = 'linear-gradient(to right, #52303f, #3d1f2a)';
                           } else {
                             target.style.backgroundColor = '#7c5367';
                             target.style.color = 'white';
                           }
                         }}
                         onMouseLeave={(e) => {
                           const target = e.target as HTMLButtonElement;
                           if (pkg.is_popular) {
                             target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';
                           } else {
                             target.style.backgroundColor = 'transparent';
                             target.style.color = '#7c5367';
                           }
                         }}
                         onClick={() => {
                           // Handle package selection
                           alert(`Anda memilih ${pkg.name} untuk template ${selectedTemplate?.title}`);
                           setIsModalOpen(false);
                         }}
                       >
                         Pilih Paket
                       </button>
                     </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
               <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
                 <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Informasi Tambahan:</h5>
                 <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                   <li>• Pembayaran dapat dilakukan melalui transfer bank atau e-wallet</li>
                   <li>• Proses pembuatan undangan 1-3 hari kerja setelah pembayaran</li>
                   <li>• Konsultasi gratis untuk semua paket</li>
                   <li>• Garansi revisi sesuai paket yang dipilih</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TemplateSection;