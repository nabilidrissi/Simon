'use client';

import Image from 'next/image';
import type { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const isVertical = template.format === '9:16 (Vertical)';

  return (
    <div 
      className={`group bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
        isVertical ? 'row-span-2' : ''
      }`}
    >
      <div className="relative aspect-square">
        <Image
          src={template.image}
          alt={template.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button 
              className="flex-1 px-3 py-1.5 bg-[#00C4CC]/90 hover:bg-[#00C4CC] text-white text-sm font-medium rounded-lg backdrop-blur-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(template.canvaUrl, '_blank');
              }}
            >
              Canva
            </button>
            <button 
              className="flex-1 px-3 py-1.5 bg-black/90 hover:bg-black text-white text-sm font-medium rounded-lg backdrop-blur-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(template.figmaUrl, '_blank');
              }}
            >
              Figma
            </button>
          </div>
        </div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[calc(100%-24px)]">
          <span className="px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {template.category}
          </span>
          <span className="px-2.5 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {template.format}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-white line-clamp-1">{template.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{template.adType}</p>
      </div>
    </div>
  );
}