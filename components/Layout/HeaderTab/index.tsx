import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HeaderTab = (props: BottomTabNavigationOptions | NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();

  let title = '';
  let showBackButton = false;

  if ('options' in props && 'navigation' in props) {
    title = props.options.title || '';
    showBackButton = props.navigation.canGoBack();
  } else if ('title' in props) {
    title = props.title || '';
  }

  return (
    <BlurView
      intensity={40}
      style={{
        paddingTop: insets.top,
      }}
      className="w-full items-center justify-center p-4"
    >
      <View className="w-full flex-row items-center justify-center p-4">
        {showBackButton && (
          <TouchableOpacity
            onPress={() => 'navigation' in props && props.navigation.goBack()}
            className="absolute left-0 flex flex-row items-center gap-1"
          >
            <Icon as={ChevronLeft} size="xl" />
            <Text size="xl">Voltar</Text>
          </TouchableOpacity>
        )}

        <Heading>{title}</Heading>
      </View>
    </BlurView>
  );
};
