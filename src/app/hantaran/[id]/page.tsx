'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Check, Clock, Gift, Heart, Package, Share2, ShoppingCart, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface HantaranData {
  id: number;
  name: string;
  category: string;
  price: string | number;
  items?: string;
  rating?: number;
  image_url?: string;
  description?: string;
  ingredients?: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const HantaranDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [hantaran, setHantaran] = useState<HantaranData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hantaran data based on ID
  useEffect(() => {
    const fetchHantaran = async () => {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/hantaran/${params.id}`);
        if (!response.ok) {
          throw new Error('Produk tidak ditemukan');
        }
        const result = await response.json();
        setHantaran(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data produk');
        console.error('Error fetching hantaran:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHantaran();
  }, [params.id]);

  // Default images for gallery
  const defaultImages = [
    "bg-gradient-to-br from-yellow-200 to-amber-300",
    "bg-gradient-to-br from-amber-200 to-orange-300",
    "bg-gradient-to-br from-orange-200 to-red-300",
    "bg-gradient-to-br from-yellow-300 to-amber-400"
  ];

  // Use actual image if available, otherwise use default gradients
  const displayImages = hantaran?.image_url 
    ? [hantaran.image_url, ...defaultImages.slice(1)] 
    : defaultImages;



  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail produk...</p>
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
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-red-800 mb-4">Produk Tidak Ditemukan</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <div className="space-y-3">
                <Link href="/hantaran" className="block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                  Kembali ke Daftar Hantaran
                </Link>
                <button 
                  onClick={() => window.location.reload()}
                  className="block w-full border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // No data state
  if (!hantaran) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-gray-600">Data produk tidak tersedia</p>
            <Link href="/hantaran" className="inline-block mt-4 bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
              Kembali ke Daftar Hantaran
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/hantaran" className="hover:text-yellow-600">Hantaran</Link>
            <span>/</span>
            <span className="text-yellow-600 font-semibold">{hantaran.name}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <div className={`w-full h-96 ${displayImages[selectedImage]} flex items-center justify-center relative`} style={hantaran?.image_url && selectedImage === 0 ? {backgroundImage: `url(${hantaran.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                {/* Mock hantaran preview */}
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center max-w-[280px]">
                  <Gift className="h-12 w-12 text-yellow-600 mx-auto mb-4" fill="currentColor" />
                  <h3 className="font-bold text-yellow-800 text-lg mb-2">{hantaran.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{hantaran.items || 'Paket Lengkap'}</p>
                  {hantaran.rating && (
                    <div className="flex justify-center items-center gap-1 mb-4">
                      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                      <span className="text-sm font-semibold">{hantaran.rating}</span>
                    </div>
                  )}
                  <div className="w-full h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded"></div>
                </div>
                
                {/* Package Badge */}
                <div className="absolute top-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold">
                  {hantaran.category}
                </div>
                
                {/* Items Count */}
                {hantaran.items && (
                  <div className="absolute top-4 right-4 bg-white/90 text-yellow-800 px-4 py-2 rounded-lg font-semibold">
                    {hantaran.items}
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg h-20 transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-yellow-500 ring-offset-2' : 'hover:opacity-80'
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
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {hantaran.category}
                </span>
                {hantaran.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span className="font-semibold">{hantaran.rating}</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-yellow-800 mb-3">{hantaran.name}</h1>
              <p className="text-gray-600 leading-relaxed">{hantaran.description || 'Paket hantaran berkualitas tinggi dengan berbagai pilihan item menarik.'}</p>
            </div>

            {/* Price Display */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Harga Mulai Dari</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {typeof hantaran.price === 'string' ? hantaran.price : `Rp ${hantaran.price?.toLocaleString('id-ID')}`}
                  </p>
                </div>
                {hantaran.items && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Jumlah Item</p>
                    <p className="text-lg font-semibold text-gray-800">{hantaran.items}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            {hantaran.ingredients && hantaran.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Isi Paket</h3>
                <div className="grid grid-cols-1 gap-2">
                  {hantaran.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  hantaran.is_active !== false ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-semibold ${
                  hantaran.is_active !== false ? 'text-green-800' : 'text-red-800'
                }`}>
                  {hantaran.is_active !== false ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>
              {hantaran.is_active !== false && (
                <p className="text-sm text-green-600 mt-2">
                  Produk ini siap untuk dipesan dan akan diproses dalam 3-5 hari kerja.
                </p>
              )}
            </div>

            {/* Service Info */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Clock className="h-6 w-6 text-yellow-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-800">3-5 Hari</span>
                  <span className="text-xs text-gray-600">Persiapan</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="h-6 w-6 text-yellow-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-800">Free Delivery</span>
                  <span className="text-xs text-gray-600">Jabodetabek</span>
                </div>
                <div className="flex flex-col items-center">
                  <Gift className="h-6 w-6 text-yellow-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-800">Fresh Guarantee</span>
                  <span className="text-xs text-gray-600">100% Segar</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <ShoppingCart className="h-5 w-5" />
                Beli Sekarang - {typeof hantaran?.price === 'number' ? `Rp ${hantaran.price.toLocaleString('id-ID')}` : hantaran?.price || 'Hubungi Kami'}
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
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

        {/* Product Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Informasi Produk</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-700">Kategori</span>
                <span className="text-gray-600">{hantaran?.category || 'Hantaran'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-700">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  hantaran?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {hantaran?.is_active ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>
              {hantaran?.items && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Jumlah Item</span>
                  <span className="text-gray-600">{hantaran.items}</span>
                </div>
              )}
              {hantaran?.rating && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600">{hantaran.rating}/5</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pengiriman Gratis</h3>
              <p className="text-sm text-gray-600">Gratis ongkir untuk area Jabodetabek</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Siap Tepat Waktu</h3>
              <p className="text-sm text-gray-600">Dijamin siap sesuai jadwal acara</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Kualitas Terjamin</h3>
              <p className="text-sm text-gray-600">Bahan berkualitas dan kemasan menarik</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Paket Hantaran Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                <div className="relative h-48 bg-gradient-to-br from-emerald-200 to-green-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
                    <Package className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-bold text-emerald-800 text-sm">Paket {item}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Paket Hantaran {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Paket hantaran berkualitas dengan harga terjangkau</p>
                  <p className="text-xl font-bold text-yellow-600 mb-4">Rp 1.800.000</p>
                  <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
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

export default HantaranDetailPage;