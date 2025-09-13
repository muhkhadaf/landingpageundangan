'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Check, Clock, Gift, Heart, Package, Share2, ShoppingCart, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const HantaranDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('standard');

  // Mock data - in real app, this would be fetched based on params.id
  const hantaran = {
    id: params.id,
    title: "Paket Hantaran Mewah",
    category: "Premium",
    rating: 4.9,
    reviews: 89,
    price: {
      standard: 2500000,
      deluxe: 3200000,
      royal: 4000000
    },
    description: "Paket hantaran premium dengan 9 dulang berisi makanan dan buah-buahan pilihan terbaik. Setiap dulang dikemas dengan indah dan disusun secara artistik untuk memberikan kesan mewah dan elegan pada prosesi pernikahan Anda.",
    items: {
      standard: 9,
      deluxe: 11,
      royal: 13
    },
    contents: {
      standard: [
        "Buah-buahan segar premium",
        "Kue tradisional pilihan",
        "Makanan ringan berkualitas",
        "Permen dan coklat import",
        "Minuman kemasan premium",
        "Dekorasi dulang mewah",
        "Kemasan gift box eksklusif",
        "Kartu ucapan personal",
        "Dokumentasi penyerahan"
      ],
      deluxe: [
        "Buah-buahan segar premium",
        "Kue tradisional pilihan",
        "Makanan ringan berkualitas",
        "Permen dan coklat import",
        "Minuman kemasan premium",
        "Dekorasi dulang mewah",
        "Kemasan gift box eksklusif",
        "Kartu ucapan personal",
        "Dokumentasi penyerahan",
        "Bunga segar untuk dekorasi",
        "Aksesoris tambahan (pita, ornamen)"
      ],
      royal: [
        "Buah-buahan segar premium",
        "Kue tradisional pilihan",
        "Makanan ringan berkualitas",
        "Permen dan coklat import",
        "Minuman kemasan premium",
        "Dekorasi dulang mewah",
        "Kemasan gift box eksklusif",
        "Kartu ucapan personal",
        "Dokumentasi penyerahan",
        "Bunga segar untuk dekorasi",
        "Aksesoris tambahan (pita, ornamen)",
        "Layanan antar khusus",
        "Setup dan arrangement di lokasi"
      ]
    },
    specifications: {
      "Jumlah Dulang": "9-13 dulang (tergantung paket)",
      "Waktu Persiapan": "3-5 hari kerja",
      "Area Pengiriman": "Jakarta, Bogor, Depok, Tangerang, Bekasi",
      "Garansi Kesegaran": "100% fresh guarantee",
      "Customization": "Warna dan tema sesuai permintaan",
      "Support": "Konsultasi gratis dengan wedding planner"
    },
    images: [
      "bg-gradient-to-br from-yellow-200 to-amber-300",
      "bg-gradient-to-br from-amber-200 to-orange-300",
      "bg-gradient-to-br from-orange-200 to-red-300",
      "bg-gradient-to-br from-yellow-300 to-amber-400"
    ],
    gallery: [
      {
        title: "Dulang Buah Premium",
        description: "Buah-buahan segar pilihan terbaik"
      },
      {
        title: "Kue Tradisional",
        description: "Kue-kue tradisional berkualitas tinggi"
      },
      {
        title: "Dekorasi Mewah",
        description: "Dekorasi dulang dengan sentuhan mewah"
      },
      {
        title: "Kemasan Eksklusif",
        description: "Kemasan gift box yang elegan"
      }
    ],
    tags: ["Premium", "Mewah", "Fresh", "Customizable", "Delivery"]
  };

  const packages = [
    {
      id: 'standard',
      name: 'Standard',
      price: hantaran.price.standard,
      priceText: 'Rp 2.500.000',
      items: hantaran.items.standard,
      description: 'Paket standar dengan 9 dulang berkualitas',
      popular: false
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      price: hantaran.price.deluxe,
      priceText: 'Rp 3.200.000',
      items: hantaran.items.deluxe,
      description: 'Paket deluxe dengan 11 dulang dan bonus dekorasi',
      popular: true
    },
    {
      id: 'royal',
      name: 'Royal',
      price: hantaran.price.royal,
      priceText: 'Rp 4.000.000',
      items: hantaran.items.royal,
      description: 'Paket royal dengan 13 dulang dan layanan premium',
      popular: false
    }
  ];

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
            <span className="text-yellow-600 font-semibold">{hantaran.title}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <div className={`w-full h-96 ${hantaran.images[selectedImage]} flex items-center justify-center relative`}>
                {/* Mock hantaran preview */}
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center max-w-[280px]">
                  <Gift className="h-12 w-12 text-yellow-600 mx-auto mb-4" fill="currentColor" />
                  <h3 className="font-bold text-yellow-800 text-lg mb-2">Hantaran Mewah</h3>
                  <p className="text-sm text-gray-600 mb-3">{hantaran.items[selectedPackage as keyof typeof hantaran.items]} Dulang</p>
                  <div className="flex justify-center items-center gap-1 mb-4">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span className="text-sm font-semibold">{hantaran.rating}</span>
                  </div>
                  <div className="w-full h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded"></div>
                </div>
                
                {/* Package Badge */}
                <div className="absolute top-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold">
                  {hantaran.category}
                </div>
                
                {/* Items Count */}
                <div className="absolute top-4 right-4 bg-white/90 text-yellow-800 px-4 py-2 rounded-lg font-semibold">
                  {hantaran.items[selectedPackage as keyof typeof hantaran.items]} Items
                </div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {hantaran.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg h-20 transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-yellow-500 ring-offset-2' : 'hover:opacity-80'
                  }`}
                >
                  <div className={`w-full h-full ${image}`}></div>
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
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  <span className="font-semibold">{hantaran.rating}</span>
                  <span className="text-gray-500 text-sm">({hantaran.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-yellow-800 mb-3">{hantaran.title}</h1>
              <p className="text-gray-600 leading-relaxed">{hantaran.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {hantaran.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pilih Paket</h3>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      selectedPackage === pkg.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-700 font-medium">{pkg.items} Dulang</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">{pkg.priceText}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contents */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Isi Paket</h3>
              <div className="grid grid-cols-1 gap-2">
                {hantaran.contents[selectedPackage as keyof typeof hantaran.contents].map((content, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">{content}</span>
                  </div>
                ))}
              </div>
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
                Beli Sekarang - {packages.find(p => p.id === selectedPackage)?.priceText}
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

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Spesifikasi Produk</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(hantaran.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Galeri Contoh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hantaran.gallery.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-48 ${hantaran.images[index % hantaran.images.length]} flex items-center justify-center`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
                    <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" fill="currentColor" />
                    <p className="text-sm font-semibold text-yellow-800">{item.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
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