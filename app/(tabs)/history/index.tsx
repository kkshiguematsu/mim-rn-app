import { HistoryForm } from '@/components/form/HistoryForm';
import { Page } from '@/components/layout/page';
import { TransactionHistoryCard } from '@/components/shared/cards/TransactionHistoryCard';
import { Text } from '@/components/ui/text';
import {
  TransactionHistoryParams,
  useTransactionsHistory,
} from '@/hooks/api/transation/useTransactionsHistory';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Transaction } from '@/types/transaction/transaction.type';
import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HistoryPage() {
  const [filters, setFilters] = useState<TransactionHistoryParams>({
    limit: 10,
    sortBy: 'startedAt',
    sortOrder: 'desc',
  });

  const insets = useSafeAreaInsets();
  const bottomMenuHeight = useBottomMenuHeight();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch, isRefetching } =
    useTransactionsHistory(filters);

  const transactions = data?.pages.flatMap((page) => page.items) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleFiltersChange = (newFilters: TransactionHistoryParams) => {
    setFilters(newFilters);
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View className="px-7">
      <TransactionHistoryCard key={item._id} data={item} />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View className="py-10">
        <Text className="text-center text-neutral-400">Nenhuma transação encontrada</Text>
      </View>
    );
  };

  return (
    <Page needsPadding={false} needsBottomTabBar={false}>
      <Page.Header content={<HistoryForm onFiltersChange={handleFiltersChange} />} />

      {isLoading ? (
        <View className="py-8">
          <ActivityIndicator className="text-primary-500" size="small" />
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 8, paddingBottom: bottomMenuHeight + insets.bottom }}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Page>
  );
}
