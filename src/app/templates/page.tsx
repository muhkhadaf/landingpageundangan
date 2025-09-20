'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Eye, Grid, List, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Template {
  id: number;
  title: string;
  category: string;
  price: string | number;
  image_url?: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/templates');
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

  // Get unique categories from templates
  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under 150k', value: 'under-150' },
    { label: '150k - 200k', value: '150-200' },
    { label: 'Above 200k', value: 'above-200' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (template.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    let matchesPrice = true;
    const numericPrice = typeof template.price === 'number' ? template.price : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
    if (priceRange === 'under-150') matchesPrice = numericPrice < 150000;
    else if (priceRange === '150-200') matchesPrice = numericPrice >= 150000 && numericPrice <= 200000;
    else if (priceRange === 'above-200') matchesPrice = numericPrice > 200000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat template...</p>
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
            <button 
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                    <div 
                      className={`w-full h-full flex items-center justify-center relative`}
                      style={template.image_url ? {
                        backgroundImage: `url(${template.image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      } : {
                        background: 'linear-gradient(135deg,rgb(33, 36, 35) 0%, #059669 100%)'
                      }}
                    >
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: '#7c536c'}}>
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
                    <p className="text-gray-600 mb-3 text-sm">{template.description || 'Template undangan pernikahan modern dengan desain yang elegan.'}</p>
                    
                    {/* Template Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {template.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>
                    
                    <p className="text-2xl font-bold text-yellow-600 mb-4">
                      {(() => {
                        const numericPrice = typeof template.price === 'number' 
                          ? template.price 
                          : parseInt(template.price.toString().replace(/[^0-9]/g, '')) || 0;
                        return `Rp ${numericPrice.toLocaleString('id-ID')}`;
                      })()}
                    </p>
                    
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