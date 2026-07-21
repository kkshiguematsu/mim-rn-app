import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { Ticket } from '@/types/ticket/ticket.type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export interface PaginatedTicketsResponse {
  items: Ticket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TicketsParams {
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tenantId?: string;
}

const fetchTickets = async (params: TicketsParams, pageParam: number) => {
  const response = await api.get<PaginatedTicketsResponse>('/tickets/my', {
    params: {
      ...params,
      page: pageParam,
    },
  });

  return response.data;
};

export const useTickets = (params: TicketsParams = {}) => {
  const defaultParams: TicketsParams = {
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...params,
  };

  const { showToast } = useToastMessage();

  const query = useInfiniteQuery({
    queryKey: ['tickets', defaultParams],
    queryFn: ({ pageParam }) => fetchTickets(defaultParams, pageParam),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
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

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (query.error) {
      const errorMessage =
        query.error instanceof Error ? query.error.message : 'Erro ao carregar tickets';

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
