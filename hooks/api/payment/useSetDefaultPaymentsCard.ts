import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';
import { useGetProfile } from '../user/useGetProfile';

const patchPaymentCard = async (cardId: string): Promise<ResponseType> => {
  const response = await api.patch<ResponseType>(`/users/cards/${cardId}/set-default`);
  return response.data;
};

export const useSetDefaultPaymentsCard = () => {
  const { showToast } = useToastMessage();
  const { setUserProfile } = useUserStore();
  const { disableModal } = useBottomSheetStore();

  const { refetch: fetchProfile } = useGetProfile({ enabled: false });

  return useMutation({
    mutationFn: async (data: string) => {
      const response = await patchPaymentCard(data);
      return response;
    },
    onSuccess: async () => {
      const { data } = await fetchProfile();

      if (data) {
        setUserProfile(data);
      }

      showToast({
        title: 'Sucesso',
        description: 'Cartão atualizado com sucesso',
        type: 'success',
      });

      disableModal();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao atualizar',
        description: error.message,
        type: 'error',
      });
    },
  });
};
