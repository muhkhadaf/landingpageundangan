'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Eye, Gift, Grid, List, Package, Search, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Hantaran {
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

const HantaranPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [hantaranPackages, setHantaranPackages] = useState<Hantaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hantaran data from API
  useEffect(() => {
    const fetchHantaran = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hantaran');
        if (!response.ok) {
          throw new Error('Gagal memuat data hantaran');
        }
        const result = await response.json();
        setHantaranPackages(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data hantaran');
        console.error('Error fetching hantaran:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHantaran();
  }, []);



  // Generate categories dynamically from API data
  const categories = ['All', ...Array.from(new Set(hantaranPackages.map(pkg => pkg.category).filter(Boolean)))];
  
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under 1.5M', value: 'under-1500' },
    { label: '1.5M - 2.5M', value: '1500-2500' },
    { label: 'Above 2.5M', value: 'above-2500' }
  ];

  const filteredPackages = hantaranPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (pkg.description && pkg.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    
    let matchesPrice = true;
    const priceValue = typeof pkg.price === 'string' ? parseFloat(pkg.price.replace(/[^0-9]/g, '')) : pkg.price;
    if (priceRange === 'under-1500') matchesPrice = priceValue < 1500000;
    else if (priceRange === '1500-2500') matchesPrice = priceValue >= 1500000 && priceValue <= 2500000;
    else if (priceRange === 'above-2500') matchesPrice = priceValue > 2500000;
    
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

      {/* Loading State */}
      {loading && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat paket hantaran...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </section>
      )}

      {/* Packages Grid/List */}
      {!loading && !error && (
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
                      <div className={`w-full h-full ${pkg.image_url ? '' : 'bg-gradient-to-br from-yellow-200 to-amber-300'} flex items-center justify-center relative`} style={pkg.image_url ? {backgroundImage: `url(${pkg.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                        {/* Mock hantaran preview */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center max-w-[200px]">
                          <Gift className="h-8 w-8 text-yellow-600 mx-auto mb-2" fill="currentColor" />
                          <h3 className="font-bold text-yellow-800 text-sm mb-1">Hantaran</h3>
                          <p className="text-xs text-gray-600 mb-2">{pkg.items || 'Paket'}</p>
                          {pkg.rating && (
                            <div className="flex justify-center items-center gap-1 mb-2">
                              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                              <span className="text-xs font-semibold">{pkg.rating}</span>
                            </div>
                          )}
                          <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded"></div>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {pkg.category}
                        </div>
                        
                        {/* Items Badge */}
                        {pkg.items && (
                          <div className="absolute top-4 right-4 bg-white/90 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {pkg.items}
                          </div>
                        )}
                        
                        {/* Availability Badge */}
                        {pkg.is_active !== undefined && (
                          <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                            pkg.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {pkg.is_active ? 'Tersedia' : 'Habis'}
                          </div>
                        )}
                        
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
                        <h3 className="text-xl font-bold text-yellow-800">{pkg.name}</h3>
                        {pkg.rating && (
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4" fill="currentColor" />
                            <span className="text-sm font-semibold">{pkg.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 text-sm">{pkg.description || 'Paket hantaran berkualitas dengan berbagai pilihan item menarik.'}</p>
                      
                      {/* Ingredients as Features */}
                      {pkg.ingredients && pkg.ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pkg.ingredients.slice(0, 3).map((ingredient, index) => (
                            <span key={index} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                              {ingredient}
                            </span>
                          ))}
                          {pkg.ingredients.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                              +{pkg.ingredients.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-2xl font-bold text-yellow-600">
                          {typeof pkg.price === 'string' ? pkg.price : `Rp ${pkg.price?.toLocaleString('id-ID')}`}
                        </p>
                        {pkg.items && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Package className="h-4 w-4" />
                            <span>{pkg.items}</span>
                          </div>
                        )}
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
      )}

      <Footer />
    </div>
  );
};

export default HantaranPage;