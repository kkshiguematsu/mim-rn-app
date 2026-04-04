import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';

const forgetPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response;
};

export const useForgetPassword = () => {
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      showToast({
        title: 'Sucesso',
        description: 'Email de recuperação enviado com sucesso',
        type: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro',
        description:
          error.response?.data?.message || 'Ocorreu um erro ao enviar o email de recuperação',
        type: 'error',
      });
    },
  });
};
