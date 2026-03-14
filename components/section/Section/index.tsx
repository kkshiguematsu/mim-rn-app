import { Text } from '@/components/ui/text';
import React from 'react';

import { View } from 'react-native';
interface Props {
  title: string;
  children: React.ReactNode;
  onPress?: React.ReactNode;
}
export const Section = ({ title, children, onPress }: Props) => {
  return (
    <View className="mt-3 gap-2">
      <View className="flex flex-row items-center justify-between">
        <Text size="sm" className="px-1 font-semibold uppercase tracking-wider text-neutral-400">
          {title}
        </Text>
        {onPress && onPress}
      </View>
      {children}
    </View>
  );
};
