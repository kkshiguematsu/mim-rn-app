import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeaderProps } from './types';

export const PageHeader = ({ content, applyInsetsTo }: PageHeaderProps) => {
  const insets = useSafeAreaInsets();

  if (applyInsetsTo === 'content') {
    return React.cloneElement(content, {
      style: [content.props.style, { paddingTop: insets.top }],
    });
  }

  return <View style={{ paddingTop: insets.top }}>{content}</View>;
};
