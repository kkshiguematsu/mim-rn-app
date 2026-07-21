import { registerForPushNotificationsAsync } from '@/hooks/notification/registerForPushNotificationsAsync';
import { api } from '@/service/api';
import { storage } from '@/service/storage';
import { useMutation } from '@tanstack/react-query';

const postPushNotificationToken = async (): Promise<void> => {
  const token = await registerForPushNotificationsAsync();

  if (!token) return;

  await storage.setPushNotificationToken(token);
  await api.post('/users/my/push-token', { token });
};

export const usePostPushNotificationToken = () => {
  return useMutation({
    mutationFn: postPushNotificationToken,
    mutationKey: ['postPushNotificationToken'],
  });
};
