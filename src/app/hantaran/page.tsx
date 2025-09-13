'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Eye, Gift, Grid, List, Package, Search, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const HantaranPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const hantaranPackages = [
    {
      id: 1,
      title: "Paket Hantaran Mewah",
      category: "Premium",
      price: 2500000,
      priceText: "Rp 2.500.000",
      image: "bg-gradient-to-br from-yellow-200 to-amber-300",
      description: "Paket hantaran premium dengan 9 dulang berisi makanan dan buah-buahan pilihan",
      items: 9,
      rating: 4.9,
      features: ["9 Dulang", "Buah Premium", "Makanan Tradisional", "Dekorasi Mewah"]
    },
    {
      id: 2,
      title: "Paket Hantaran Klasik",
      category: "Traditional",
      price: 1800000,
      priceText: "Rp 1.800.000",
      image: "bg-gradient-to-br from-emerald-200 to-green-300",
      description: "Paket hantaran tradisional dengan sentuhan klasik yang elegan",
      items: 7,
      rating: 4.8,
      features: ["7 Dulang", "Kue Tradisional", "Buah Segar", "Dekorasi Klasik"]
    },
    {
      id: 3,
      title: "Paket Hantaran Modern",
      category: "Modern",
      price: 2200000,
      priceText: "Rp 2.200.000",
      image: "bg-gradient-to-br from-purple-200 to-indigo-300",
      description: "Paket hantaran dengan desain modern dan contemporary",
      items: 8,
      rating: 4.7,
      features: ["8 Dulang", "Dessert Modern", "Fruit Arrangement", "Modern Design"]
    },
    {
      id: 4,
      title: "Paket Hantaran Ekonomis",
      category: "Budget",
      price: 1200000,
      priceText: "Rp 1.200.000",
      image: "bg-gradient-to-br from-blue-200 to-cyan-300",
      description: "Paket hantaran terjangkau namun tetap berkualitas dan menarik",
      items: 5,
      rating: 4.6,
      features: ["5 Dulang", "Kue Pilihan", "Buah Lokal", "Dekorasi Simple"]
    },
    {
      id: 5,
      title: "Paket Hantaran Royal",
      category: "Luxury",
      price: 3500000,
      priceText: "Rp 3.500.000",
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      description: "Paket hantaran super mewah dengan kualitas terbaik dan presentasi istimewa",
      items: 11,
      rating: 5.0,
      features: ["11 Dulang", "Premium Items", "Luxury Packaging", "Royal Decoration"]
    },
    {
      id: 6,
      title: "Paket Hantaran Minimalis",
      category: "Modern",
      price: 1500000,
      priceText: "Rp 1.500.000",
      image: "bg-gradient-to-br from-gray-200 to-slate-300",
      description: "Paket hantaran dengan konsep minimalis yang clean dan elegan",
      items: 6,
      rating: 4.5,
      features: ["6 Dulang", "Clean Design", "Quality Items", "Minimalist Style"]
    },
    {
      id: 7,
      title: "Paket Hantaran Vintage",
      category: "Traditional",
      price: 2000000,
      priceText: "Rp 2.000.000",
      image: "bg-gradient-to-br from-amber-200 to-orange-300",
      description: "Paket hantaran dengan nuansa vintage dan sentuhan nostalgia",
      items: 7,
      rating: 4.8,
      features: ["7 Dulang", "Vintage Style", "Traditional Snacks", "Antique Decoration"]
    },
    {
      id: 8,
      title: "Paket Hantaran Exclusive",
      category: "Premium",
      price: 2800000,
      priceText: "Rp 2.800.000",
      image: "bg-gradient-to-br from-teal-200 to-cyan-300",
      description: "Paket hantaran eksklusif dengan item-item pilihan dan kemasan premium",
      items: 9,
      rating: 4.9,
      features: ["9 Dulang", "Exclusive Items", "Premium Packaging", "Custom Design"]
    }
  ];

  const categories = ['All', 'Premium', 'Traditional', 'Modern', 'Budget', 'Luxury'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under 1.5M', value: 'under-1500' },
    { label: '1.5M - 2.5M', value: '1500-2500' },
    { label: 'Above 2.5M', value: 'above-2500' }
  ];

  const filteredPackages = hantaranPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under-1500') matchesPrice = pkg.price < 1500000;
    else if (priceRange === '1500-2500') matchesPrice = pkg.price >= 1500000 && pkg.price <= 2500000;
    else if (priceRange === 'above-2500') matchesPrice = pkg.price > 2500000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-yellow-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Paket Hantaran Pernikahan</h1>
          <p className="text-xl opacity-90">Pilih paket hantaran terbaik untuk melengkapi prosesi pernikahan Anda</p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari paket hantaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Menampilkan {filteredPackages.length} dari {hantaranPackages.length} paket hantaran
          </div>
        </div>
      </section>

      {/* Packages Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada paket ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {filteredPackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Package Preview */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 h-64' : 'h-64'
                  }`}>
                    <div className={`w-full h-full ${pkg.image} flex items-center justify-center relative`}>
                      {/* Mock hantaran preview */}
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center max-w-[200px]">
                        <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" fill="currentColor" />
                        <h3 className="font-bold text-yellow-800 text-sm mb-1">Hantaran</h3>
                        <p className="text-xs text-gray-600 mb-2">{pkg.items} Dulang</p>
                        <div className="flex justify-center items-center gap-1 mb-2">
                          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                          <span className="text-xs font-semibold">{pkg.rating}</span>
                        </div>
                        <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded"></div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {pkg.category}
                      </div>
                      
                      {/* Items Count Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {pkg.items} Items
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Eye className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-semibold">Preview Paket</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-yellow-800">{pkg.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4" fill="currentColor" />
                        <span className="text-sm font-semibold">{pkg.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 text-sm">{pkg.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.features.map((feature, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-yellow-600">{pkg.priceText}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Package className="h-4 w-4" />
                        <span>{pkg.items} Dulang</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <ShoppingCart className="h-4 w-4" />
                        Beli Sekarang
                      </button>
                      <Link href={`/hantaran/${pkg.id}`}>
                        <button className="border-2 border-yellow-600 text-yellow-600 px-4 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                          <Eye className="h-4 w-4" />
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HantaranPage;