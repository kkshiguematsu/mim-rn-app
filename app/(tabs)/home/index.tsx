import { Page } from '@/components/layout/page';
import { CardsSliderSection } from '@/components/section/CardsSliderSection';
import { CardSliderItemProps } from '@/components/section/CardsSliderSection/CardSliderItem';
import { HeroSection } from '@/components/section/HeroSection';
import { MounthDashboardSection } from '@/components/section/MounthDashboardSection';
import { StationsListSection } from '@/components/section/StationsListSection';
import { useRouter } from 'expo-router';
import { Car, Headset, Heart } from 'lucide-react-native';
import React from 'react';

export default function HomeScreen() {
  const router = useRouter();

  const sliderCardsList: CardSliderItemProps[] = [
    {
      title: 'Veículos',
      icon: Car,
      color: 'blue',
      onPress: () => router.push('/(tabs)/user/vehicle'),
    },
    // {
    //   title: 'Pagamentos',
    //   icon: CreditCard,
    //   color: 'green',
    //   onPress: () => router.push('/(tabs)/user/payments'),
    // },
    {
      title: 'Favoritos',
      icon: Heart,
      color: 'red',
      onPress: () => router.push('/(tabs)/home/favoriteCharges'),
    },
    {
      title: 'Suporte',
      icon: Headset,
      color: 'purple',
      onPress: () => router.push('/(tabs)/user/support'),
    },
  ];

  return (
    <Page.Scroll hasHeader={false} needsPadding className="gap-3">
      <Page.Header content={<HeroSection />} applyInsetsTo="content" />

      <CardsSliderSection
        className="-mx-7"
        contentContainerClassName="px-7"
        cards={sliderCardsList}
      />

      <StationsListSection />

      <MounthDashboardSection />
    </Page.Scroll>
  );
}
