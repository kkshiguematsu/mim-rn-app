import { Page } from '@/components/layout/page';
import { NotificationCard } from '@/components/shared/cards/NotificationCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useGetNotifications } from '@/hooks/api/notification/useGetNotifications';
import { useReadAllNotifications } from '@/hooks/api/notification/useReadAllNotification';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Notification } from '@/types/notification/notification.type';
import { Check, ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function NotificationsModal({ visible, onClose }: Props) {
  const { data, isLoading, isRefetching, refetch } = useGetNotifications();

  const insets = useSafeAreaInsets();
  const bottomMenuHeight = useBottomMenuHeight();
  const readAllNotifications = useReadAllNotifications();

  const renderItem = ({ item }: { item: Notification }) => (
    <View className="px-7">
      <NotificationCard key={item._id} data={item} />
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View className="py-10">
        <Text className="text-center text-neutral-400">Nenhuma notificação encontrada</Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <Page needsPadding={false} needsBottomTabBar={false}>
        <Page.Header
          title="Notificações"
          leftAction={
            <View>
              <Pressable onPress={onClose} className={'h-5 w-5 items-center justify-center p-5'}>
                <Icon as={ChevronLeft} size="2xl" className={'text-black'} />
              </Pressable>
            </View>
          }
          rightAction={
            <Button size="xs" onPress={() => readAllNotifications.mutate()}>
              <ButtonIcon as={Check} />
              <ButtonText>Ler todas</ButtonText>
            </Button>
          }
        />

        {isLoading ? (
          <View className="py-8">
            <ActivityIndicator className="text-primary-500" size="small" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              gap: 8,
              paddingBottom: bottomMenuHeight + insets.bottom,
            }}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Page>
    </Modal>
  );
}
