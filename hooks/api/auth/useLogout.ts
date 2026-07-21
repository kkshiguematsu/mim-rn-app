import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { LoginResponse } from '@/types/auth/login.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDeletePushNotificationToken } from '../notification/useDeletePushNotificationToken';

const logoutUser = async (deletePushToken: () => Promise<void>): Promise<void> => {
  await deletePushToken();
  await api.post<LoginResponse>('/auth/logout');
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useUserStore();
  const { showToast } = useToastMessage();
  const { mutateAsync: deletePushNotificationToken } = useDeletePushNotificationToken();

  return useMutation({
    mutationFn: () => logoutUser(deletePushNotificationToken),
    onSuccess: async () => {
      logout();
      router.replace('/(auth)/login');
    },
    onError: () => {
      showToast({
        title: 'Erro no logout',
        description: 'Erro ao fazer logout.',
        type: 'error',
      });
    },
  });
};
