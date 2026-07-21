import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from '../../../types/notification/notification.type';

const markAllNotificationsAsRead = async () => {
  const response = await api.patch<Notification[]>('/notifications/read-all');
  return response.data;
};

export const useReadAllNotifications = () => {
  const { showToast } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications = queryClient.getQueryData<Notification[]>(['notifications']);

      queryClient.setQueryData<Notification[]>(['notifications'], (old) =>
        old?.map((n) => ({ ...n, isRead: true }))
      );

      return { previousNotifications };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }

      showToast({
        type: 'error',
        title: 'Erro ao marcar notificações como lidas',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
