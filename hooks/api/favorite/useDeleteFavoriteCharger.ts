import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteFavoriteCharger = async (chargerId: string) => {
  const response = await api.delete(`/users/favorites/${chargerId}`);
  return response.data;
};

export const useDeleteFavoriteCharger = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToastMessage();
  const { toggleFavorite } = useChargerStore();

  return useMutation({
    mutationFn: deleteFavoriteCharger,
    onSuccess: (_, chargerId: string) => {
      toggleFavorite(chargerId);

      queryClient.invalidateQueries({ queryKey: ['favoriteChargers'] });

      showToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Carregador removido dos favoritos!',
      });
    },
  });
};
