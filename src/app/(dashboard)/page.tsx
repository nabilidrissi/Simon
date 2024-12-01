'use client';

import { Templates } from '@/components/templates/Templates';
import { WelcomeGuide } from '@/components/onboarding/WelcomeGuide';

export default function DashboardPage() {
  return (
    <>
      <Templates />
      <WelcomeGuide />
    </>
  );
}