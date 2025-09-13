'use client';

import { Calendar, User, Eye, ArrowRight, Search, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Tips Memilih Template Undangan Pernikahan yang Sempurna",
      excerpt: "Panduan lengkap untuk memilih template undangan yang sesuai dengan tema dan budget pernikahan Anda. Dari desain klasik hingga modern.",
      content: "Memilih template undangan pernikahan adalah salah satu keputusan penting dalam persiapan pernikahan...",
      author: "Tim Ayung Wedding",
      date: "2024-01-15",
      category: "Tips Pernikahan",
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      readTime: "5 min",
      views: 1250
    },
    {
      id: 2,
      title: "Tren Hantaran Pernikahan 2024: Ide Kreatif dan Unik",
      excerpt: "Inspirasi hantaran pernikahan terbaru yang sedang trending. Dari hantaran tradisional hingga konsep modern yang Instagram-worthy.",
      content: "Hantaran pernikahan merupakan tradisi yang masih dilestarikan hingga kini...",
      author: "Sarah Dewi",
      date: "2024-01-12",
      category: "Hantaran",
      image: "bg-gradient-to-br from-yellow-200 to-amber-300",
      readTime: "7 min",
      views: 980
    },
    {
      id: 3,
      title: "Cara Menghemat Budget Pernikahan Tanpa Mengurangi Kemewahan",
      excerpt: "Strategi cerdas untuk mengatur budget pernikahan. Tips dan trik dari wedding planner berpengalaman untuk pernikahan impian dengan budget terbatas.",
      content: "Merencanakan pernikahan dengan budget terbatas bukan berarti harus mengorbankan kualitas...",
      author: "Andi Pratama",
      date: "2024-01-10",
      category: "Tips Pernikahan",
      image: "bg-gradient-to-br from-emerald-200 to-green-300",
      readTime: "6 min",
      views: 1450
    },
    {
      id: 4,
      title: "Panduan Lengkap Undangan Digital: Kelebihan dan Cara Membuatnya",
      excerpt: "Era digital menghadirkan solusi undangan pernikahan yang praktis dan ramah lingkungan. Pelajari semua tentang undangan digital di sini.",
      content: "Undangan digital semakin populer di kalangan pasangan muda...",
      author: "Maya Sari",
      date: "2024-01-08",
      category: "Digital",
      image: "bg-gradient-to-br from-blue-200 to-cyan-300",
      readTime: "8 min",
      views: 2100
    },
    {
      id: 5,
      title: "Etika dan Tradisi Hantaran dalam Budaya Indonesia",
      excerpt: "Mengenal lebih dalam tentang makna dan filosofi hantaran dalam berbagai budaya di Indonesia. Panduan untuk menghormati tradisi leluhur.",
      content: "Hantaran dalam budaya Indonesia memiliki makna yang sangat mendalam...",
      author: "Dr. Siti Nurhaliza",
      date: "2024-01-05",
      category: "Budaya",
      image: "bg-gradient-to-br from-purple-200 to-violet-300",
      readTime: "10 min",
      views: 750
    },
    {
      id: 6,
      title: "Checklist Persiapan Pernikahan: 6 Bulan Sebelum Hari H",
      excerpt: "Timeline lengkap persiapan pernikahan mulai dari 6 bulan sebelum hari H. Pastikan tidak ada yang terlewat dengan checklist ini.",
      content: "Persiapan pernikahan membutuhkan perencanaan yang matang...",
      author: "Wedding Planner Pro",
      date: "2024-01-03",
      category: "Tips Pernikahan",
      image: "bg-gradient-to-br from-indigo-200 to-blue-300",
      readTime: "12 min",
      views: 1800
    }
  ];

  const categories = ['all', 'Tips Pernikahan', 'Hantaran', 'Digital', 'Budaya'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Ayung Wedding</h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
            Tips, inspirasi, dan panduan lengkap untuk pernikahan impian Anda
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Artikel Pilihan</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className={`h-64 md:h-full ${featuredPost.image} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                        <h3 className="text-2xl font-bold mb-2">Artikel Terbaru</h3>
                        <p className="text-lg">Tips & Inspirasi Pernikahan</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredPost.views.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2">
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">
            {searchTerm || selectedCategory !== 'all' ? 'Hasil Pencarian' : 'Artikel Terbaru'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl">Tidak ada artikel yang ditemukan</p>
                <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm || selectedCategory !== 'all' ? filteredPosts : regularPosts).map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`h-48 ${post.image} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-center text-white relative z-10">
                      <Tag className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-semibold">{post.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.readTime} baca</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString('id-ID')} views
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300 flex items-center gap-1">
                          Baca
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Dapatkan Tips Pernikahan Terbaru</h3>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan artikel terbaru, tips, dan inspirasi pernikahan langsung di email Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-300">
              Berlangganan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;