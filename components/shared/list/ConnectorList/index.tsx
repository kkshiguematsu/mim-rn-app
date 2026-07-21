import { Text } from '@/components/ui/text';

import React from 'react';
import { FlatList, View } from 'react-native';
import { ConnectorCard } from '../../cards/ConnectorCard';
export const ConnectorList = ({ connectors }: { connectors: any[] }) => {
  return (
    <View className="gap-2">
      <Text size="sm" className="mx-5 font-semibold text-neutral-500">
        Conectores disponíveis
      </Text>

      <FlatList
        data={connectors}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
        renderItem={({ item, index }) => <ConnectorCard connector={item} index={index} />}
      />
    </View>
  );
};
