import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const requestStopChargingTransaction = async (transactionId: string): Promise<void> => {
  await api.post(`/transactions/${transactionId}/remote-stop`);
};

export const useStopChargingTransaction = () => {
  const { showToast } = useToastMessage();
  const { stopCharging } = useChargingTransactionStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestStopChargingTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions-history'],
      });

      showToast({
        title: 'Carregamento Encerrado',
        description: 'Sua sessão de carregamento foi encerrada com sucesso.',
        type: 'success',
      });

      stopCharging();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao Encerrar Carregamento',
        description: error.message,
        type: 'error',
      });
    },
  });
};
