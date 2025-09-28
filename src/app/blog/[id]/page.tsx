'use client';

import { ArrowLeft, Calendar, Clock, Eye, Heart, MessageCircle, Share2, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category?: string;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        
        const data = await response.json();
        setCurrentPost(data.blog);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak dapat ditemukan.</p>
          <Link href="/blog">
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost.title,
        text: currentPost.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <button className="mb-8 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-300">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Kembali ke Blog</span>
          </button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="h-64 md:h-80 bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                  <Tag className="h-12 w-12 mx-auto mb-4" />
                  <h1 className="text-2xl md:text-3xl font-bold">{currentPost.category || 'Blog Post'}</h1>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
                    {currentPost.category || 'Blog Post'}
                  </span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{Math.ceil(currentPost.content.length / 1000)} min baca</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 leading-tight">
                {currentPost.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {currentPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{currentPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(currentPost.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Bagikan</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold">
                  #{currentPost.category || 'blog'}
                </span>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              style={{
                color: '#374151',
                lineHeight: '1.8'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {currentPost.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-800">{currentPost.author}</h3>
                <p className="text-gray-600">Penulis</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Terima kasih telah membaca artikel ini. Semoga informasi yang dibagikan dapat bermanfaat untuk persiapan pernikahan Anda.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Artikel Terkait</h3>
            <div className="text-center text-gray-500 py-8">
              <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Artikel terkait akan segera tersedia.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Komentar</h3>
            
            <div className="mb-8">
              <textarea
                placeholder="Tulis komentar Anda..."
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300">
                  Kirim Komentar
                </button>
              </div>
            </div>
            
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;