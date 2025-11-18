// components/CustomAnimatedTabButton.tsx
import { Icon } from '@/components/ui/icon';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { usePathname } from 'expo-router';
import { LucideIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export interface ItemBottomTabBar {
  name: string;
  title: string;
  icon: LucideIcon;
  headerShown?: boolean;
}

export interface CustomBottomTabBarButtonProps extends BottomTabBarButtonProps {
  item: ItemBottomTabBar;
}

export function CustomAnimatedTabButton({ item, ...props }: CustomBottomTabBarButtonProps) {
  const pathname = usePathname();

  const currentRouteName = pathname.split('/')[1];
  const focused = item.name.split('/')[0] === currentRouteName;

  const scale = useSharedValue(focused ? 1.2 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
  }, [focused]);

  return (
    <Pressable onPress={props.onPress} style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View style={{ transform: [{ scale }] }} className="pt-3">
        <Icon as={item.icon} size="xl" className={focused ? 'text-blue-600' : ''} />

        {/* <Animated.Text
            style={{
              fontSize: 11,
              color: focused ? '#fff' : '#999',
            }}
          >
            {item.title}
          </Animated.Text> */}
      </Animated.View>
    </Pressable>
  );
}
