import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageStyled } from './styles';
import { PageRootProps } from './types';

export const PageRoot = ({
  children,
  className,
  background = 'normal',
  needsSafeArea,
  needsBottomTabBar = true,
}: PageRootProps) => {
  const insets = useSafeAreaInsets();

  let bottomTabBarHeight = needsBottomTabBar ? useBottomMenuHeight() : 0;
  bottomTabBarHeight += needsSafeArea ? insets.bottom : 0;

  return (
    <View
      style={{ paddingBottom: bottomTabBarHeight }}
      className={pageStyled({ background, class: className })}
    >
      {children}
    </View>
  );
};
