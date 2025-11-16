import React from 'react';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';
interface UserMenuItemProps {
  label: string;
  icon: React.ElementType;
  link: string;
  forceColor?: string;
}
export const UserMenuItem = ({ label, icon, link, forceColor }: UserMenuItemProps) => {
  const goTo = () => {};
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
          className={clsx(['mr-5', forceColor ? `text-${forceColor}-500` : 'text-primary-400'])}
        />
        <ButtonText
          className={clsx(forceColor ? `text-${forceColor}-500` : 'text-black dark:text-white')}
        >
          {label}
        </ButtonText>
      </View>
      <ButtonIcon
        as={ArrowRight}
        size="lg"
        className={clsx(forceColor ? `text-${forceColor}-500` : 'text-primary-400')}
      />
    </Button>
  );
};
