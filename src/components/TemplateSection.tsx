'use client';

import { Eye, ShoppingCart, Heart, X, Check } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Template {
  id: number;
  title: string;
  category: string;
  price: string;
  image_url?: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const TemplateSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const packages = [
    {
      id: 1,
      name: "Paket Basic",
      price: "Rp 150.000",
      features: [
        "Template undangan digital",
        "Maksimal 100 tamu",
        "1x revisi gratis",
        "Support WhatsApp"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Paket Premium",
      price: "Rp 250.000",
      features: [
        "Template undangan digital",
        "Maksimal 300 tamu",
        "3x revisi gratis",
        "Support WhatsApp",
        "Musik background",
        "Galeri foto (10 foto)"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Paket Deluxe",
      price: "Rp 400.000",
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
      popular: false
    }
  ];

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/templates?is_active=true&limit=6');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const result = await response.json();
        setTemplates(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Fallback gradient colors for templates without images
  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-emerald-200 to-green-300',
      'bg-gradient-to-br from-yellow-200 to-amber-300',
      'bg-gradient-to-br from-gray-200 to-slate-300',
      'bg-gradient-to-br from-pink-200 to-rose-300',
      'bg-gradient-to-br from-amber-200 to-orange-300',
      'bg-gradient-to-br from-blue-200 to-cyan-300'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50" id="templates">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-emerald-800 mb-4">
            Template Undangan Pilihan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Koleksi template undangan pernikahan terbaik dengan desain elegan dan modern
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat template...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Templates Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {templates.map((template, index) => (
            <div 
              key={template.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Template Preview */}
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                <div className={`w-full h-full ${template.image_url ? '' : getGradientClass(index)} flex items-center justify-center relative`} style={template.image_url ? {backgroundImage: `url(${template.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                  {/* Mock invitation preview */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg text-center max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px]">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-emerald-600 mx-auto mb-1 sm:mb-2" fill="currentColor" />
                    <h3 className="font-bold text-emerald-800 text-xs sm:text-sm mb-1">John & Jane</h3>
                    <p className="text-xs text-gray-600 mb-1 sm:mb-2">25 Des 2024</p>
                    <div className="w-full h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 rounded"></div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-emerald-600 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
                    {template.category}
                  </div>
                  
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
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-emerald-800 mb-1 sm:mb-2">{template.title}</h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-600 mb-2 sm:mb-3 md:mb-4">
                  {typeof template.price === 'string' ? template.price : `Rp ${template.price}`}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm md:text-base">Beli</span>
                  </button>
                  <Link href={`/templates/${template.id}`}>
                    <button className="border-2 border-emerald-600 text-emerald-600 px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2">
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
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Lihat Semua Template
            </button>
          </Link>
        </div>
      </div>

      {/* Modal Pilihan Paket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-emerald-800">Pilih Paket untuk {selectedTemplate?.title}</h3>
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
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                {packages.map((pkg) => (
                  <div 
                     key={pkg.id}
                     className={`relative border-2 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-lg min-h-[280px] sm:min-h-[350px] lg:min-h-[400px] flex flex-col ${
                       pkg.popular 
                         ? 'border-emerald-500 bg-emerald-50' 
                         : 'border-gray-200 hover:border-emerald-300'
                     }`}
                   >
                    {pkg.popular && (
                       <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                         <span className="bg-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                           Terpopuler
                         </span>
                       </div>
                     )}
                    
                    <div className="text-center mb-3 sm:mb-4 lg:mb-6">
                       <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-emerald-800 mb-1 sm:mb-2">{pkg.name}</h4>
                       <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-600 mb-2 sm:mb-4">{pkg.price}</div>
                     </div>

                    <ul className="space-y-1 sm:space-y-2 lg:space-y-3 mb-3 sm:mb-6 lg:mb-8 flex-grow">
                       {pkg.features.map((feature, index) => (
                         <li key={index} className="flex items-start gap-1 sm:gap-2 lg:gap-3">
                           <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                           <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                         </li>
                       ))}
                     </ul>

                    <div className="mt-auto">
                       <button 
                         className={`w-full py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3 lg:px-4 rounded-md sm:rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                           pkg.popular
                             ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 shadow-lg'
                             : 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                         }`}
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