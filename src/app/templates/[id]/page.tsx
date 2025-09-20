'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Check, Eye, Heart, Share2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface TemplateData {
  id: number;
  title: string;
  category: string;
  price: string | number;
  image_url?: string;
  description?: string;
  is_active?: boolean;
  specifications?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

const TemplateDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    if (params.id) {
      fetchTemplate();
    }
  }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
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
              <Link href="/templates" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
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
            <Link href="/templates" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
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
    'bg-gradient-to-br from-emerald-200 to-green-300',
    'bg-gradient-to-br from-emerald-300 to-teal-400',
    'bg-gradient-to-br from-green-200 to-emerald-300',
    'bg-gradient-to-br from-teal-200 to-emerald-300'
  ];

  // Use template image or default images
  const displayImages = template.image_url ? [template.image_url, ...defaultImages.slice(1)] : defaultImages;


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-emerald-600">Templates</Link>
            <span>/</span>
            <span className="text-emerald-600 font-semibold">{template.title}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <div className={`w-full h-96 ${displayImages[selectedImage]} flex items-center justify-center relative`} style={template?.image_url && selectedImage === 0 ? {backgroundImage: `url(${template.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>

                
                {/* Demo Button */}
                <div className="absolute top-4 right-4">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">
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
                    selectedImage === index ? 'ring-2 ring-emerald-500 ring-offset-2' : 'hover:opacity-80'
                  }`}
                >
                  <div 
                    className={`w-full h-full ${typeof image === 'string' && image.startsWith('bg-') ? image : ''}`}
                    style={typeof image === 'string' && image.startsWith('http') ? {backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}
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
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {template.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-emerald-800 mb-3">{template.title}</h1>
              <p className="text-gray-600 leading-relaxed">{template.description || 'Template undangan pernikahan modern dengan desain yang elegan dan responsif.'}</p>
              
              {/* Price Display */}
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-emerald-800">
                  {(() => {
                    const numericPrice = typeof template.price === 'number' 
                      ? template.price 
                      : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                    return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                  })()}
                </p>
                <p className="text-sm text-emerald-600">Harga sudah termasuk customization</p>
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
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paket Template</h3>
              <div className="bg-white rounded-lg p-4 border-2 border-emerald-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">Paket Lengkap</h4>
                    <p className="text-sm text-gray-600">Template siap pakai dengan customization</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      {(() => {
                        const numericPrice = typeof template.price === 'number' 
                          ? template.price 
                          : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                        return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fitur yang Termasuk</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
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
                    <Check className="h-5 w-5 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <ShoppingCart className="h-5 w-5" />
                Beli Sekarang - {(() => {
                  const numericPrice = typeof template.price === 'number' 
                    ? template.price 
                    : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                  return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                })()}
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
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
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                <div className="relative h-48 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
                    <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2" fill="currentColor" />
                    <h3 className="font-bold text-blue-800 text-sm">Template {item}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Related Template {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Template serupa dengan desain yang menarik</p>
                  <p className="text-xl font-bold text-emerald-600 mb-4">Rp 175.000</p>
                  <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemplateDetailPage;