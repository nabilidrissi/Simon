'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, TrendingUp, DollarSign, Users, Eye, Clock } from 'lucide-react';
import Link from 'next/link';

// Generate realistic ad data with images
const generateAds = (brandId: string) => {
  const adTypes = ['Image', 'Video', 'Carousel', 'Collection'];
  const objectives = ['Conversions', 'Brand Awareness', 'Traffic', 'Engagement'];
  const placements = ['Feed', 'Stories', 'Reels', 'Marketplace'];
  const statuses = ['Active', 'Paused', 'Ended'];
  
  const adImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `ad-${brandId}-${i + 1}`,
    title: `Ad Campaign ${i + 1}`,
    type: adTypes[Math.floor(Math.random() * adTypes.length)],
    objective: objectives[Math.floor(Math.random() * objectives.length)],
    placement: placements[Math.floor(Math.random() * placements.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    spend: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 1000000),
    clicks: Math.floor(Math.random() * 50000),
    conversions: Math.floor(Math.random() * 1000),
    ctr: (Math.random() * 5).toFixed(2),
    cpc: (Math.random() * 2).toFixed(2),
    roas: (Math.random() * 10).toFixed(2),
    startDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    image: `${adImages[i % adImages.length]}?auto=format&fit=crop&w=800&q=80`
  }));
};

export function BrandAds() {
  const { brandId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('spend');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Generate ads data
  const ads = generateAds(brandId as string);

  // Filter and sort ads
  const filteredAds = ads
    .filter(ad => selectedFilter === 'all' || ad.status.toLowerCase() === selectedFilter)
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/brands"
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Brands
            </Link>
            <h1 className="text-2xl font-bold text-white">Brand {brandId} Ads</h1>
            <p className="text-gray-400">
              Analyzing performance across {ads.length} ad campaigns
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Total Spend</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(ads.reduce((sum, ad) => sum + ad.spend, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Impressions</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(ads.reduce((sum, ad) => sum + ad.impressions, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Conversions</p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(ads.reduce((sum, ad) => sum + ad.conversions, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. ROAS</p>
                <p className="text-2xl font-bold text-white">
                  {(ads.reduce((sum, ad) => sum + parseFloat(ad.roas), 0) / ads.length).toFixed(2)}x
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-700 hover:shadow-lg transition-all group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white">{ad.title}</h3>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  ad.status === 'Active'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : ad.status === 'Paused'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {ad.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Spend</p>
                    <p className="text-lg font-semibold text-white">
                      {formatCurrency(ad.spend)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">ROAS</p>
                    <p className="text-lg font-semibold text-white">
                      {ad.roas}x
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">CTR</p>
                    <p className="font-medium text-white">{ad.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">CPC</p>
                    <p className="font-medium text-white">${ad.cpc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Conv.</p>
                    <p className="font-medium text-white">{formatNumber(ad.conversions)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(ad.startDate)} - {formatDate(ad.endDate)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs rounded-full">
                    {ad.type}
                  </span>
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs rounded-full">
                    {ad.placement}
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs rounded-full">
                    {ad.objective}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}