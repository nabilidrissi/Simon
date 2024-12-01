'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-gray-700 rounded-lg hover:bg-white/20 transition-colors"
      >
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value || label}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-56 max-h-64 overflow-y-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option === value ? '' : option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                  option === value 
                    ? 'text-blue-400 bg-blue-900/30' 
                    : 'text-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}