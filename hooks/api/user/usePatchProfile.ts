import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  phone?: string;
  taxId?: string;
};

const patchProfile = async (payload: UpdateProfilePayload): Promise<void> => {
  const response = await api.patch('/users/profile', payload);
  return response.data;
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: patchProfile,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['user-profile'] });
      showToast({
        type: 'success',
        title: 'Perfil atualizado com sucesso!',
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        title: 'Erro ao atualizar perfil!',
      });
    },
  });
};
