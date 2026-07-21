import { Charger } from '@/types/charger/charger.type';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { ActivityIndicator, Text, View } from 'react-native';
import { ChargerListItem } from './ChargerListItem';

interface ChargerListProps {
  data: Charger[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export function ChargerList({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}: ChargerListProps) {
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="items-center justify-center py-6">
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-3 text-neutral-600 dark:text-neutral-400">Buscando estações...</Text>
      </View>
    );
  }

  // if (data.length === 0) {
  //   return (
  //     <View className="mt-5 flex-1 items-center justify-center px-4">
  //       <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
  //         Nenhuma estação encontrada
  //       </Text>
  //       <Text className="text-center text-sm text-neutral-600 dark:text-neutral-400">
  //         Tente ajustar seus critérios de busca
  //       </Text>
  //     </View>
  //   );
  // }

  const renderSeparator = () => <View className="my-4 h-0.5 bg-neutral-200" />;

  return (
    <BottomSheetFlatList
      data={data}
      renderItem={({ item }: { item: Charger }) => <ChargerListItem item={item} />}
      keyExtractor={(item: Charger, index: number) => `${item._id}-${index}`}
      ItemSeparatorComponent={renderSeparator}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{
        paddingVertical: 8,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}
