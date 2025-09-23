'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ServiceCTA {
  id: number;
  title: string;
  description: string;
  button_text: string;
  background_gradient: string;
  text_color: string;
  button_bg_color: string;
  button_text_color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const ServiceCTAAdmin = () => {
  const [ctas, setCtas] = useState<ServiceCTA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCTA, setEditingCTA] = useState<ServiceCTA | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    button_text: 'Konsultasi Paket Hemat',
    background_gradient: 'linear-gradient(to right, #7c5367, #d1c7cc)',
    text_color: 'white',
    button_bg_color: 'white',
    button_text_color: '#52303f',
    is_active: true,
    sort_order: 0
  });

  // Fetch CTAs
  const fetchCTAs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/service-cta');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch CTAs');
      }

      setCtas(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCTAs();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Open modal for create/edit
  const openModal = (cta?: ServiceCTA) => {
    if (cta) {
      setEditingCTA(cta);
      setFormData({
        title: cta.title,
        description: cta.description,
        button_text: cta.button_text,
        background_gradient: cta.background_gradient,
        text_color: cta.text_color,
        button_bg_color: cta.button_bg_color,
        button_text_color: cta.button_text_color,
        is_active: cta.is_active,
        sort_order: cta.sort_order
      });
    } else {
      setEditingCTA(null);
      setFormData({
        title: '',
        description: '',
        button_text: 'Konsultasi Paket Hemat',
        background_gradient: 'linear-gradient(to right, #7c5367, #d1c7cc)',
        text_color: 'white',
        button_bg_color: 'white',
        button_text_color: '#52303f',
        is_active: true,
        sort_order: 0
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCTA(null);
    setFormData({
      title: '',
      description: '',
      button_text: 'Konsultasi Paket Hemat',
      background_gradient: 'linear-gradient(to right, #7c5367, #d1c7cc)',
      text_color: 'white',
      button_bg_color: 'white',
      button_text_color: '#52303f',
      is_active: true,
      sort_order: 0
    });
  };

  // Save CTA (create or update)
  const saveCTA = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingCTA ? `/api/service-cta/${editingCTA.id}` : '/api/service-cta';
      const method = editingCTA ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save CTA');
      }

      await fetchCTAs();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  // Delete CTA
  const deleteCTA = async (id: number) => {
    if (!confirm('Are you sure you want to delete this CTA?')) {
      return;
    }

    try {
      const response = await fetch(`/api/service-cta/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete CTA');
      }

      await fetchCTAs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" message="Loading CTAs..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{color: '#52303f'}}>
          Service CTA Management
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add CTA
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {ctas.map((cta) => (
          <div key={cta.id} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold" style={{color: '#52303f'}}>
                    {cta.title}
                  </h3>
                  {cta.is_active && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{cta.description}</p>
                <p className="text-sm text-gray-500">Button: {cta.button_text}</p>
                <p className="text-sm text-gray-500">Sort Order: {cta.sort_order}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(cta)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteCTA(cta.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Preview:</h4>
              <div className="rounded-lg p-4 text-center" style={{background: cta.background_gradient}}>
                <h3 className="text-2xl font-bold mb-2" style={{color: cta.text_color}}>
                  {cta.title}
                </h3>
                <p className="text-lg mb-4 opacity-90" style={{color: cta.text_color}}>
                  {cta.description}
                </p>
                <button 
                  className="px-6 py-2 rounded-full font-semibold"
                  style={{
                    backgroundColor: cta.button_bg_color,
                    color: cta.button_text_color
                  }}
                >
                  {cta.button_text}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{color: '#52303f'}}>
                {editingCTA ? 'Edit CTA' : 'Add New CTA'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={saveCTA} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Butuh Paket Kombinasi?"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Dapatkan diskon spesial untuk pemesanan undangan + hantaran sekaligus!"
                  required
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => handleInputChange('button_text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Konsultasi Paket Hemat"
                />
              </div>

              {/* Styling Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Gradient
                  </label>
                  <input
                    type="text"
                    value={formData.background_gradient}
                    onChange={(e) => handleInputChange('background_gradient', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="linear-gradient(to right, #7c5367, #d1c7cc)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="text"
                    value={formData.text_color}
                    onChange={(e) => handleInputChange('text_color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Background
                  </label>
                  <input
                    type="text"
                    value={formData.button_bg_color}
                    onChange={(e) => handleInputChange('button_bg_color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text Color
                  </label>
                  <input
                    type="text"
                    value={formData.button_text_color}
                    onChange={(e) => handleInputChange('button_text_color', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#52303f"
                  />
                </div>
              </div>

              {/* Sort Order and Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{editingCTA ? 'Update' : 'Create'} CTA</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCTAAdmin;