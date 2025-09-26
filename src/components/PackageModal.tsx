'use client';

import { X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Package {
  id: number;
  name: string;
  price: number;
  price_display: string;
  features: string[];
  is_popular?: boolean;
  sort_order?: number;
}

interface Template {
  id: number;
  title: string;
  category: string;
  price: string | number;
  image_url?: string;
  images?: string[];
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  packages?: Package[];
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  packages: Package[];
  onPackageSelect?: (packageData: Package, template: Template) => void;
}

const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onClose,
  template,
  packages,
  onPackageSelect
}) => {
  const [loading, setLoading] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePackageSelect = (pkg: Package) => {
    if (template && onPackageSelect) {
      onPackageSelect(pkg, template);
    } else {
      // Default behavior - show alert
      alert(`Anda memilih ${pkg.name} untuk template ${template?.title}`);
    }
    onClose();
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Pilih Paket untuk Template
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {template.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Template Info */}
          <div className="mb-6 sm:mb-8 p-4 bg-gradient-to-r from-[#52303f]/10 to-[#7c5367]/10 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              {template.image_url && (
                <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={template.image_url}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">
                  {template.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Kategori: {template.category}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {template.description || 'Template undangan pernikahan modern dengan desain yang elegan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg ${
                  pkg.is_popular
                    ? 'border-[#52303f] bg-gradient-to-br from-[#52303f]/5 to-[#7c5367]/5'
                    : 'border-gray-200 hover:border-[#52303f]/30'
                }`}
              >
                {pkg.is_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#52303f] to-[#7c5367] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Terpopuler
                    </span>
                  </div>
                )}

                <div className="text-center mb-4 sm:mb-6">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {pkg.name}
                  </h4>
                  <div className="text-2xl sm:text-3xl font-bold text-[#52303f]">
                    {pkg.price_display}
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#52303f] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                    pkg.is_popular
                      ? 'bg-gradient-to-r from-[#52303f] to-[#7c5367] text-white hover:from-[#7c5367] hover:to-[#52303f] shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'border-2 border-[#52303f] text-[#52303f] hover:bg-[#52303f] hover:text-white'
                  }`}
                  onClick={() => handlePackageSelect(pkg)}
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Pilih Paket'}
                </button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Informasi Tambahan:
            </h5>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
              <li>• Pembayaran dapat dilakukan melalui transfer bank atau e-wallet</li>
              <li>• Proses pembuatan undangan 1-3 hari kerja setelah pembayaran</li>
              <li>• Konsultasi gratis untuk semua paket</li>
              <li>• Garansi revisi sesuai paket yang dipilih</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;