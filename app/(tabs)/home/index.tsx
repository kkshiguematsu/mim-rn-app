import React from 'react';

import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Page } from '@/components/shared/page';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useNavigation } from 'expo-router';
import { Battery } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleChangeSeachBarText = (value: string) => {
    setSearchText(value);
  };

  return (
    <Page.Header title="Inicio">
      <DefaultCard size="full" padding="md" fadeIn="down">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Icon as={Battery} size={'2xl'} className="text-primary-500" />
            <View className="gap-1">
              <Heading size="2xl">78%</Heading>
              <Text size="sm">Autonomia: 254km</Text>
            </View>
          </View>

          <View className="flex flex-col items-end justify-end gap-1">
            <Text size="sm">Veículo</Text>
            <Heading size="sm">Tesla Model 3</Heading>
          </View>
        </View>
      </DefaultCard>

      <DefaultCard size="full" padding="none" fadeIn="down" className="py-2">
        <SearchBar
          className="border-0 bg-transparent dark:bg-transparent"
          value={searchText}
          placeholder="Digite um endereço"
          onChange={handleChangeSeachBarText}
          size="lg"
        />
      </DefaultCard>
      {/* </Page.Scroll> */}
    </Page.Header>
  );
}
