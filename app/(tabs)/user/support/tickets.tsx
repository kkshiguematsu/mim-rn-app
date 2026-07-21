import { Text } from '@/components/ui/text';

import { TicketsFilterForm } from '@/components/form/ticket/TicketsFilterForm';
import { Page } from '@/components/layout/page';
import { TicketCard } from '@/components/shared/cards/TicketCard';
import { TicketCardSkeleton } from '@/components/shared/cards/TicketCard/TicketCardSkeleton';
import { TicketsParams, useTickets } from '@/hooks/api/tickets/useTickets';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Ticket } from '@/types/ticket/ticket.type';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TicketsPage() {
  const [filters, setFilters] = useState<TicketsParams>({
    limit: 10,
    sortBy: 'startedAt',
    sortOrder: 'desc',
  });

  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } =
    useTickets(filters);

  const inset = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomMenuHeight();

  const paddingBottom = bottomTabBarHeight + inset.bottom;
  const tickets = data?.pages.flatMap((page) => page.items) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  const handleFiltersChange = (newFilters: TicketsParams) => {
    setFilters(newFilters);
  };
  const renderItem = ({ item }: { item: Ticket }) => {
    return <TicketCard key={item._id} ticket={item} />;
  };
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
        <Text className="text-center text-neutral-400">Nenhuma chamado encontrada</Text>
      </View>
    );
  };
  return (
    <Page needsPadding={false} needsBottomTabBar={false}>
      <Page.Header
        content={<TicketsFilterForm onFiltersChange={handleFiltersChange} />}
        hasBackButton
      />

      {isLoading ? (
        <View className="gap-2 px-7 py-4">
          <TicketCardSkeleton />
          <TicketCardSkeleton />
          <TicketCardSkeleton />
          <TicketCardSkeleton />
          <TicketCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          className="flex-1 px-7"
          contentContainerStyle={{
            gap: 8,
            paddingBottom,
          }}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={isFetchingNextPage} onRefresh={refetch} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Page>
  );
}
