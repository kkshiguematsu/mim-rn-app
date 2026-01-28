import { Page } from '@/components/shared/Page';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { View } from 'react-native';

export default function Home() {
  const [searchText, setSearchText] = useState('');

  const handleChangeSeachBarText = (value: string) => {
    setSearchText(value);
  };

  return (
    <Page componentRender="scrollview">
      <View>
        <SearchBar
          value={searchText}
          placeholder="Digite um endereço"
          onChange={handleChangeSeachBarText}
          size="xl"
        />
      </View>

      <Text>Home</Text>
    </Page>
  );
}
