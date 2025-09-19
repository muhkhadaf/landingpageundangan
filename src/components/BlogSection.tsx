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
      image: "bg-gradient-to-br from-amber-200 to-amber-300",
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
      image: "bg-gradient-to-br from-purple-200 to-purple-300",
      readTime: "6 min",
      views: 1450
    }
  ];

  return (
    <section className="py-20" style={{background: 'linear-gradient(to bottom, white, #f8f6f7)'}}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#52303f'}}>
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
                  <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{backgroundColor: '#f3f0f2', color: '#52303f'}}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">{post.readTime} baca</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-colors" style={{color: '#52303f'}} onMouseEnter={(e) => {const target = e.target as HTMLHeadingElement; target.style.color = '#7c5367';}} onMouseLeave={(e) => {const target = e.target as HTMLHeadingElement; target.style.color = '#52303f';}}>
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
                  <button className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group" style={{background: 'linear-gradient(to right, #7c5367, #52303f)'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #52303f, #3d1f2a)';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';}}>
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
            <button className="bg-white border-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl" style={{color: '#7c5367', borderColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#7c5367'; target.style.color = 'white';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = 'white'; target.style.color = '#7c5367';}}>
              Lihat Semua Artikel
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;