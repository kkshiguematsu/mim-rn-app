import { Text } from '@/components/ui/text';
import React from 'react';

import { Page } from '@/components/layout/page';
import { ChargerListItem } from '@/components/shared/list/ChargerList/ChargerListItem';
import { useGetFavoriteChargers } from '@/hooks/api/favorite/useGetFavoriteChargers';
import { usePlatform } from '@/hooks/utils/usePlatform';
import { Charger } from '@/types/charger/charger.type';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function favoriteCharges() {
  const { isIos } = usePlatform();
  const { data, isLoading, isFetching } = useGetFavoriteChargers();

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View className="items-center justify-center py-6">
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderSeparator = () => <View className="my-4 h-0.5 bg-neutral-200" />;

  return (
    <Page needsPadding={false} needsSafeArea={false} needsBottomTabBar={false}>
      <View className="pt-7">
        <Page.Header title="Favoritos" applyInsetsTo={isIos ? 'none' : 'wrapper'} hasBackButton />
      </View>

      <View className="p-7">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
            <Text className="mt-3 text-neutral-600 dark:text-neutral-400">
              Buscando estações...
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }: { item: Charger }) => <ChargerListItem item={item} />}
            keyExtractor={(item: Charger, index: number) => `${item._id}-${index}`}
            ItemSeparatorComponent={renderSeparator}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{
              paddingVertical: 8,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Page>
  );
}
