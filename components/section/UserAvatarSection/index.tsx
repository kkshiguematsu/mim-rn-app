import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useUserStore } from '@/hooks/store/useUserStore';
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

export interface UserAvatarSectionProps {
  showInfos?: boolean;
  backgroundDark?: boolean;
  className?: string;
}

export const UserAvatarSection = ({
  showInfos = true,
  backgroundDark = false,
  className,
}: UserAvatarSectionProps) => {
  const { user } = useUserStore();

  return (
    <View
      className={clsx('flex w-full flex-col items-center justify-center gap-3 py-9', className)}
    >
      <Avatar size={'xl'}>
        <AvatarFallbackText>{user?.name}</AvatarFallbackText>
        <AvatarImage source={{}} />

        {/* <Button
          size="xs"
          className="absolute bottom-0 right-0 rounded-full bg-neutral-200 p-2 dark:bg-zinc-600"
          variant="solid"
        >
          <ButtonIcon className="text-black dark:text-white" as={EditIcon} />
        </Button> */}
      </Avatar>
      {showInfos && (
        <View className="flex items-center justify-center gap-0.5">
          <Heading size="xl" className={backgroundDark ? 'text-white' : ''}>
            {user?.name}
          </Heading>
          <Text className={backgroundDark ? 'text-gray-400' : ''}>{user?.phone}</Text>
        </View>
      )}
    </View>
  );
};
