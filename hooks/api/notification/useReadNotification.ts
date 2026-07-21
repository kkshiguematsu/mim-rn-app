import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from '../../../types/notification/notification.type';

const markNotificationAsRead = async (id: string) => {
  const response = await api.patch<Notification>(`/notifications/${id}/read`);
  return response.data;
};

export const useNotification = () => {
  const { showToast } = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousNotifications = queryClient.getQueryData<Notification[]>(['notifications']);

      queryClient.setQueryData<Notification[]>(['notifications'], (old) =>
        old?.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );

      return { previousNotifications };
    },

    onError: (_error, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }

      showToast({
        type: 'error',
        title: 'Erro ao marcar notificação como lida',
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
