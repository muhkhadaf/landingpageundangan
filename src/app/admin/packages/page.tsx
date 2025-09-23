'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Check, Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
  price_display: string;
  features: string[];
  popular: boolean;
  is_active: boolean;
}

interface PackageForm {
  name: string;
  description: string;
  price: number;
  price_display: string;
  features: string[];
  popular: boolean;
}

const PackagesAdmin = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<PackageForm>({
    name: '',
    description: '',
    price: 0,
    price_display: '',
    features: [''],
    popular: false
  });

  // Fetch packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      if (!response.ok) throw new Error('Failed to fetch packages');
      const result = await response.json();
      
      // Transform data untuk admin view
      const transformedPackages = result.data?.map((pkg: {
        id: number;
        name: string;
        description?: string;
        price: number | string;
        price_display?: string;
        features?: string[];
        popular?: boolean;
      }) => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description || '',
        price: parseFloat((pkg.price || '0').toString().replace(/[^\d]/g, '')),
        price_display: pkg.price_display || 'Rp 0',
        features: pkg.features || [],
        popular: pkg.popular || false,
        is_active: true
      })) || [];
      
      setPackages(transformedPackages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Format price display
  const formatPriceDisplay = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  // Handle form changes
  const handleInputChange = (field: keyof PackageForm, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-format price display when price changes
    if (field === 'price') {
      setFormData(prev => ({
        ...prev,
        price_display: formatPriceDisplay(Number(value))
      }));
    }
  };

  // Handle feature changes
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  // Open modal for create/edit
  const openModal = (pkg?: Package) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        name: pkg.name,
        description: pkg.description || '',
        price: pkg.price,
        price_display: pkg.price_display,
        features: pkg.features.length > 0 ? pkg.features : [''],
        popular: pkg.popular
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        price_display: '',
        features: [''],
        popular: false
      });
    }
    setIsModalOpen(true);
  };

  // Save package
  const savePackage = async () => {
    try {
      setSaving(true);
      
      // Validate form
      if (!formData.name || formData.price <= 0 || formData.features.filter(f => f.trim()).length === 0) {
        alert('Please fill in all required fields');
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        price_display: formData.price_display,
        features: formData.features.filter(f => f.trim()),
        is_popular: formData.popular
      };

      const url = editingPackage ? `/api/packages/${editingPackage.id}` : '/api/packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save package');
      }

      setIsModalOpen(false);
      fetchPackages();
      alert(editingPackage ? 'Package updated successfully!' : 'Package created successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save package');
    } finally {
      setSaving(false);
    }
  };

  // Delete package
  const deletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete package');
      
      fetchPackages();
      alert('Package deleted successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete package');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" message="Loading packages..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{color: '#52303f'}}>
          Packages Management
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Package
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold" style={{color: '#52303f'}}>
                    {pkg.name}
                  </h3>
                  {pkg.popular && (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold mb-2" style={{color: '#d4af37'}}>
                  {pkg.price_display}
                </p>
                {pkg.description && (
                  <p className="text-gray-600 mb-3">{pkg.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(pkg)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Features:</h4>
              <ul className="space-y-1">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold" style={{color: '#52303f'}}>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Package Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Paket Basic"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Package description..."
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="150000"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Display: {formData.price_display || 'Rp 0'}
                </p>
              </div>

              {/* Popular */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => handleInputChange('popular', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                  Mark as popular package
                </label>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features *
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={savePackage}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  {saving ? 'Saving...' : 'Save Package'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesAdmin;