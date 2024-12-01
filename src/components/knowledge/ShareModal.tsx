'use client';

import { Dialog } from '@headlessui/react';
import { X, Copy, Check, Users, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function ShareModal({ isOpen, onClose, data }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [copied, setCopied] = useState(false);

  const shareLink = `${window.location.origin}/shared/${btoa(JSON.stringify({ id: data?.id }))}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Invited ${email} as ${role}`);
    setEmail('');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="relative bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6 border border-gray-700">
          <Dialog.Title className="text-xl font-semibold text-white mb-6">
            Share Knowledge Base
          </Dialog.Title>

          <div className="space-y-6">
            {/* Share Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Share Link
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white"
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-400 hover:text-gray-300"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Invite Form */}
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Invite Team Members
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Users className="w-4 h-4" />
                Invite
              </button>
            </form>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Dialog>
  );
}