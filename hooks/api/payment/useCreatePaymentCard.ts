import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';
import { useGetProfile } from '../user/useGetProfile';

export interface PaymentCardFormPayload {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
}

const createPaymentCard = async (data: PaymentCardFormPayload): Promise<ResponseType> => {
  const response = await api.post<ResponseType>('/users/cards', data);
  return response.data;
};

export const useCreatePaymentCard = () => {
  const { showToast } = useToastMessage();
  const { setUserProfile } = useUserStore();
  const { disableModal } = useBottomSheetStore();

  const { refetch: fetchProfile } = useGetProfile({ enabled: false });

  return useMutation({
    mutationFn: async (data: PaymentCardFormPayload) => {
      const response = await createPaymentCard(data);
      return response;
    },
    onSuccess: async () => {
      const { data } = await fetchProfile();

      if (data) {
        setUserProfile(data);
      }

      showToast({
        title: 'Sucesso',
        description: 'Cartão cadastrado',
        type: 'success',
      });

      disableModal();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao cadastrar',
        description: error.message,
        type: 'error',
      });
    },
  });
};
