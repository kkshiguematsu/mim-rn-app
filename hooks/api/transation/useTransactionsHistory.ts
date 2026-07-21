import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { PaginatedResponse } from '@/types/api/paginatedResponse.type';
import { Transaction } from '@/types/transaction/transaction.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export interface TransactionHistoryParams {
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tenantId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

const fetchTransactionsHistory = async (params: TransactionHistoryParams, pageParam: number) => {
  const response = await api.get<PaginatedResponse<Transaction>>('/transactions/my', {
    params: {
      ...params,
      page: pageParam,
    },
  });
  return response.data;
};

export const useTransactionsHistory = (params: TransactionHistoryParams = {}) => {
  const defaultParams: TransactionHistoryParams = {
    limit: 10,
    sortBy: 'startedAt',
    sortOrder: 'desc',
    ...params,
  };

  const { showToast } = useToastMessage();

  const query = useInfiniteQuery({
    queryKey: ['transactions-history', defaultParams],
    queryFn: ({ pageParam }) => fetchTransactionsHistory(defaultParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page > 1) {
        return firstPage.page - 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  useEffect(() => {
    if (query.error) {
      const errorMessage =
        query.error instanceof Error ? query.error.message : 'Erro ao carregar histórico';
      showToast({
        type: 'error',
        variant: 'solid',
        title: 'Erro',
        description: errorMessage,
      });
    }
  }, [query.error, showToast]);

  return query;
};
