import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Notification } from '@/types/notification/notification.type';
import { formatRelativeTime } from '@/utils/Date.utils';
import { ClockIcon, InfoIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

interface Props {
  data: Notification;
  onPress?: (notification: Notification) => void;
}

export const NotificationCard = ({ data, onPress }: Props) => {
  return (
    <Pressable onPress={() => onPress?.(data)}>
      {({ pressed }) => (
        <Box
          className={`relative flex-row items-start justify-center overflow-hidden rounded-xl border-b border-outline-100 px-4 py-3.5 ${!data.isRead ? 'bg-primary-50' : 'bg-background-0'} ${pressed ? 'opacity-70' : 'opacity-100'} `}
        >
          {!data.isRead && (
            <Box className="absolute bottom-0 left-0 top-0 w-[3px] rounded-r-sm bg-primary-500" />
          )}

          <Box className="items-center justify-center self-stretch pr-3">
            <Box
              className={`h-9 w-9 items-center justify-center rounded-full ${!data.isRead ? 'bg-primary-100' : 'bg-background-100'} `}
            >
              <Icon
                as={InfoIcon}
                size="md"
                className={!data.isRead ? 'text-primary-600' : 'text-typography-400'}
              />
            </Box>
          </Box>

          <VStack className="mr-2 flex-1" space="xs">
            <Text
              numberOfLines={1}
              className={`text-sm ${!data.isRead ? 'font-bold text-typography-900' : 'font-normal text-typography-500'}`}
            >
              {data.tittle}
            </Text>
            <Text numberOfLines={2} className="text-xs leading-[18px] text-typography-500">
              {data.message}
            </Text>
          </VStack>

          {/* Meta: time + unread dot */}
          <VStack className="min-h-[36px] items-end justify-between">
            <HStack className="items-center gap-1">
              <Icon as={ClockIcon} size="xs" className="text-typography-400" />
              <Text className="text-[11px] text-typography-400">
                {formatRelativeTime(data.createdAt)}
              </Text>
            </HStack>
            {!data.isRead && <Box className="mt-1.5 h-2 w-2 rounded-full bg-primary-500" />}
          </VStack>
        </Box>
      )}
    </Pressable>
  );
};
