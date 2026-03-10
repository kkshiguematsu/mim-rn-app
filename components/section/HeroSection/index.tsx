import { ArcsBackground } from '@/components/layout/background/ArcsBackground';
import { HeroCard, heroCardMock } from '@/components/shared/cards/HeroCard';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HeroSection = () => {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();

  const handleChangeSeachBarText = (value: string) => {
    setSearchText(value);
  };

  return (
    <View
      className="relative z-10 -mx-7 -mt-7 gap-4 overflow-hidden rounded-b-3xl bg-neutral-100 p-7 dark:bg-neutral-800"
      style={{ paddingTop: insets.top }}
    >
      <ArcsBackground />

      <View>
        <Heading size="2xl">Pronto para</Heading>
        <Heading size="2xl">
          a próxima{' '}
          <Text size="3xl" className="text-primary-400">
            carga?
          </Text>
        </Heading>
      </View>

      <HeroCard {...heroCardMock} />

      {/* <DefaultCard padding="none" fadeIn="down" className="bg-transparent py-2"> */}
      <SearchBar
        className="rounded-full bg-neutral-100"
        value={searchText}
        placeholder="Digite um endereço"
        onChange={handleChangeSeachBarText}
        size="xl"
      />
      {/* </DefaultCard> */}
    </View>
  );
};
