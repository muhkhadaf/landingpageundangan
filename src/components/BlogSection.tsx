'use client';

import { Calendar, User, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const BlogSection = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Tips Memilih Template Undangan Pernikahan yang Sempurna",
      excerpt: "Panduan lengkap untuk memilih template undangan yang sesuai dengan tema dan budget pernikahan Anda.",
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
      excerpt: "Inspirasi hantaran pernikahan terbaru yang sedang trending. Dari hantaran tradisional hingga konsep modern.",
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
      excerpt: "Strategi cerdas untuk mengatur budget pernikahan. Tips dan trik dari wedding planner berpengalaman.",
      author: "Andi Pratama",
      date: "2024-01-10",
      category: "Tips Pernikahan",
      image: "bg-gradient-to-br from-emerald-200 to-green-300",
      readTime: "6 min",
      views: 1450
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Artikel & Tips Pernikahan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dapatkan inspirasi dan tips terbaru untuk pernikahan impian Anda
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className={`h-48 ${post.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center text-white relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-2">
                    <Calendar className="h-8 w-8 mx-auto" />
                  </div>
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
                
                <h3 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views.toLocaleString('id-ID')}
                  </div>
                </div>
                
                <Link href={`/blog/${post.id}`}>
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Baca Artikel
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <button className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              Lihat Semua Artikel
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;