import { Heading } from '@/components/ui/heading';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HeaderTab = (props: BottomTabNavigationOptions) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={40}
      style={{
        paddingTop: insets.top,
      }}
      className="w-full items-center justify-center p-4"
    >
      <Heading>{props.title}</Heading>
    </BlurView>
  );
};
