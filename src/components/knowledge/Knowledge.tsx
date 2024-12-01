'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Globe, History, Share2, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { ProgressSteps } from './ProgressSteps';
import { AnalysisSection } from './AnalysisSection';
import { BrandToneSelector } from './BrandToneSelector';
import { ReviewSection } from './ReviewSection';
import { ShareModal } from './ShareModal';
import { HistoryModal } from './HistoryModal';
import { KnowledgeMap } from './KnowledgeMap';
import { useKnowledgeStore } from '@/hooks/useKnowledgeStore';
import type { AnalysisResult } from '@/types';

const STEPS = [
  {
    title: 'Analysis',
    description: 'Product data extraction'
  },
  {
    title: 'Configuration',
    description: 'Brand voice setup'
  },
  {
    title: 'Review',
    description: 'Import testimonials'
  }
];

export function Knowledge() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedTone, setSelectedTone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { formData, updateFormData, deleteFromHistory, history = [] } = useKnowledgeStore();

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentStep(1);
    toast.success(`Successfully analyzed ${result.products.length} products!`);
  };

  const handleToneSelected = (tone: string) => {
    setSelectedTone(tone);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDelete = async () => {
    if (!formData?.timestamp) {
      toast.error('No knowledge base to delete');
      return;
    }

    setIsDeleting(true);
    
    try {
      await deleteFromHistory(formData.timestamp);
      toast.success('Knowledge base deleted successfully');
      setShowDeleteDialog(false);
      router.push('/knowledge');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete knowledge base');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!analysisResult || !selectedTone) {
      toast.error('Please complete all steps before saving');
      return;
    }

    setIsSaving(true);

    try {
      const knowledgeData = {
        ...analysisResult,
        brandTone: selectedTone,
        timestamp: new Date().toISOString()
      };

      await updateFormData(knowledgeData);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast.success('Knowledge base saved successfully!', {
        duration: 5000,
        icon: '🎉'
      });

      // Reset creation state
      setAnalysisResult(null);
      setSelectedTone('');
      setCurrentStep(0);

    } catch (error) {
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to save knowledge base. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <ProgressSteps steps={STEPS} currentStep={currentStep} />
      
      <div className="knowledge-content scrollbar-thin">
        <div className="max-w-7xl mx-auto space-y-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="group mb-6 flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          )}

          <div className="space-y-12">
            <div className="max-w-3xl mx-auto">
              {currentStep === 0 && (
                <AnalysisSection onAnalysisComplete={handleAnalysisComplete} />
              )}

              {currentStep === 1 && analysisResult && (
                <BrandToneSelector
                  analysisResult={analysisResult}
                  onToneSelected={handleToneSelected}
                />
              )}

              {currentStep === 2 && analysisResult && (
                <ReviewSection
                  analysisResult={analysisResult}
                  selectedTone={selectedTone}
                  onSave={handleSave}
                  isSaving={isSaving}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => !isDeleting && setShowDeleteDialog(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="relative bg-gray-900 rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-gray-700">
            <Dialog.Title className="text-xl font-semibold text-white mb-4">
              Delete Knowledge Base
            </Dialog.Title>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this knowledge base? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        data={formData}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        history={[formData]}
      />
    </div>
  );
}