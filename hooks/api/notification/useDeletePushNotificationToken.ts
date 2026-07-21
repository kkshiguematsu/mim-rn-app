import { api } from '@/service/api';
import { storage } from '@/service/storage';
import { useMutation } from '@tanstack/react-query';

const deletePushNotificationToken = async (): Promise<void> => {
  const token = await storage.getPushNotificationToken();

  if (!token) return;

  await api.delete(`/users/my/push-token/${token}`);
  await storage.removePushNotificationToken();
};

export const useDeletePushNotificationToken = () => {
  return useMutation({
    mutationFn: deletePushNotificationToken,
    mutationKey: ['deletePushNotificationToken'],
  });
};
