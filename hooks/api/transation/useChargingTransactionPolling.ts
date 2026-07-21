import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { Transaction } from '@/types/transaction/transaction.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchActiveTransaction = async (): Promise<Transaction[]> => {
  const response = await api.get(`/transactions/my/active`);
  return response.data;
};

export const useChargingTransactionPolling = (
  enabled: boolean = true
) => {
  const { showToast } = useToastMessage();
  const { isCharging, updateChargingData, stopCharging } = useChargingTransactionStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['charging-transaction'],
    queryFn: fetchActiveTransaction,
    enabled: enabled && isCharging,
    refetchInterval: 5000,
    staleTime: 0,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (data && data.length > 0 && data[0].status === 'COMPLETED') {
      showToast({
        title: 'Carregamento Encerrado',
        description: 'Sua sessão de carregamento foi encerrada com sucesso.',
        type: 'success',
      });
      stopCharging();
      return;
    }

    if (data && data.length > 0) {
      updateChargingData(data[0]);
    }
  }, [data, updateChargingData]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
