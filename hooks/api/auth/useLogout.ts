import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { LoginResponse } from '@/types/auth/login.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const logoutUser = async (): Promise<void> => {
  await api.post<LoginResponse>('/auth/logout');
};

export const useLogout = () => {
  const { showToast } = useToastMessage();
  const { logout } = useUserStore();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      router.replace('/(auth)/login');
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro no logout',
        description: error.message,
        type: 'error',
      });
    },
  });
};
