import { usePlatform } from '@/hooks/utils/usePlatform';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabButton } from './CustomAnimatedTabButton';

export const BottomTabNavigator = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { isAndroid } = usePlatform();

  return (
    <View
      className="absolute bottom-0 w-72 flex-row justify-evenly self-center overflow-hidden rounded-full bg-primary-800 py-2"
      style={{
        marginBottom: isAndroid ? insets.bottom + 20 : insets.bottom,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButton
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={options.tabBarIcon}
            label={options.title || route.name}
          />
        );
      })}
    </View>
  );
};
