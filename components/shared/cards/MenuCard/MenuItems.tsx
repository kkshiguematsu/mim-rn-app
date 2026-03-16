import { Text } from '@/components/ui/text';
import React from 'react';

import { VStack } from '@/components/ui/vstack';
import { Pressable, View } from 'react-native';
import { TintedIcon } from '../../icon/TintedIcon';
import { ColorIcons, SizeIcons } from '../../icon/TintedIcon/styles';
import { menuItemContainerStyles } from './styles';

export interface MenuItemProps {
  label: string;
  subLabel?: string;
  value?: string | React.ReactNode;
  valueColor?: string;

  size?: 'sm' | 'md' | 'lg';
  sizeIcon?: SizeIcons;
  icon?: {
    name: React.ElementType;
    color: ColorIcons;
  };
  onClick?: () => void;
}

export const MenuItem = ({
  label,
  subLabel,
  value,
  valueColor,
  icon,
  size,
  sizeIcon,
  onClick,
}: MenuItemProps) => {
  const content = (
    // <View className="flex flex-row items-center justify-between gap-3 border-b border-neutral-200 px-4 py-4 dark:border-neutral-700">
    <View className={menuItemContainerStyles({ size })}>
      {icon && <TintedIcon icon={icon.name} color={icon.color} size={sizeIcon} />}
      <VStack className="flex-1">
        <Text size={size} className="font-semibold">
          {label}
        </Text>
        {subLabel && (
          <Text size={size !== 'sm' ? 'sm' : 'xs'} className="-mt-1 line-clamp-1 text-neutral-400">
            {subLabel}
          </Text>
        )}
      </VStack>
      <Text size={size} className={valueColor ? `text-[${valueColor}] ` : 'text-neutral-400'}>
        {value}
      </Text>
    </View>
  );

  if (onClick)
    return (
      <Pressable onPress={onClick} className="bg-transparent">
        {({ pressed }) => (
          <View className={pressed ? 'bg-neutral-200/30' : 'bg-transparent'}>{content}</View>
        )}
      </Pressable>
    );

  return content;
};
