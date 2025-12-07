import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

const infos = {
  name: 'Kassiano shiguematsu',
  phone: '+55 45 998602082',
};

export interface UserAvatarInfoProps {
  showInfos?: boolean;
  backgroundDark?: boolean;
  className?: string;
}

export const UserAvatarInfo = ({
  showInfos = true,
  backgroundDark = false,
  className,
}: UserAvatarInfoProps) => {
  return (
    <View
      className={clsx('flex w-full flex-col items-center justify-center gap-3 py-9', className)}
    >
      <Avatar size={'xl'}>
        <AvatarFallbackText>{infos.name}</AvatarFallbackText>
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
            {infos.name}
          </Heading>
          <Text className={backgroundDark ? 'text-gray-400' : ''}>{infos.phone}</Text>
        </View>
      )}
    </View>
  );
};
