import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeaderProps } from './types';

export const PageHeader = ({ title, content, className }: PageHeaderProps) => {
  const insets = useSafeAreaInsets();
  const Children = content.type;

  return <Children />;
};
