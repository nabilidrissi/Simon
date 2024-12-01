'use client';

import { Templates } from '@/components/templates/Templates';
import { WelcomeGuide } from '@/components/onboarding/WelcomeGuide';

export default function HomePage() {
  return (
    <>
      <Templates />
      <WelcomeGuide />
    </>
  );
}