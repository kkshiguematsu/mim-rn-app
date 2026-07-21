import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export type NotificationData = {
  screen?: 'session' | 'ticket' | 'charger';
  sessionId?: string;
  ticketId?: string;
  chargerId?: string;
  [key: string]: unknown;
};

type UseNotificationListenerOptions = {
  onForegroundNotification?: (notification: Notifications.Notification) => void;
  onNotificationResponse?: (notification: Notifications.Notification) => void;
};

function resolveDeepLink(data: NotificationData, router: ReturnType<typeof useRouter>) {
  if (!data?.screen) return;

  switch (data.screen) {
    case 'session':
      if (data.sessionId) router.push(`/(app)/session/${data.sessionId}`);
      break;
    case 'ticket':
      if (data.ticketId) router.push(`/(app)/support/${data.ticketId}`);
      break;
    case 'charger':
      if (data.chargerId) router.push(`/(app)/charger/${data.chargerId}`);
      break;
    default:
      break;
  }
}

export function usePushNotification(options: UseNotificationListenerOptions = {}) {
  const router = useRouter();

  const foregroundRef = useRef<Notifications.EventSubscription | null>(null);
  const responseRef = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    foregroundRef.current = Notifications.addNotificationReceivedListener((notification) => {
      options.onForegroundNotification?.(notification);
    });

    responseRef.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const notification = response.notification;
      const data = notification.request.content.data as NotificationData;

      resolveDeepLink(data, router);

      options.onNotificationResponse?.(notification);
    });

    return () => {
      foregroundRef.current?.remove();
      responseRef.current?.remove();
    };
  }, []);
}

export async function handleInitialNotification(router: ReturnType<typeof useRouter>) {
  const response = await Notifications.getLastNotificationResponseAsync();

  if (!response) return;

  const data = response.notification.request.content.data as NotificationData;
  resolveDeepLink(data, router);
}
