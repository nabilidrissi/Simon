'use client';

import { ArrowRight, Info } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface BrandToneSelectorProps {
  analysisResult: AnalysisResult;
  onToneSelected: (tone: string) => void;
}

const BRAND_TONES = [
  {
    id: 'professional',
    label: 'Professional',
    icon: '🎯',
    description: 'Authoritative and trustworthy communication style',
    examples: ['Expert insights', 'Data-driven results', 'Industry-leading solutions']
  },
  {
    id: 'humorous',
    label: 'Humorous',
    icon: '😄',
    description: 'Light-hearted and entertaining approach',
    examples: ['Witty headlines', 'Playful messaging', 'Relatable content']
  },
  {
    id: 'inspiring',
    label: 'Inspiring',
    icon: '✨',
    description: 'Motivational and empowering voice',
    examples: ['Transformative stories', 'Aspirational goals', 'Life-changing results']
  },
  {
    id: 'casual',
    label: 'Casual',
    icon: '👋',
    description: 'A relaxed and engaging style, perfect for friendly and approachable campaigns',
    examples: ['Friendly conversations', 'Easy-going tone', 'Relatable stories']
  }
];

export function BrandToneSelector({ analysisResult, onToneSelected }: BrandToneSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
          <span className="text-3xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Select Your Brand Voice
        </h2>
        <p className="mt-2 text-gray-400">
          Choose a tone that best represents your brand personality
        </p>
      </div>

      <div className="bg-blue-900/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-100 mb-4">
          Analysis Results
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-blue-200">
              Products Detected
            </div>
            <div className="text-2xl font-bold text-white">
              {analysisResult.products.length}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-blue-200">
              Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {analysisResult.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-800/50 text-blue-200 text-sm rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-blue-200">
              Main Keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {analysisResult.mainKeywords.slice(0, 5).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-800/50 text-blue-200 text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BRAND_TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onToneSelected(tone.id)}
            className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl border-2 border-transparent hover:border-blue-500 transition-all text-left"
          >
            <span className="text-3xl">{tone.icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white flex items-center justify-between">
                {tone.label}
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </h3>
              <p className="mt-1 text-gray-400">
                {tone.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tone.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}