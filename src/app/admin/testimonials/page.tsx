'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { cleanupImagePreview, createImagePreview, deleteTestimonialImage, uploadTestimonialImage, validateTestimonialImageFile } from '@/lib/testimonial-storage';
import { Edit, Heart, Plus, Save, Star, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  customer_name: string;
  rating: number;
  testimonial_text: string;
  photo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    testimonial_text: '',
    photo_url: '',
    is_active: true
  });

  // State untuk file upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/testimonials');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch testimonials');
      }

      setTestimonials(result.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Reset form
  const resetForm = () => {
    // Cleanup image preview if it exists and is not from existing testimonial
    if (imagePreview && imagePreview.startsWith('blob:')) {
      cleanupImagePreview(imagePreview);
    }
    
    setFormData({
      customer_name: '',
      rating: 5,
      testimonial_text: '',
      photo_url: '',
      is_active: true
    });
    setEditingTestimonial(null);
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle add new
  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      let imageUrl = formData.photo_url;

      // Upload new image if selected
      if (imageFile) {
        setUploadingImage(true);
        const uploadedUrl = await uploadTestimonialImage(imageFile);
        if (!uploadedUrl) {
          throw new Error('Failed to upload image. Please try again.');
        }
        imageUrl = uploadedUrl;

        // Delete old image if editing and had previous image
        if (editingTestimonial && editingTestimonial.photo_url && editingTestimonial.photo_url !== imageUrl) {
          await deleteTestimonialImage(editingTestimonial.photo_url);
        }
      }

      const testimonialData = {
        customer_name: formData.customer_name,
        rating: formData.rating,
        testimonial_text: formData.testimonial_text,
        photo_url: imageUrl,
        is_active: formData.is_active
      };

      const url = editingTestimonial ? '/api/testimonials' : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const body = editingTestimonial 
        ? { ...testimonialData, id: editingTestimonial.id }
        : testimonialData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to save testimonial');
      }

      await fetchTestimonials();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setError(error instanceof Error ? error.message : 'Failed to save testimonial');
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete testimonial');
      }

      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete testimonial');
    }
  };

  // Handle edit
  const handleEdit = (testimonial: Testimonial) => {
    // Cleanup any existing blob preview
    if (imagePreview && imagePreview.startsWith('blob:')) {
      cleanupImagePreview(imagePreview);
    }
    
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      rating: testimonial.rating,
      testimonial_text: testimonial.testimonial_text,
      photo_url: testimonial.photo_url || '',
      is_active: testimonial.is_active
    });
    
    // Reset image file and set preview to existing photo
    setImageFile(null);
    setImagePreview(testimonial.photo_url || null);
    
    setIsModalOpen(true);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" message="Loading testimonials..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="text-gray-600 mt-1">Manage customer testimonials</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {testimonial.photo_url ? (
                  <img 
                    src={testimonial.photo_url} 
                    alt={testimonial.customer_name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Heart className="h-5 w-5 text-pink-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.customer_name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              &quot;{testimonial.testimonial_text}&quot;
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className={`px-2 py-1 rounded-full ${
                testimonial.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {testimonial.is_active ? 'Active' : 'Inactive'}
              </span>
              <span>Created: {new Date(testimonial.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., John &amp; Jane"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text
                </label>
                <textarea
                  value={formData.testimonial_text}
                  onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter testimonial text..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Photo
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {/* File Upload */}
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const validation = validateTestimonialImageFile(file);
                        if (!validation.isValid) {
                          setError(validation.error || 'Invalid file');
                          return;
                        }
                        
                        // Cleanup previous blob preview
                        if (imagePreview && imagePreview.startsWith('blob:')) {
                          cleanupImagePreview(imagePreview);
                        }
                        
                        setImageFile(file);
                        const preview = await createImagePreview(file);
                        setImagePreview(preview);
                        setError(null);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Upload customer&apos;s photo (JPG, PNG, WebP, max 5MB)
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {(saving || uploadingImage) && <LoadingSpinner size="small" />}
                <Save className="h-4 w-4" />
                {uploadingImage ? 'Uploading...' : saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;