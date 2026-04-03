import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { LoginFormType, LoginResponse } from '@/types/auth/login.type';
import { useMutation } from '@tanstack/react-query';

const loginUser = async (data: LoginFormType): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const useLogin = () => {
  const { showToast } = useToastMessage();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.access_token);
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro no login',
        description: error.message,
        action: 'error',
      });
    },
  });
};
