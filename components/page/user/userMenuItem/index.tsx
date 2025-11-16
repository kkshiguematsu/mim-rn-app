import React from 'react';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import clsx from 'clsx';
import { Href, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
export type UserMenuItemProps = {
  label: string;
  name: string;
  icon: React.ElementType;
  link: Href;
  forceColor?: string;
};
export const UserMenuItem = ({ label, icon, link, forceColor }: UserMenuItemProps) => {
  const router = useRouter();

  const goTo = () => {
    router.navigate(link);
  };

  return (
    <Button
      className="justify-between rounded-none bg-transparent px-5"
      variant="solid"
      size="xl"
      onPress={goTo}
    >
      <View className="flex flex-row items-center">
        <ButtonIcon
          as={icon}
          size="lg"
          className={clsx(['mr-5', forceColor ? forceColor : 'text-primary-400'])}
        />
        <ButtonText className={clsx(forceColor ? forceColor : 'text-black dark:text-white')}>
          {label}
        </ButtonText>
      </View>
      <ButtonIcon
        as={ChevronRight}
        size="lg"
        className={clsx(forceColor ? forceColor : 'text-primary-400')}
      />
    </Button>
  );
};
