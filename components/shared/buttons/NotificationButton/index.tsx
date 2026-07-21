import { Icon } from '@/components/ui/icon';
import { useGetNotifications } from '@/hooks/api/notification/useGetNotifications';
import { BellRing } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import NotificationsModal from '../../modals/NotificationsModal';

export const NotificationButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { hasNewNotification } = useGetNotifications();

  const onOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View>
      <Pressable className="relative rounded-xl bg-white p-4" onPress={onOpenModal}>
        {hasNewNotification && (
          <View className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-600" />
        )}

        <Icon as={BellRing} />
      </Pressable>

      <NotificationsModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </View>
  );
};
