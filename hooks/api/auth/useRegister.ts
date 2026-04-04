import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { RegisterFormType } from '@/types/auth/register.type';
import { useMutation } from '@tanstack/react-query';

const registerUser = async (data: RegisterFormType): Promise<ResponseType> => {
  const response = await api.post<ResponseType>('/auth/register', data);
  return response.data;
};

export const useRegister = () => {
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {},
    onError: (error: Error) => {
      showToast({
        title: 'Erro no cadastro',
        description: error.message,
        type: 'error',
      });
    },
  });
};
