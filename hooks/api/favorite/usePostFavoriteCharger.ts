import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const postFavoriteCharger = async (chargerId: string) => {
  const response = await api.post(`/users/favorites/${chargerId}`);
  return response.data;
};

export const usePostFavoriteCharger = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToastMessage();
  const { toggleFavorite } = useChargerStore();

  return useMutation({
    mutationFn: postFavoriteCharger,
    onSuccess: (_, chargerId: string) => {
      toggleFavorite(chargerId);

      queryClient.invalidateQueries({ queryKey: ['favoriteChargers'] });

      showToast({
        title: 'Sucesso',
        description: 'Carregador adicionado aos favoritos',
        type: 'success',
      });
    },
    onError: () => {
      showToast({
        title: 'Erro',
        description: 'Não foi possível adicionar o carregador aos favoritos',
        type: 'error',
      });
    },
  });
};
