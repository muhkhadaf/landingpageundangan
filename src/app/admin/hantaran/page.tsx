'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Gift } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Hantaran } from '@/lib/supabase';

// Interface for actual API response structure
interface HantaranAPI {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  ingredients: string[];
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

const HantaranManagement = () => {
  const [hantaran, setHantaran] = useState<HantaranAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingHantaran, setEditingHantaran] = useState<HantaranAPI | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: 0,
    description: '',
    image_url: '',
    contents: [] as string[],
    is_active: true
  });

  useEffect(() => {
    fetchHantaran();
  }, []);

  const fetchHantaran = async () => {
    try {
      const response = await fetch('/api/hantaran');
      const data = await response.json();
      setHantaran(data.data || []);
    } catch (error) {
      console.error('Error fetching hantaran:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingHantaran ? `/api/hantaran/${editingHantaran.id}` : '/api/hantaran';
      const method = editingHantaran ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          contents: formData.contents.filter(i => i.trim() !== '')
        }),
      });

      if (response.ok) {
        await fetchHantaran();
        resetForm();
        setShowModal(false);
      } else {
        console.error('Error saving hantaran');
      }
    } catch (error) {
      console.error('Error saving hantaran:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this hantaran?')) {
      try {
        const response = await fetch(`/api/hantaran/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchHantaran();
        }
      } catch (error) {
        console.error('Error deleting hantaran:', error);
      }
    }
  };

  const toggleAvailability = async (hantaran: HantaranAPI) => {
    setActionLoading(`toggle-${hantaran.id}`);
    try {
      const response = await fetch(`/api/hantaran/${hantaran.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_available: !hantaran.is_available
        }),
      });
      if (response.ok) {
        await fetchHantaran();
      }
    } catch (error) {
      console.error('Error updating hantaran availability:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      price: 0,
      description: '',
      image_url: '',
      contents: [] as string[],
      is_active: true
    });
    setEditingHantaran(null);
  };

  const openEditModal = (hantaran: HantaranAPI) => {
    setEditingHantaran(hantaran);
    setFormData({
      title: hantaran.name || '',
      category: hantaran.category || '',
      price: hantaran.price || 0,
      description: hantaran.description || '',
      image_url: hantaran.image_url || '',
      contents: hantaran.ingredients || [],
      is_active: hantaran.is_available ?? true
    });
    setShowModal(true);
  };



  const filteredHantaran = hantaran.filter(item => {
    const matchesSearch = (item.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || (item.category || '') === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'available' && item.is_available) ||
      (statusFilter === 'unavailable' && !item.is_available);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(hantaran.map(h => h.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="large" message="Loading hantaran..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hantaran Management</h1>
            <p className="text-gray-600 mt-1">Manage wedding hantaran items</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Hantaran</span>
          </button>
        </div>
      </div>

      <div>
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
                  placeholder="Search hantaran..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hantaran Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHantaran.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-700 font-semibold text-sm">
                        {(item.name || '').charAt(0) || '?'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.name || 'Untitled'}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.description || 'No description available'}
                </p>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>
                
                {/* Contents */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    {(item.ingredients || []).length} contents
                  </span>
                  {item.ingredients && item.ingredients.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients.slice(0, 3).map((ingredient, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            {ingredient}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status Toggle */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleAvailability(item)}
                    disabled={actionLoading === `toggle-${item.id}`}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      item.is_available
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {actionLoading === `toggle-${item.id}` ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div> Updating...</>
                    ) : item.is_available ? (
                      <><Eye className="h-4 w-4 mr-2" /> Available</>
                    ) : (
                      <><EyeOff className="h-4 w-4 mr-2" /> Unavailable</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredHantaran.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hantaran found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first hantaran package.</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Hantaran</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingHantaran ? 'Edit Hantaran' : 'Add New Hantaran'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
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
                    Contents
                  </label>
                  <div className="space-y-2">
                    {formData.contents.map((content, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={content}
                          onChange={(e) => {
                             const newContents = [...formData.contents];
                             newContents[index] = e.target.value;
                             setFormData(prev => ({ ...prev, contents: newContents }));
                           }}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Content item"
                        />
                        <button
                          type="button"
                          onClick={() => {
                             const newContents = formData.contents.filter((_, i) => i !== index);
                             setFormData(prev => ({ ...prev, contents: newContents }));
                           }}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                         setFormData(prev => ({ ...prev, contents: [...prev.contents, ''] }));
                       }}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add Content Item
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Available
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
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    {editingHantaran ? 'Update' : 'Create'} Hantaran
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

export default HantaranManagement;