import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import React from 'react';

import { View } from 'react-native';
interface Props {
  title: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: React.ReactNode;
  className?: string;
}
export const Section = ({ title, children, rightContent, onPress, className }: Props) => {
  return (
    <View className={clsx('mt-3 gap-2', className)}>
      <View className="flex flex-row items-center justify-between">
        <Text size="sm" className="px-1 font-semibold uppercase tracking-wider text-neutral-400">
          {title}
        </Text>
        {rightContent && rightContent}
        {onPress && onPress}
      </View>
      {children}
    </View>
  );
};
