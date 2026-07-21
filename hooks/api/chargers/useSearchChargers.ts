import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { PaginatedResponse } from '@/types/api/paginatedResponse.type';
import { Charger } from '@/types/charger/charger.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

interface UseSearchChargersParams {
  search?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tenantId?: string;
}

const searchChargers = async (params: UseSearchChargersParams & { page: number }) => {
  const response = await api.get<PaginatedResponse<Charger>>('/chargers', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      ...(params.tenantId && { tenantId: params.tenantId }),
    },
  });
  return response.data;
};

export const useSearchChargers = ({
  search = '',
  limit = 20,
  sortBy = '',
  sortOrder = 'desc',
  tenantId = '',
}: UseSearchChargersParams = {}) => {
  const { showToast } = useToastMessage();

  const searchFn = useCallback(
    ({ pageParam = 1 }: { pageParam: number }) =>
      searchChargers({
        search,
        limit,
        sortBy,
        sortOrder,
        tenantId,
        page: pageParam,
      }),
    [search, limit, sortBy, sortOrder, tenantId]
  );

  const query = useInfiniteQuery({
    queryKey: ['chargers', search, limit, sortBy, sortOrder, tenantId],
    queryFn: searchFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPageParam < lastPage.lastPage ? lastPageParam + 1 : undefined;
    },
    enabled: search.length > 0,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.error) {
      showToast({
        title: 'Erro',
        description: query.error.message || 'Erro ao buscar carregadores',
        type: 'error',
      });
    }
  }, [query.error, showToast]);

  const flatData = query.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    ...query,
    data: flatData,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};
