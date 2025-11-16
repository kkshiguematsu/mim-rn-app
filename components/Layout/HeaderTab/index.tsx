import { Heading } from '@/components/ui/heading';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HeaderTab = (props: BottomTabNavigationOptions) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex w-full items-center justify-center bg-neutral-100 p-3 dark:bg-zinc-700"
    >
      <Heading>{props.title}</Heading>
    </View>
  );
};
