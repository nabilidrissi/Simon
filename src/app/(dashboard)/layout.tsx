'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!currentUser) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#13141B]">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Header />
        <div className="flex-1 overflow-hidden mt-6">
          <div className="page-bg h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}