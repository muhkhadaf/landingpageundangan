'use client';

import { useState } from 'react';
import { Search, Filter, Eye, ShoppingCart, Heart, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const templates = [
    {
      id: 1,
      title: "Elegant Garden",
      category: "Modern",
      price: 150000,
      priceText: "Rp 150.000",
      image: "bg-gradient-to-br from-emerald-200 to-green-300",
      description: "Template modern dengan sentuhan alam yang elegan",
      features: ["Responsive Design", "Custom Colors", "Music Player"]
    },
    {
      id: 2,
      title: "Royal Classic",
      category: "Traditional",
      price: 200000,
      priceText: "Rp 200.000",
      image: "bg-gradient-to-br from-yellow-200 to-amber-300",
      description: "Desain klasik dengan nuansa kerajaan yang mewah",
      features: ["Traditional Style", "Gold Accents", "Photo Gallery"]
    },
    {
      id: 3,
      title: "Minimalist Chic",
      category: "Modern",
      price: 125000,
      priceText: "Rp 125.000",
      image: "bg-gradient-to-br from-gray-200 to-slate-300",
      description: "Desain minimalis yang clean dan modern",
      features: ["Clean Design", "Fast Loading", "Mobile Friendly"]
    },
    {
      id: 4,
      title: "Floral Romance",
      category: "Romantic",
      price: 175000,
      priceText: "Rp 175.000",
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      description: "Template romantis dengan motif bunga yang indah",
      features: ["Floral Design", "Love Story", "RSVP Form"]
    },
    {
      id: 5,
      title: "Vintage Luxury",
      category: "Vintage",
      price: 225000,
      priceText: "Rp 225.000",
      image: "bg-gradient-to-br from-amber-200 to-orange-300",
      description: "Desain vintage dengan sentuhan kemewahan",
      features: ["Vintage Style", "Premium Fonts", "Animation Effects"]
    },
    {
      id: 6,
      title: "Ocean Breeze",
      category: "Modern",
      price: 160000,
      priceText: "Rp 160.000",
      image: "bg-gradient-to-br from-blue-200 to-cyan-300",
      description: "Template dengan tema laut yang menyegarkan",
      features: ["Ocean Theme", "Blue Palette", "Wave Animations"]
    },
    {
      id: 7,
      title: "Rustic Charm",
      category: "Rustic",
      price: 180000,
      priceText: "Rp 180.000",
      image: "bg-gradient-to-br from-amber-100 to-yellow-200",
      description: "Desain rustic dengan nuansa pedesaan yang hangat",
      features: ["Rustic Design", "Wood Texture", "Country Style"]
    },
    {
      id: 8,
      title: "Art Deco Glam",
      category: "Vintage",
      price: 250000,
      priceText: "Rp 250.000",
      image: "bg-gradient-to-br from-purple-200 to-indigo-300",
      description: "Template Art Deco dengan kemewahan tahun 1920an",
      features: ["Art Deco Style", "Geometric Patterns", "Luxury Feel"]
    },
    {
      id: 9,
      title: "Boho Chic",
      category: "Bohemian",
      price: 165000,
      priceText: "Rp 165.000",
      image: "bg-gradient-to-br from-orange-200 to-red-300",
      description: "Desain bohemian yang free-spirited dan artistik",
      features: ["Boho Style", "Artistic Elements", "Warm Colors"]
    }
  ];

  const categories = ['All', 'Modern', 'Traditional', 'Romantic', 'Vintage', 'Rustic', 'Bohemian'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under 150k', value: 'under-150' },
    { label: '150k - 200k', value: '150-200' },
    { label: 'Above 200k', value: 'above-200' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under-150') matchesPrice = template.price < 150000;
    else if (priceRange === '150-200') matchesPrice = template.price >= 150000 && template.price <= 200000;
    else if (priceRange === 'above-200') matchesPrice = template.price > 200000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Template Undangan Pernikahan</h1>
          <p className="text-xl opacity-90">Pilih template undangan yang sempurna untuk hari bahagia Anda</p>
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
                placeholder="Cari template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Menampilkan {filteredTemplates.length} dari {templates.length} template
          </div>
        </div>
      </section>

      {/* Templates Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada template ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Template Preview */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 h-64' : 'h-64'
                  }`}>
                    <div className={`w-full h-full ${template.image} flex items-center justify-center relative`}>
                      {/* Mock invitation preview */}
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center max-w-[200px]">
                        <Heart className="h-8 w-8 text-emerald-600 mx-auto mb-2" fill="currentColor" />
                        <h3 className="font-bold text-emerald-800 text-sm mb-1">John & Jane</h3>
                        <p className="text-xs text-gray-600 mb-2">25 Desember 2024</p>
                        <div className="w-full h-1 bg-gradient-to-r from-emerald-400 to-yellow-400 rounded"></div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm">{template.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, index) => (
                        <span key={index} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-2xl font-bold text-yellow-600 mb-4">{template.priceText}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <ShoppingCart className="h-4 w-4" />
                        Beli Sekarang
                      </button>
                      <Link href={`/templates/${template.id}`}>
                        <button className="border-2 border-emerald-600 text-emerald-600 px-4 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
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

export default TemplatesPage;