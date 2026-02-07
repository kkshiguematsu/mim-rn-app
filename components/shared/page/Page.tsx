import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import React from 'react';
import { View } from 'react-native';
import { PageHeader } from './PageHeader';
import { PageScroll } from './PageScroll';
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

export const Page = Object.assign(PageRoot, {
  Scroll: PageScroll,
  Header: PageHeader,
});
