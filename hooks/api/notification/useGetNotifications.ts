import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Notification } from '../../../types/notification/notification.type';

const fetchNotification = async () => {
  const response = await api.get<Notification[]>('/notifications');
  return response.data;
};

export const useGetNotifications = () => {
  const { showToast } = useToastMessage();

  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotification,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 1000 * 60, // 1 minute
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const hasNewNotification = query.data?.some((n) => !n.isRead);

  useEffect(() => {
    if (!query.isError) return;

    showToast({
      type: 'error',
      title: 'Erro ao carregar notificações',
    });
  }, [query.data, query.isError]);

  return { ...query, hasNewNotification };
};
