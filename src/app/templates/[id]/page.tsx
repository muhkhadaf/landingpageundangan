'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Check, Eye, Heart, Share2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PackageModal from '@/components/PackageModal';

interface TemplateData {
  id: number;
  title: string;
  category: string;
  price: string | number;
  image_url?: string;
  images?: string[];
  description?: string;
  features?: string[];
  preview_link?: string;
  is_active?: boolean;
  specifications?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
  discount_percentage?: number;
  discount_start_date?: string;
  discount_end_date?: string;
  is_discount_active?: boolean;
}

interface Package {
  id: number;
  name: string;
  price: number;
  price_display: string;
  features: string[];
  is_popular?: boolean;
  sort_order?: number;
}

const TemplateDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Package modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);

  // Fetch packages for selected template
  const fetchPackagesForTemplate = async (templateId: number) => {
    try {
      setPackagesLoading(true);
      const response = await fetch(`/api/templates/${templateId}/packages`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const result = await response.json();
      const templatePackages = result.data || [];
      
      // If no packages found, use default packages
      if (templatePackages.length === 0) {
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
              "Unlimited tamu",
              "3x revisi gratis",
              "Support WhatsApp",
              "Galeri foto (10 foto)",
              "Musik background"
            ],
            is_popular: true,
            sort_order: 2
          },
          {
            id: 3,
            name: "Paket Ultimate",
            price: 350000,
            price_display: "Rp 350.000",
            features: [
              "Template undangan digital",
              "Unlimited tamu",
              "Unlimited revisi",
              "Support WhatsApp 24/7",
              "Galeri foto (20 foto)",
              "Musik background",
              "Video prewedding"
            ],
            is_popular: false,
            sort_order: 3
          }
        ]);
      } else {
        setPackages(templatePackages);
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      // Use default packages on error
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
        }
      ]);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleBuyNowClick = async () => {
    if (template) {
      await fetchPackagesForTemplate(template.id);
      setIsModalOpen(true);
    }
  };

  const handlePackageSelect = (packageData: Package, template: TemplateData) => {
    alert(`Anda memilih ${packageData.name} untuk template ${template.title}`);
    setIsModalOpen(false);
  };

  // Fetch template data from API
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/templates/${params.id}`);
        if (!response.ok) {
          throw new Error('Template not found');
        }
        const result = await response.json();
        setTemplate(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load template');
        console.error('Error fetching template:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (response.ok) {
          const result = await response.json();
          const allTemplates = result.data || [];
          // Filter out current template and get random 3 templates
          const filtered = allTemplates.filter((t: TemplateData) => t.id !== parseInt(params.id as string));
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setRelatedTemplates(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching related templates:', err);
      }
    };

if (params.id) {
        fetchTemplate();
        fetchRelatedTemplates();
      }
    }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52303f] mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail template...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <div className="space-x-4">
              <Link href="/templates" className="bg-[#52303f] text-white px-4 py-2 rounded-lg hover:bg-[#7c5367]">
                Kembali ke Template
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // No data state
  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Template tidak ditemukan</p>
            <Link href="/templates" className="bg-[#37c58c] text-white px-4 py-2 rounded-lg hover:bg-[#2da574]">
              Kembali ke Template
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Default images for gallery
  const defaultImages = [
    'bg-gradient-to-br from-[#37c58c]/30 to-[#2da574]/50',
    'bg-gradient-to-br from-[#37c58c]/40 to-[#1e8b5a]/60',
    'bg-gradient-to-br from-[#2da574]/30 to-[#37c58c]/50',
    'bg-gradient-to-br from-[#1e8b5a]/30 to-[#37c58c]/50'
  ];

  // Use template images from database or fallback to default
  const displayImages = (() => {
    if (template?.images && template.images.length > 0) {
      // Use template images from database (up to 4 images)
      const templateImages = template.images.slice(0, 4);
      // Fill remaining slots with default gradients if needed
      while (templateImages.length < 4) {
        templateImages.push(defaultImages[templateImages.length]);
      }
      return templateImages;
    }
    // Fallback to thumbnail + default images
    return template?.image_url ? [template.image_url, ...defaultImages.slice(1)] : defaultImages;
  })();


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#37c58c]">Home</Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-[#37c58c]">Templates</Link>
            <span>/</span>
            <span className="text-[#37c58c] font-semibold">{template.title}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <div 
                className={`w-full h-96 flex items-center justify-center relative ${
                  displayImages[selectedImage].startsWith('bg-') ? displayImages[selectedImage] : ''
                }`} 
                style={
                  !displayImages[selectedImage].startsWith('bg-') 
                    ? {backgroundImage: `url(${displayImages[selectedImage]})`, backgroundSize: 'cover', backgroundPosition: 'center'} 
                    : {}
                }
              >

                
                {/* Demo Button */}
                 <div className="absolute top-4 right-4">
                   <button className="bg-[#52303f] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7c5367] transition-colors flex items-center gap-2">
                     <Eye className="h-4 w-4" />
                     Live Demo
                   </button>
                 </div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg h-20 transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-[#52303f] ring-offset-2' : 'hover:opacity-80'
                  }`}
                >
                  <div 
                    className={`w-full h-full ${image.startsWith('bg-') ? image : ''}`}
                    style={!image.startsWith('bg-') ? {backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-[#52303f]/10 text-[#52303f] px-3 py-1 rounded-full text-sm font-semibold">
                   {template.category}
                 </span>
               </div>
              <h1 className="text-3xl font-bold text-[#52303f] mb-3">{template.title}</h1>
              <p className="text-gray-600 leading-relaxed">{template.description || 'Template undangan pernikahan modern dengan desain yang elegan dan responsif.'}</p>
              
              {/* Price Display */}
               <div className="bg-gradient-to-r from-[#52303f]/10 to-[#7c5367]/10 p-4 rounded-lg">
                 {(() => {
                   const numericPrice = typeof template.price === 'number' 
                     ? template.price 
                     : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                   
                   // Check if discount is active and valid
                   const isDiscountActive = template.is_discount_active && 
                     template.discount_percentage && 
                     template.discount_percentage > 0;
                   
                   const discountedPrice = isDiscountActive 
                     ? numericPrice * (1 - template.discount_percentage! / 100)
                     : numericPrice;

                   return (
                     <div>
                       {isDiscountActive && (
                         <div className="flex items-center gap-2 mb-2">
                           <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                             -{template.discount_percentage}% OFF
                           </span>
                           <span className="text-gray-500 line-through text-lg">
                             Rp {numericPrice.toLocaleString('id-ID')}
                           </span>
                         </div>
                       )}
                       <p className="text-2xl font-bold text-[#52303f]">
                         Rp {Math.round(discountedPrice).toLocaleString('id-ID')}
                       </p>
                     </div>
                   );
                 })()}
                 <p className="text-sm text-[#52303f]">Harga sudah termasuk customization</p>
               </div>
            </div>

            {/* Template Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Template</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {template.is_active ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kompatibilitas:</span>
                  <span className="font-medium">Semua Device</span>
                </div>
              </div>
            </div>

            {/* Template Package */}
             <div className="bg-gradient-to-r from-[#52303f]/10 to-[#7c5367]/10 p-6 rounded-lg">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Paket Template</h3>
               <div className="bg-white rounded-lg p-4 border-2 border-[#52303f]">
                 <div className="flex items-center justify-between">
                   <div>
                     <h4 className="font-semibold text-gray-800">Paket Lengkap</h4>
                     <p className="text-sm text-gray-600">Template siap pakai dengan customization</p>
                   </div>
                   <div className="text-right">
                     {(() => {
                       const numericPrice = typeof template.price === 'number' 
                         ? template.price 
                         : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                       
                       // Check if discount is active and valid
                       const isDiscountActive = template.is_discount_active && 
                         template.discount_percentage && 
                         template.discount_percentage > 0;
                       
                       const discountedPrice = isDiscountActive 
                         ? numericPrice * (1 - template.discount_percentage! / 100)
                         : numericPrice;

                       return (
                         <div>
                           {isDiscountActive && (
                             <div className="flex items-center justify-end gap-2 mb-1">
                               <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                 -{template.discount_percentage}%
                               </span>
                               <span className="text-gray-500 line-through text-sm">
                                 Rp {numericPrice.toLocaleString('id-ID')}
                               </span>
                             </div>
                           )}
                           <p className="text-2xl font-bold text-[#52303f]">
                             Rp {Math.round(discountedPrice).toLocaleString('id-ID')}
                           </p>
                         </div>
                       );
                     })()}
                   </div>
                 </div>
               </div>
             </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fitur yang Termasuk</h3>
              <div className="grid grid-cols-1 gap-2">
                {(() => {
                  // Use template features from database if available
                  if (template?.features && template.features.length > 0) {
                    return template.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                         <Check className="h-5 w-5 text-[#52303f]" />
                         <span className="text-gray-700">{feature}</span>
                       </div>
                    ));
                  }
                  
                  // Fallback to static features if no template features available
                  return [
                    'Template responsif untuk semua device',
                    'Customization nama pengantin',
                    'Galeri foto unlimited',
                    'Musik background',
                    'RSVP online',
                    'Live streaming integration',
                    'Google Maps lokasi',
                    'Support 24/7'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                       <Check className="h-5 w-5 text-[#52303f]" />
                       <span className="text-gray-700">{feature}</span>
                     </div>
                  ));
                })()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleBuyNowClick}
                className="w-full bg-gradient-to-r from-[#52303f] to-[#7c5367] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#7c5367] hover:to-[#52303f] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                 <ShoppingCart className="h-5 w-5" />
                 Beli Sekarang - {(() => {
                   const numericPrice = typeof template.price === 'number' 
                     ? template.price 
                     : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                   return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                 })()}
               </button>
              
              {template.preview_link && (
                <a 
                  href={template.preview_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Eye className="h-5 w-5" />
                  Preview Template Live
                </a>
              )}
              
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-[#52303f] text-[#52303f] px-6 py-3 rounded-lg font-semibold hover:bg-[#52303f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                   <Heart className="h-4 w-4" />
                   Wishlist
                 </button>
                <button className="flex-1 border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {template.specifications && Object.keys(template.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Spesifikasi Produk</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(template.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-semibold text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Templates */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Template Serupa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTemplates.length > 0 ? (
              relatedTemplates.map((relatedTemplate) => (
                <div key={relatedTemplate.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    {relatedTemplate.image_url ? (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: `url(${relatedTemplate.image_url})`}}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
                          <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2" fill="currentColor" />
                          <h3 className="font-bold text-blue-800 text-sm">{relatedTemplate.category}</h3>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{relatedTemplate.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedTemplate.description || 'Template undangan dengan desain yang menarik'}
                    </p>
                    <p className="text-xl font-bold text-[#52303f] mb-4">
                      {(() => {
                        const numericPrice = typeof relatedTemplate.price === 'number' 
                          ? relatedTemplate.price 
                          : parseInt(relatedTemplate.price.toString().replace(/[^0-9]/g, '')) || 0;
                        return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                      })()}
                    </p>
                    <Link 
                       href={`/templates/${relatedTemplate.id}`}
                       className="block w-full bg-[#37c58c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2da574] transition-colors text-center"
                     >
                       Lihat Detail
                     </Link>
                  </div>
                </div>
              ))
            ) : (
              // Loading state for related templates
              [1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Package Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={template}
        packages={packages}
        onPackageSelect={handlePackageSelect}
      />
    </div>
  );
};

export default TemplateDetailPage;