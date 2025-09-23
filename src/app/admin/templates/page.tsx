'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Template } from '@/lib/supabase';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  uploadTemplateImage, 
  deleteTemplateImage, 
  validateImageFile, 
  createImagePreview, 
  cleanupImagePreview 
} from '@/lib/supabase-storage';

const TemplatesManagement = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image_url: '',
    features: [] as string[],
    is_active: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data.data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('submit');

    try {
      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        setUploadingImage(true);
        const uploadedUrl = await uploadTemplateImage(imageFile);
        if (!uploadedUrl) {
          alert('Failed to upload image. Please try again.');
          return;
        }
        imageUrl = uploadedUrl;

        // Delete old image if editing and had previous image
        if (editingTemplate && editingTemplate.image_url && editingTemplate.image_url !== imageUrl) {
          await deleteTemplateImage(editingTemplate.image_url);
        }
      }

      const templateData = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        image_url: imageUrl,
        features: formData.features.filter(f => f.trim() !== ''),
        is_active: formData.is_active
      };

      const url = editingTemplate 
        ? `/api/templates/${editingTemplate.id}` 
        : '/api/templates';
      const method = editingTemplate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        throw new Error('Failed to save template');
      }

      await fetchTemplates();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
    } finally {
      setActionLoading(null);
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        const response = await fetch(`/api/templates/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchTemplates();
        }
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const toggleStatus = async (template: Template) => {
    setActionLoading(`toggle-${template.id}`);
    try {
      const response = await fetch(`/api/templates/${template.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: !template.is_active
        }),
      });
      if (response.ok) {
        await fetchTemplates();
      }
    } catch (error) {
      console.error('Error updating template status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      price: '',
      description: '',
      image_url: '',
      features: [],
      is_active: true
    });
    setEditingTemplate(null);
    setImageFile(null);
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
      setImagePreview(null);
    }
  };

  const openEditModal = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      category: template.category,
      price: template.price.toString(),
      description: template.description || '',
      image_url: template.image_url || '',
      features: template.features || [],
      is_active: template.is_active
    });
    setImageFile(null);
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Clean up previous preview
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
    }

    // Create new preview
    const preview = await createImagePreview(file);
    setImageFile(file);
    setImagePreview(preview);
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) {
      cleanupImagePreview(imagePreview);
      setImagePreview(null);
    }
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && template.is_active) ||
                         (statusFilter === 'inactive' && !template.is_active);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(templates.map(t => t.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" message="Loading templates..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Templates Management</h1>
              <p className="text-gray-600 mt-1">Manage wedding invitation templates</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2" style={{backgroundColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#52303f';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#7c5367';}}
              >
                <Plus className="h-4 w-4" />
                <span>Add Template</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" onFocus={(e) => {const target = e.target as HTMLInputElement; target.style.borderColor = '#7c5367'; target.style.boxShadow = '0 0 0 2px rgba(124, 83, 103, 0.2)';}} onBlur={(e) => {const target = e.target as HTMLInputElement; target.style.borderColor = '#d1d5db'; target.style.boxShadow = 'none';}}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2" onFocus={(e) => {const target = e.target as HTMLSelectElement; target.style.borderColor = '#7c5367'; target.style.boxShadow = '0 0 0 2px rgba(124, 83, 103, 0.2)';}} onBlur={(e) => {const target = e.target as HTMLSelectElement; target.style.borderColor = '#d1d5db'; target.style.boxShadow = 'none';}}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
              {/* Template Image */}
              {template.image_url && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={template.image_url}
                    alt={template.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {template.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      {template.category}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(template)}
                      className="p-2 rounded-lg transition-colors" style={{color: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.color = '#52303f'; target.style.backgroundColor = '#f3f0f2';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.color = '#7c5367'; target.style.backgroundColor = 'transparent';}}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {template.description || 'No description available'}
                </p>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    Rp {template.price.toLocaleString('id-ID')}
                  </span>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    {(template.features || []).length} features
                  </span>
                  {template.features && template.features.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            +{template.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleStatus(template)}
                    disabled={actionLoading === `toggle-${template.id}`}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      template.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {actionLoading === `toggle-${template.id}` ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Updating...
                      </div>
                    ) : template.is_active ? (
                      <><Eye className="h-4 w-4 mr-2" /> Active</>
                    ) : (
                      <><EyeOff className="h-4 w-4 mr-2" /> Inactive</>
                    )}
                  </button>
                  
                  <Link
                    href={`/admin/templates/${template.id}/packages`}
                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                  >
                    <span>Manage Packages</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-200 to-green-300 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-700 font-semibold text-lg">T</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first wedding invitation template.</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Template</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingTemplate ? 'Edit Template' : 'Add New Template'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Image
                  </label>
                  
                  {/* Current Image Display */}
                  {(imagePreview || formData.image_url) && (
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview || formData.image_url || ''}
                          alt="Template preview"
                          width={128}
                          height={128}
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Upload Controls */}
                  <div className="space-y-3">
                    <div>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {imageFile ? 'Change Image' : 'Upload Image'}
                      </label>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Or enter image URL manually:
                    </div>
                    
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPG, PNG, WebP. Max size: 5MB. Recommended: 800x600px
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Feature</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    disabled={actionLoading === 'submit' || uploadingImage}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'submit' || uploadingImage}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {(actionLoading === 'submit' || uploadingImage) && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    <span>
                      {uploadingImage ? 'Uploading...' : 
                       actionLoading === 'submit' ? 'Saving...' : 
                       editingTemplate ? 'Update Template' : 'Create Template'}
                    </span>
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

export default TemplatesManagement;