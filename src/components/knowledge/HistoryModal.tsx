'use client';

import { format } from 'date-fns';
import { X, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { useState } from 'react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: any[];
}

export function HistoryModal({ isOpen, onClose, history = [] }: HistoryModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  const formatDate = (timestamp: string | null | undefined) => {
    if (!timestamp) return 'Date unavailable';
    try {
      return format(new Date(timestamp), 'MMM d, yyyy HH:mm:ss');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const getVersionDiff = (currentVersion: any, previousVersion: any) => {
    if (!previousVersion || !currentVersion) return null;

    try {
      return {
        oldValue: JSON.stringify(previousVersion, null, 2),
        newValue: JSON.stringify(currentVersion, null, 2)
      };
    } catch (error) {
      console.error('Error generating diff:', error);
      return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="relative bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <Dialog.Title className="text-xl font-semibold text-white">
              Version History
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-5 h-[600px]">
            {/* Versions List */}
            <div className="col-span-2 border-r border-gray-700 overflow-y-auto">
              {history.map((version, index) => (
                <button
                  key={version?.timestamp || index}
                  onClick={() => setSelectedVersion(index)}
                  className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-700/50 transition-colors ${
                    selectedVersion === index ? 'bg-blue-900/30' : ''
                  }`}
                >
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">
                      Version {history.length - index}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(version?.timestamp)}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Diff Viewer */}
            <div className="col-span-3 p-6 overflow-y-auto">
              {selectedVersion !== null ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Changes
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVersion(prev => prev !== null ? Math.min(prev + 1, history.length - 1) : null)}
                        disabled={selectedVersion >= history.length - 1}
                        className="p-1.5 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedVersion(prev => prev !== null ? Math.max(prev - 1, 0) : null)}
                        disabled={selectedVersion <= 0}
                        className="p-1.5 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {selectedVersion < history.length - 1 && (
                    <ReactDiffViewer
                      oldValue={getVersionDiff(
                        history[selectedVersion],
                        history[selectedVersion + 1]
                      )?.oldValue}
                      newValue={getVersionDiff(
                        history[selectedVersion],
                        history[selectedVersion + 1]
                      )?.newValue}
                      splitView={false}
                      useDarkTheme={true}
                      styles={{
                        contentText: {
                          fontSize: '12px',
                          lineHeight: '1.5',
                          fontFamily: 'monospace'
                        }
                      }}
                    />
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a version to view changes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}