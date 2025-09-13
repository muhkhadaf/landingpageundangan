'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Check, Eye, Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const TemplateDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('basic');

  // Mock data - in real app, this would be fetched based on params.id
  const template = {
    id: params.id,
    title: "Elegant Garden",
    category: "Modern",
    rating: 4.8,
    reviews: 127,
    price: {
      basic: 150000,
      premium: 250000,
      ultimate: 350000
    },
    description: "Template undangan pernikahan modern dengan sentuhan alam yang elegan. Desain ini menggabungkan keindahan alam dengan kemewahan modern, menciptakan undangan yang sempurna untuk hari bahagia Anda.",
    features: {
      basic: [
        "Responsive Design",
        "Custom Colors",
        "Basic Animation",
        "RSVP Form",
        "Location Map"
      ],
      premium: [
        "Responsive Design",
        "Custom Colors",
        "Advanced Animation",
        "RSVP Form",
        "Location Map",
        "Music Player",
        "Photo Gallery",
        "Love Story Timeline"
      ],
      ultimate: [
        "Responsive Design",
        "Custom Colors",
        "Premium Animation",
        "RSVP Form",
        "Location Map",
        "Music Player",
        "Photo Gallery",
        "Love Story Timeline",
        "Guest Book",
        "Live Streaming",
        "Custom Domain",
        "Analytics Dashboard"
      ]
    },
    specifications: {
      "Compatibility": "All devices (Mobile, Tablet, Desktop)",
      "Loading Speed": "< 3 seconds",
      "Customization": "Full color and text customization",
      "Support": "24/7 customer support",
      "Delivery": "Instant after payment",
      "Updates": "Free lifetime updates"
    },
    images: [
      "bg-gradient-to-br from-emerald-200 to-green-300",
      "bg-gradient-to-br from-emerald-300 to-teal-400",
      "bg-gradient-to-br from-green-200 to-emerald-300",
      "bg-gradient-to-br from-teal-200 to-emerald-300"
    ],
    demoUrl: "#",
    tags: ["Modern", "Elegant", "Nature", "Responsive", "Animated"]
  };

  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      price: template.price.basic,
      priceText: 'Rp 150.000',
      description: 'Paket dasar dengan fitur-fitur essential',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: template.price.premium,
      priceText: 'Rp 250.000',
      description: 'Paket lengkap dengan fitur advanced',
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: template.price.ultimate,
      priceText: 'Rp 350.000',
      description: 'Paket premium dengan semua fitur terbaru',
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
              <div className={`w-full h-96 ${template.images[selectedImage]} flex items-center justify-center relative`}>
                {/* Mock invitation preview */}
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center max-w-[280px]">
                  <Heart className="h-12 w-12 text-emerald-600 mx-auto mb-4" fill="currentColor" />
                  <h3 className="font-bold text-emerald-800 text-lg mb-2">John & Jane</h3>
                  <p className="text-sm text-gray-600 mb-3">25 Desember 2024</p>
                  <p className="text-xs text-gray-500 mb-4">Ballroom Hotel Mulia</p>
                  <div className="w-full h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded"></div>
                </div>
                
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
              {template.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg h-20 transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-emerald-500 ring-offset-2' : 'hover:opacity-80'
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
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {template.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  <span className="font-semibold">{template.rating}</span>
                  <span className="text-gray-500 text-sm">({template.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-emerald-800 mb-3">{template.title}</h1>
              <p className="text-gray-600 leading-relaxed">{template.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, index) => (
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
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{pkg.priceText}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fitur yang Termasuk</h3>
              <div className="grid grid-cols-1 gap-2">
                {template.features[selectedPackage as keyof typeof template.features].map((feature, index) => (
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
                Beli Sekarang - {packages.find(p => p.id === selectedPackage)?.priceText}
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