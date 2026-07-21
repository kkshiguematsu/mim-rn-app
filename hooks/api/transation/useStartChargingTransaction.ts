import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { StartChargingTransactionPayload } from '@/types/transaction/chargingTransaction.type';
import { useMutation } from '@tanstack/react-query';

export type PaymentMethod = 'credit-card' | 'debit-card' | 'pix' | 'simulate';

interface StartChargingParams {
  data: StartChargingTransactionPayload;
  method: PaymentMethod;
}

const requestStartChargingSession = async ({ data, method }: StartChargingParams) => {
  const response = await api.post(`/transactions/remote-start/${method}`, data);
  return response.data;
};

export const useStartChargingTransaction = () => {
  const { showToast } = useToastMessage();
  const { disableModal } = useBottomSheetStore();
  const { startCharging } = useChargingTransactionStore();

  return useMutation({
    mutationFn: requestStartChargingSession,
    onSuccess: (data) => {
      showToast({
        title: 'Carregamento Iniciado',
        description: 'Sua sessão de carregamento foi iniciada com sucesso.',
        type: 'success',
      });
      startCharging(data);
      disableModal();
    },
    onError: (error: Error) => {
      console.log({ error });
      showToast({
        title: 'Erro ao Iniciar Carregamento',
        description: error.message,
        type: 'error',
      });
    },
  });
};
