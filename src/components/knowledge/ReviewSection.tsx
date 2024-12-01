'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface ReviewSectionProps {
  analysisResult: AnalysisResult;
  selectedTone: string;
  onSave: () => void;
  isSaving: boolean;
}

export function ReviewSection({ 
  analysisResult, 
  selectedTone, 
  onSave,
  isSaving 
}: ReviewSectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Review and Save
        </h2>
        <p className="mt-2 text-gray-400">
          Review your knowledge base configuration before saving
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Analysis Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-400">
                Brand Name
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                {analysisResult.brandName}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">
                Selected Tone
              </div>
              <div className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-200">
                  {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">
                Products Detected
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                {analysisResult.products.length}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Products Detected
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisResult.products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800/50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">
                      {product.name}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-xs font-medium bg-blue-900/30 text-blue-200">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-center">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Knowledge Base
            </>
          )}
        </button>
      </div>
    </div>
  );
}