'use client';

import { Calendar, User, Eye, ArrowLeft, Share2, Heart, MessageCircle, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const BlogDetailPage = () => {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // Sample blog data - in real app, this would come from API/database
  const blogPosts = {
    '1': {
      id: 1,
      title: "Tips Memilih Template Undangan Pernikahan yang Sempurna",
      excerpt: "Panduan lengkap untuk memilih template undangan yang sesuai dengan tema dan budget pernikahan Anda. Dari desain klasik hingga modern.",
      content: `
        <h2>Mengapa Template Undangan Penting?</h2>
        <p>Undangan pernikahan adalah kesan pertama yang akan diterima tamu tentang pernikahan Anda. Template yang tepat tidak hanya mencerminkan kepribadian pasangan, tetapi juga memberikan informasi yang jelas tentang acara yang akan diselenggarakan.</p>
        
        <h2>Faktor-Faktor yang Perlu Dipertimbangkan</h2>
        
        <h3>1. Tema Pernikahan</h3>
        <p>Sebelum memilih template, pastikan Anda sudah menentukan tema pernikahan. Apakah akan menggunakan tema tradisional, modern, rustic, atau mungkin tema khusus lainnya? Template undangan harus sejalan dengan tema yang dipilih.</p>
        
        <h3>2. Budget yang Tersedia</h3>
        <p>Tentukan budget untuk undangan sejak awal. Template digital biasanya lebih ekonomis dibandingkan undangan cetak, namun keduanya memiliki kelebihan masing-masing.</p>
        
        <h3>3. Jumlah Tamu</h3>
        <p>Pertimbangkan jumlah tamu yang akan diundang. Ini akan mempengaruhi pilihan antara undangan digital atau cetak, serta kompleksitas desain yang dipilih.</p>
        
        <h2>Jenis-Jenis Template Undangan</h2>
        
        <h3>Template Klasik</h3>
        <p>Template dengan desain timeless yang tidak akan pernah ketinggalan zaman. Biasanya menggunakan warna-warna netral seperti putih, krem, atau emas dengan ornamen yang elegan.</p>
        
        <h3>Template Modern</h3>
        <p>Desain yang mengikuti tren terkini dengan penggunaan tipografi yang bold, warna-warna kontras, dan layout yang clean dan minimalis.</p>
        
        <h3>Template Tradisional</h3>
        <p>Menampilkan unsur-unsur budaya lokal dengan ornamen khas daerah, penggunaan bahasa daerah, dan motif tradisional yang kaya makna.</p>
        
        <h2>Tips Memilih Template yang Tepat</h2>
        
        <ol>
          <li><strong>Sesuaikan dengan Venue:</strong> Template harus mencerminkan suasana tempat pernikahan</li>
          <li><strong>Pertimbangkan Musim:</strong> Pilih warna dan motif yang sesuai dengan musim pernikahan</li>
          <li><strong>Mudah Dibaca:</strong> Pastikan informasi penting mudah dibaca dan dipahami</li>
          <li><strong>Fleksibilitas:</strong> Pilih template yang bisa disesuaikan dengan kebutuhan</li>
          <li><strong>Kualitas Cetak:</strong> Jika memilih cetak, pastikan template mendukung resolusi tinggi</li>
        </ol>
        
        <h2>Kesalahan yang Harus Dihindari</h2>
        
        <p>Beberapa kesalahan umum dalam memilih template undangan:</p>
        <ul>
          <li>Memilih template yang terlalu rumit sehingga informasi sulit dibaca</li>
          <li>Tidak mempertimbangkan biaya cetak untuk template yang kompleks</li>
          <li>Mengabaikan konsistensi dengan tema pernikahan keseluruhan</li>
          <li>Tidak melakukan proofreading sebelum mencetak atau mengirim</li>
        </ul>
        
        <h2>Kesimpulan</h2>
        
        <p>Memilih template undangan pernikahan yang tepat membutuhkan pertimbangan yang matang. Dengan memperhatikan tema, budget, dan kebutuhan spesifik Anda, template undangan dapat menjadi representasi yang sempurna dari momen bahagia yang akan Anda rayakan bersama orang-orang terkasih.</p>
      `,
      author: "Tim Ayung Wedding",
      date: "2024-01-15",
      category: "Tips Pernikahan",
      image: "bg-gradient-to-br from-pink-200 to-rose-300",
      readTime: "5 min",
      views: 1250,
      tags: ["undangan", "template", "pernikahan", "tips"]
    },
    '2': {
      id: 2,
      title: "Tren Hantaran Pernikahan 2024: Ide Kreatif dan Unik",
      excerpt: "Inspirasi hantaran pernikahan terbaru yang sedang trending. Dari hantaran tradisional hingga konsep modern yang Instagram-worthy.",
      content: `
        <h2>Tren Hantaran Pernikahan di Tahun 2024</h2>
        <p>Tahun 2024 membawa berbagai inovasi dalam dunia hantaran pernikahan. Pasangan modern kini lebih kreatif dalam menyiapkan hantaran yang tidak hanya indah dipandang, tetapi juga fungsional dan bermakna.</p>
        
        <h2>Hantaran Minimalis dengan Sentuhan Luxury</h2>
        <p>Tren minimalis tetap menjadi favorit, namun dengan sentuhan luxury yang lebih terasa. Penggunaan bahan-bahan premium seperti velvet, satin, dan aksen emas memberikan kesan mewah tanpa berlebihan.</p>
        
        <h2>Hantaran Eco-Friendly</h2>
        <p>Kesadaran akan lingkungan membuat banyak pasangan memilih hantaran yang ramah lingkungan. Penggunaan bahan daur ulang, tanaman hidup, dan kemasan yang bisa digunakan kembali menjadi pilihan populer.</p>
        
        <h2>Personalisasi yang Unik</h2>
        <p>Setiap hantaran kini dibuat dengan sentuhan personal yang mencerminkan kepribadian pasangan. Mulai dari foto pre-wedding, quote favorit, hingga hobi yang digemari.</p>
      `,
      author: "Sarah Dewi",
      date: "2024-01-12",
      category: "Hantaran",
      image: "bg-gradient-to-br from-yellow-200 to-amber-300",
      readTime: "7 min",
      views: 980,
      tags: ["hantaran", "tren", "2024", "kreatif"]
    }
    // Add more blog posts as needed
  };

  const currentPost = blogPosts[params.id as string];

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <Link href="/blog">
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300">
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Hero Section */}
      <div className={`${currentPost.image} py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <Link href="/blog">
                <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Blog
                </button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                {currentPost.category}
              </span>
              <div className="flex items-center text-white/80 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {currentPost.readTime}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {currentPost.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {currentPost.excerpt}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(currentPost.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{currentPost.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Social Actions */}
          <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
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
              {currentPost.tags.map((tag, index) => (
                <span key={index} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              style={{
                color: '#374151',
                lineHeight: '1.8'
              }}
            >
              <style jsx>{`
                .prose h2 {
                  color: #065f46;
                  font-size: 1.875rem;
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .prose h3 {
                  color: #047857;
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                }
                .prose p {
                  margin-bottom: 1.25rem;
                  text-align: justify;
                }
                .prose ol, .prose ul {
                  margin-bottom: 1.25rem;
                }
                .prose li {
                  margin-bottom: 0.5rem;
                }
                .prose strong {
                  color: #065f46;
                  font-weight: 600;
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {currentPost.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-800">{currentPost.author}</h3>
                <p className="text-emerald-600">Wedding Content Specialist</p>
                <p className="text-gray-600 mt-2">
                  Berpengalaman dalam industri pernikahan selama lebih dari 5 tahun, 
                  berbagi tips dan inspirasi untuk pernikahan impian Anda.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-emerald-800 mb-8 text-center">Artikel Terkait</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.values(blogPosts)
                .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
                .slice(0, 2)
                .map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                      <div className={`h-32 ${post.image} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="text-center text-white relative z-10">
                          <Tag className="h-6 w-6 mx-auto mb-1" />
                          <p className="text-sm font-semibold">{post.category}</p>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-emerald-800 mb-2 line-clamp-2">{post.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.date).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              }
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Komentar
            </h3>
            
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