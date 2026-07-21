import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { User } from '@/types/user/user.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface useGetProfileConfigs {
  enabled?: boolean;
}

const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/users/profile');
  return response.data;
};

export const useGetProfile = (configs: useGetProfileConfigs = {}) => {
  const { enabled } = configs;
  const { showToast } = useToastMessage();
  const { isAuthenticated } = useUserStore();

  const query = useQuery({
    queryKey: ['user-profile'],
    queryFn: getProfile,
    enabled,
  });

  useEffect(() => {
    if (!enabled) return;
    if (!query.error) return;

    showToast({
      type: 'error',
      title: 'Erro ao carregar perfil do usuário!',
    });
  }, [enabled, query.error]);

  return query;
};
