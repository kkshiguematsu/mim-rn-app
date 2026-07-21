import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { LoginFormType, LoginResponse } from '@/types/auth/login.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { usePostPushNotificationToken } from '../notification/usePostPushNotificationToken';
import { useGetProfile } from '../user/useGetProfile';

const loginUser = async (data: LoginFormType): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();
  const { showToast } = useToastMessage();
  const { login, logout, setUserProfile } = useUserStore();
  const { mutate: postPushNotificationToken } = usePostPushNotificationToken();
  const { refetch: fetchProfile } = useGetProfile({ enabled: false });

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        await login(data.access_token, data.refresh_token);

        const { data: dataProfile } = await fetchProfile();

        if (!dataProfile) {
          await logout();
          return;
        }

        setUserProfile(dataProfile);

        await postPushNotificationToken();

        router.replace('/(tabs)/home');
      } catch (error) {
        showToast({
          title: 'Erro ao carregar perfil',
          description: error instanceof Error ? error.message : 'Erro desconhecido',
          type: 'error',
        });
        router.replace('/(tabs)/home');
      }
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro no login',
        description: error.message,
        type: 'error',
      });
    },
  });
};
