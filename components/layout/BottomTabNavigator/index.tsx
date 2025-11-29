import { Icon } from '@/components/ui/icon';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import React, { useRef } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BottomTabNavigator = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const prevIndex = useRef(state.index);

  return (
    // <View
    //   className="flex-row justify-evenly rounded-full bg-gray-100/80 p-1 dark:bg-zinc-600"
    <BlurView
      className="flex-row justify-evenly rounded-full bg-transparent"
      tint="default"
      style={[
        {
          paddingBottom: insets.bottom,
        },
        Platform.OS === 'android' ? shadowStyles.androidShadow : shadowStyles.iosShadow,
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
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
          <TouchableOpacity
            key={route.key}
            activeOpacity={1}
            className={clsx([
              'flex flex-grow items-center justify-center rounded-full p-3',
              isFocused ? 'bg-gray-300/50 dark:bg-gray-500' : '',
            ])}
            accessibilityState={
              isFocused
                ? {
                    selected: true,
                  }
                : {}
            }
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              className={clsx(['', isFocused ? 'text-primary-400 dark:text-primary-600' : ''])}
              as={options.tabBarIcon}
              size={'xl'}
            />
            {/* <Text className={isFocused ? 'text-primary-400 dark:text-primary-600' : ''}>
              {label as string}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

const shadowStyles = StyleSheet.create({
  androidShadow: {
    elevation: 16,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
