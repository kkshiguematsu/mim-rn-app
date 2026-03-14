import { ArcsBackground } from '@/components/layout/background/ArcsBackground';
import { HeroCard, heroCardMock } from '@/components/shared/cards/HeroCard';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
}

export const HeroSection = ({ style }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleChangeSeachBarText = (value: string) => {
    setSearchText(value);
  };

  return (
    <View
      style={style}
      className="relative -mx-7 -mt-7 gap-4 overflow-hidden rounded-b-3xl bg-neutral-100 p-7 dark:bg-neutral-800"
    >
      <ArcsBackground />

      <BlurView
        intensity={100}
        tint="light"
        style={StyleSheet.absoluteFillObject}
        className="overflow-hidden"
      />

      <View>
        <Heading size="2xl">Pronto para</Heading>
        <Heading size="2xl">
          a próxima{' '}
          <Text size="3xl" className="text-primary-600">
            carga?
          </Text>
        </Heading>
      </View>

      <HeroCard {...heroCardMock} />

      <SearchBar
        className="rounded-full bg-neutral-100"
        value={searchText}
        placeholder="Digite um endereço"
        onChange={handleChangeSeachBarText}
        size="xl"
      />
    </View>
  );
};
