'use client';

import { X, Copy, Check, History, ChevronDown, Box } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import type { Template } from '@/types';

interface AdPanelProps {
  template: Template;
  onClose: () => void;
}

export function AdPanel({ template, onClose }: AdPanelProps) {
  const [suggestions] = useState<string[]>([
    "Drive 3x more sales with our proven formula",
    "Join 50,000+ happy customers worldwide",
    "Transform your results in just 14 days"
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] card-gradient shadow-2xl flex flex-col z-50">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Template Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="aspect-square relative">
          <Image
            src={template.image}
            alt={template.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-sm rounded-full">
                {template.category}
              </span>
              <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-sm rounded-full">
                {template.format}
              </span>
              <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                {template.adType}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">AI Text Suggestions</h4>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 group relative"
                >
                  <p className="pr-10 text-white">{suggestion}</p>
                  <button
                    onClick={() => handleCopy(suggestion, index)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.open(template.canvaUrl, '_blank')}
              className="flex-1 px-4 py-2 bg-[#6563fc] text-white rounded-lg hover:bg-[#5452d6] transition-colors"
            >
              Edit in Canva
            </button>
            <button
              onClick={() => window.open(template.figmaUrl, '_blank')}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Edit in Figma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}