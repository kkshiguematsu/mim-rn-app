import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import React from 'react';
import { View } from 'react-native';
import { pageStyled } from './styles';
import { PageRootProps } from './types';

export const PageRoot = ({ children, className, background = 'normal' }: PageRootProps) => {
  const bottomTabBarHeight = useBottomMenuHeight();
  return (
    <View
      style={{ paddingBottom: bottomTabBarHeight + 30 }}
      className={pageStyled({ background, class: className })}
    >
      {children}
    </View>
  );
};
