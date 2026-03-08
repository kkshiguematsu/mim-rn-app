import { Page } from '@/components/layout/page';
import { CardsSliderSection } from '@/components/section/CardsSliderSection';
import { CardSliderItemProps } from '@/components/section/CardsSliderSection/CardSliderItem';
import { HeroSection } from '@/components/section/HeroSection';
import { StationsListSection } from '@/components/section/StationsListSection';
import { useNavigation } from 'expo-router';
import { Car, CreditCard, Headset, Heart } from 'lucide-react-native';
import React from 'react';

const mockCards: CardSliderItemProps[] = [
  {
    title: 'Veículos',
    icon: Car,
    color: 'blue',
  },
  {
    title: 'Pagamentos',
    icon: CreditCard,
    color: 'green',
  },
  {
    title: 'Favoritos',
    icon: Heart,
    color: 'red',
  },
  {
    title: 'Suporte',
    icon: Headset,
    color: 'purple',
    onPress: () => {},
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Page.Scroll hasHeader={false} className="gap-3">
      <Page.Header content={<HeroSection />} />

      <CardsSliderSection className="-mx-7" contentContainerClassName="px-7" cards={mockCards} />

      <StationsListSection />
    </Page.Scroll>
  );
}
