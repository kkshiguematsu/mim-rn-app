import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

const infos = {
  name: 'Kassiano shiguematsu',
  phone: '+55 45 998602082',
};

export interface UserAvatarInfoProps {
  showInfos?: boolean;
}

export const UserAvatarInfo = ({ showInfos = true }: UserAvatarInfoProps) => {
  return (
    <View className="flex w-full flex-col items-center justify-center gap-3 py-9">
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
          <Heading>{infos.name}</Heading>
          <Text>{infos.phone}</Text>
        </View>
      )}
    </View>
  );
};
