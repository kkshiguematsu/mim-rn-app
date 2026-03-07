import { Page } from '@/components/layout/page';
import { HeroSection } from '@/components/section/HeroSection';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Page.Scroll hasHeader={false} className="gap-4">
      <Page.Header content={<HeroSection />} />
    </Page.Scroll>
  );
}
