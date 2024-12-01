'use client';

import { Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-gray-800/50 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index < currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : index === currentStep
                      ? 'bg-gray-800 border-blue-600 text-blue-600'
                      : 'bg-gray-800 border-gray-600 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    index <= currentStep
                      ? 'text-white'
                      : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}