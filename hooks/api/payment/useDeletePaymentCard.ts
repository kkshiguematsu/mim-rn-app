import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';
import { useGetProfile } from '../user/useGetProfile';

interface DeletePaymentCardResponse {
  success: boolean;
  message: string;
}

const deletePaymentCard = async (cardId: string): Promise<DeletePaymentCardResponse> => {
  const response = await api.delete<DeletePaymentCardResponse>(`/users/cards/${cardId}`);
  return response.data;
};

export const useDeletePaymentCard = () => {
  const { showToast } = useToastMessage();
  const { disableModal } = useBottomSheetStore();

  const { setUserProfile } = useUserStore();
  const { refetch: fetchProfile } = useGetProfile({ enabled: false });

  return useMutation({
    mutationFn: async (cardId: string) => {
      return await deletePaymentCard(cardId);
    },
    onSuccess: async () => {
      const { data } = await fetchProfile();

      if (data) {
        setUserProfile(data);
      }

      showToast({
        title: 'Sucesso',
        description: 'Cartão removido com sucesso',
        type: 'success',
      });

      disableModal();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao remover',
        description: error.message,
        type: 'error',
      });
    },
  });
};
