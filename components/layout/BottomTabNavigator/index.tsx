import { useTheme } from '@/context/themeContext';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabButton } from './CustomAnimatedTabButton';

export const BottomTabNavigator = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const prevIndex = useRef(state.index);

  return (
    <View
      className="absolute inset-x-6 bottom-0 flex flex-row justify-evenly overflow-hidden rounded-full bg-primary-500 py-3"
      style={{
        marginBottom: insets.bottom,
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
