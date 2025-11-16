import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { BottomTabNavigator } from '@/components/Layout/BottomTabNavigator';
import { HeaderTab } from '@/components/Layout/HeaderTab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Home, Map, Settings, User } from 'lucide-react-native';

const tabs = [
  {
    name: 'home/index',
    title: 'Home',
    icon: Home,
  },
  {
    name: 'explore',
    title: 'Explore',
    icon: Settings,
  },
  {
    name: 'map/index',
    title: 'Map',
    icon: Map,
  },
  {
    name: 'user/index',
    title: 'Minha conta',
    icon: User,
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <BottomTabNavigator {...props} />}
      screenOptions={{
        header: ({ options }) => <HeaderTab title={options.title} />,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {tabs.map((item) => (
        <Tabs.Screen
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: item.icon,
          }}
        />
      ))}
    </Tabs>
  );
}
