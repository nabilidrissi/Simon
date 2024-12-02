'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import { fetchBrands } from '@/app/api/brands';
import Image from 'next/image';

interface Brand {
  id: string;
  brand_id: string;
  brand_name: string | null;
  fb_page_id: string | null;
  total_ad_count: number | null;
  total_active_ad_count: number | null;
  run_id: string;
}

export function Brands() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    brandName: '',
    brandDomain: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const { brands } = await fetchBrands();
        setBrands(brands);
      } catch (error) {
        toast.error('Failed to load brands');
        console.error('Error loading brands:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const filteredBrands = brands.filter(brand => 
    brand.brand_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Brand request submitted successfully');
      setShowRequestModal(false);
      setRequestForm({ brandName: '', brandDomain: '' });
    } catch (error) {
      toast.error('Failed to submit brand request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading brands...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Brands</h1>
          <p className="text-gray-400">
            Analyze ad performance across {brands.length} brands
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request Brand
        </button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-[0_0_15px_rgba(101,99,252,0.1)] hover:shadow-[0_0_30px_rgba(101,99,252,0.2)] hover:bg-gray-800 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                      src={`https://s3.us-east-1.amazonaws.com/fillcreative.io/logo_images/${brand.brand_id}.png`}
                                      alt={brand.brand_name || 'Brand logo'}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {brand.brand_name || 'Unnamed Brand'}
                    </h3>
                    <span className="text-sm text-gray-400">ID: {brand.brand_id}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Total Ads</p>
                  <p className="text-lg font-semibold text-white">
                    {brand.total_ad_count || 0}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Active Ads</p>
                  <p className="text-lg font-semibold text-white">
                    {brand.total_active_ad_count || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-gray-700">
                <button
                  onClick={() => router.push(`/brands/${brand.brand_id}/ads`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Ads
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Brand Modal */}
      <Dialog
        open={showRequestModal}
        onClose={() => !isSubmitting && setShowRequestModal(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="relative bg-gray-900 rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 border border-gray-700">
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-1 text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Dialog.Title className="text-2xl font-bold text-white mb-8">
              Request Brand
            </Dialog.Title>

            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={requestForm.brandName}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, brandName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand Domain
                </label>
                <input
                  type="url"
                  value={requestForm.brandDomain}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, brandDomain: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="www.website.com"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}