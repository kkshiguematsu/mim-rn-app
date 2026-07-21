import { HeaderBackButtonIcon } from '@/components/shared/buttons/HeaderBackButtonIcon';
import { Heading } from '@/components/ui/heading';
import { usePlatform } from '@/hooks/utils/usePlatform';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeaderProps } from './types';

export const PageHeader = ({
  title,
  classNameTitle,
  classNameBackButton,
  leftAction,
  rightAction,
  content,
  applyInsetsTo = 'wrapper',
  hasBackButton = false,
  hasCloseButton = false,
}: PageHeaderProps) => {
  const insets = useSafeAreaInsets();

  const { isAndroid } = usePlatform();

  if (content) {
    if (applyInsetsTo === 'content') {
      return React.cloneElement(content, {
        style: [content.props.style, { paddingTop: insets.top }],
      });
    }

    return <View style={{ paddingTop: insets.top }}>{content}</View>;
  }

  const renderLeft = () => {
    if (leftAction) return leftAction;

    if (hasBackButton) {
      return <HeaderBackButtonIcon className={classNameBackButton} />;
    }

    return null;
  };

  let paddingTop = applyInsetsTo !== 'none' ? insets.top : 0;
  paddingTop += isAndroid ? 20 : 0;

  return (
    <View style={{ paddingTop }} className="mb-4 flex-row items-center justify-between px-7">
      <View className="flex flex-row items-center gap-5">
        {renderLeft()}

        <Heading size="2xl" className={classNameTitle ?? 'text-black dark:text-white'}>
          {title}
        </Heading>
      </View>

      {rightAction && <View>{rightAction}</View>}
    </View>
  );
};
