import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageHeaderProps } from './types';

export const PageHeader = ({
  title,
  leftAction,
  rightAction,
  content,
  applyInsetsTo = 'wrapper',
  hasBackButton = false,
}: PageHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
      return (
        <Pressable onPress={() => router.back()}>
          <View className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow dark:bg-neutral-700">
            <Icon as={ChevronLeft} size="2xl" className="-ml-1" />
          </View>
        </Pressable>
      );
    }

    return null;
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="mb-4 flex-row items-center justify-between px-7"
    >
      <View className="flex flex-row items-center gap-5">
        <View>{renderLeft()}</View>

        <Heading size="3xl" className="text-black dark:text-white">
          {title}
        </Heading>
      </View>

      <View>{rightAction}</View>
    </View>
  );
};
