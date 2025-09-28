'use client';

import { ArrowRight, Calendar, Eye, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  is_published: boolean;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

const BlogSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Gradient backgrounds for posts without images
  const gradientBackgrounds = [
    "bg-gradient-to-br from-pink-200 to-rose-300",
    "bg-gradient-to-br from-amber-200 to-amber-300", 
    "bg-gradient-to-br from-purple-200 to-purple-300",
    "bg-gradient-to-br from-blue-200 to-blue-300",
    "bg-gradient-to-br from-green-200 to-green-300",
    "bg-gradient-to-br from-indigo-200 to-indigo-300"
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog/published');
        const data = await response.json();
        
        if (response.ok) {
          setFeaturedPosts(data.blogs || []);
        } else {
          console.error('Failed to fetch blogs:', data.error);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageBackground = (post: BlogPost, index: number) => {
    if (post.image_url) {
      return `bg-cover bg-center`;
    }
    return gradientBackgrounds[index % gradientBackgrounds.length];
  };

  const getImageStyle = (post: BlogPost) => {
    if (post.image_url) {
      return { backgroundImage: `url(${post.image_url})` };
    }
    return {};
  };

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
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : featuredPosts.length === 0 ? (
            // No posts message
            <div className="col-span-full text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Artikel</h3>
              <p className="text-gray-500">Artikel blog akan segera hadir. Pantau terus untuk tips dan inspirasi pernikahan!</p>
            </div>
          ) : (
            featuredPosts.map((post, index) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div 
                  className={`h-48 ${getImageBackground(post, index)} flex items-center justify-center relative overflow-hidden`}
                  style={getImageStyle(post)}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center text-white relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-2">
                      <Calendar className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="font-semibold">Blog Post</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{backgroundColor: '#f3f0f2', color: '#52303f'}}>
                      Blog Post
                    </span>
                    <span className="text-gray-500 text-xs">{formatDate(post.created_at)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-colors" style={{color: '#52303f'}} onMouseEnter={(e) => {const target = e.target as HTMLHeadingElement; target.style.color = '#7c5367';}} onMouseLeave={(e) => {const target = e.target as HTMLHeadingElement; target.style.color = '#52303f';}}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt || 'No excerpt available'}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author || 'Admin'}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 1000) + 100}
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
            ))
          )}
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