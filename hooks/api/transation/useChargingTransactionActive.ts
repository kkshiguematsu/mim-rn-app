import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { Transaction } from '@/types/transaction/transaction.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const getActiveTransaction = async () => {
  const response = await api.get<Transaction[]>('/transactions/my/active');
  return response.data;
};

export const useChargingTransactionActive = () => {
  const { showToast } = useToastMessage();
  const { startCharging } = useChargingTransactionStore();

  const query = useQuery({
    queryKey: ['active-charging-transaction'],
    queryFn: getActiveTransaction,
    refetchInterval: 5000,
    retry: 2,
  });

  useEffect(() => {
    if (query.data && query.data.length > 0) {
      startCharging(query.data[0]);

      showToast({
        type: 'success',
        title: 'Carregamento Ativo',
        description: 'Existe um carregamento em andamento.',
      });
    }
  }, [query.data]);

  return query;
};
