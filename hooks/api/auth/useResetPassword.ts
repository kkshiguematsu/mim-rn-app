import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { storage } from '@/service/storage';
import { useMutation } from '@tanstack/react-query';

const resetPassword = async (password: string) => {
  const token = await storage.getToken();

  const payload = {
    newPassword: password,
    token,
  };
  const response = await api.post('/auth/reset-password', payload);
  return response;
};

export const useResetPassword = () => {
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToast({
        title: 'Sucesso',
        description: 'Senha atualizada com sucesso',
        type: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro',
        description: error.response?.data?.message || 'Ocorreu um erro ao atualizar a senha',
        type: 'error',
      });
    },
  });
};
