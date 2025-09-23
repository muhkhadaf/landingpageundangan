'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Calendar, User, Upload, X } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  fetchBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  uploadBlogImage,
  deleteBlogImage,
  validateBlogImageFile,
  createImagePreview,
  cleanupImagePreview,
  extractImagePath,
  type BlogPost
} from '@/lib/blog-storage';

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image_url: '',
    is_published: false
  });
  
  // Image upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['Tips Pernikahan', 'Hantaran', 'Dekorasi', 'Fotografi', 'Catering', 'Lainnya'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const blogPosts = await fetchBlogs();
      setPosts(blogPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (post: BlogPost) => {
    setActionLoading(`toggle-${post.id}`);
    try {
      const updatedPost = await updateBlog(post.id!, {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        image_url: post.image_url,
        is_published: !post.is_published
      });
      
      setPosts(posts.map(p => 
        p.id === post.id ? updatedPost : p
      ));
    } catch (error) {
      console.error('Error updating post status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('form');
    
    try {
      let finalImageUrl = formData.image_url;
      
      // Upload image if selected
      if (selectedFile) {
        setUploadingImage(true);
        finalImageUrl = await uploadBlogImage(selectedFile);
        
        // Delete old image if editing and had previous image
        if (editingPost && editingPost.image_url) {
          const oldImagePath = extractImagePath(editingPost.image_url);
          if (oldImagePath) {
            try {
              await deleteBlogImage(oldImagePath);
            } catch (error) {
              console.warn('Failed to delete old image:', error);
            }
          }
        }
      }
      
      const blogData = {
        ...formData,
        image_url: finalImageUrl
      };
      
      if (editingPost) {
        // Update existing post
        const updatedPost = await updateBlog(editingPost.id!, blogData);
        setPosts(posts.map(p => 
          p.id === editingPost.id ? updatedPost : p
        ));
      } else {
        // Create new post
        const newPost = await createBlog(blogData);
        setPosts([newPost, ...posts]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setActionLoading(null);
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image_url: '',
      is_published: false
    });
    setEditingPost(null);
    setShowForm(false);
    
    // Reset image upload states
    setSelectedFile(null);
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
      setImagePreview('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author || '',
      category: '',
      image_url: post.image_url || '',
      is_published: post.is_published
    });
    setEditingPost(post);
    setShowForm(true);
    
    // Set image preview if post has image
    if (post.image_url) {
      setImagePreview(post.image_url);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setActionLoading(`delete-${id}`);
      try {
        // Find the post to get image URL for deletion
        const postToDelete = posts.find(p => p.id === id);
        
        // Delete the blog post
        await deleteBlog(id);
        
        // Delete associated image if exists
        if (postToDelete && postToDelete.image_url) {
          const imagePath = extractImagePath(postToDelete.image_url);
          if (imagePath) {
            try {
              await deleteBlogImage(imagePath);
            } catch (error) {
              console.warn('Failed to delete associated image:', error);
            }
          }
        }
        
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Image upload handlers
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateBlogImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const preview = await createImagePreview(file);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      cleanupImagePreview(imagePreview);
    }
    setImagePreview(preview);
    
    // Clear the image_url field since we're using file upload
    setFormData({...formData, image_url: ''});
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
      setImagePreview('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all';
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'published' && post.is_published) ||
                         (selectedStatus === 'draft' && !post.is_published);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" message="Loading blog posts..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts and articles</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  post.is_published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-gray-500">Blog Post</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt || 'No excerpt available'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author || 'Unknown Author'}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID') : 'No date'}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id!)}
                    disabled={actionLoading === `delete-${post.id}`}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {actionLoading === `delete-${post.id}` ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <button
                  onClick={() => togglePublishStatus(post)}
                  disabled={actionLoading === `toggle-${post.id}`}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    post.is_published
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {actionLoading === `toggle-${post.id}` ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div> Updating...</>
                  ) : post.is_published ? (
                    <><Eye className="h-4 w-4 mr-2" /> Published</>
                  ) : (
                    <><EyeOff className="h-4 w-4 mr-2" /> Draft</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPost ? 'Edit Post' : 'Add New Post'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Image
                  </label>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Upload Options */}
                  <div className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploadingImage ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600">
                              Click to upload image or drag and drop
                            </span>
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: JPG, PNG, WebP. Max size: 5MB
                      </p>
                    </div>
                    
                    {/* OR Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                      </div>
                    </div>
                    
                    {/* URL Input */}
                    <div>
                      <input
                        type="url"
                        placeholder="Enter image URL"
                        value={formData.image_url}
                        onChange={(e) => {
                          setFormData({...formData, image_url: e.target.value});
                          if (e.target.value && !selectedFile) {
                            setImagePreview(e.target.value);
                          }
                        }}
                        disabled={!!selectedFile}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'form'}
                    className="px-6 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" style={{backgroundColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; if (!target.disabled) target.style.backgroundColor = '#52303f';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; if (!target.disabled) target.style.backgroundColor = '#7c5367';}}
                  >
                    {actionLoading === 'form' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {editingPost ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingPost ? 'Update Post' : 'Create Post'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;