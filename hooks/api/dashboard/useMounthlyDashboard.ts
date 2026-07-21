import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { MonthlyStatsResponse } from '@/types/dashboard/mounthly/mounthly.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchMonthlyDashboard = async () => {
  const response = await api.get<MonthlyStatsResponse>('/dashboard/my');
  return response.data;
};

export const useMonthlyDashboard = () => {
  const { showToast } = useToastMessage();

  const query = useQuery<MonthlyStatsResponse>({
    queryKey: ['monthly-dashboard'],
    queryFn: fetchMonthlyDashboard,
    staleTime: 30 * 60 * 1000,
    // refetchInterval: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.error) {
      showToast({
        title: 'Erro ao carregar dashboard',
        description: query.error instanceof Error ? query.error.message : 'Erro desconhecido',
        type: 'error',
      });
    }
  }, [query.error]);

  return { ...query };
};
