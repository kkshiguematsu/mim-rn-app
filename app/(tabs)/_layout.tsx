import { Tabs } from 'expo-router';
import React from 'react';

import { BottomTabNavigator } from '@/components/Layout/BottomTabNavigator';
import { HeaderTab } from '@/components/Layout/HeaderTab';
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
    name: 'user',
    title: 'Perfil',
    icon: User,
    headerShown: false,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabNavigator {...props} />}
      screenOptions={{
        header: ({ options }) => <HeaderTab title={options.title} />,
        headerTransparent: true,
      }}
    >
      {tabs.map((item) => (
        <Tabs.Screen
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: item.icon,
            headerShown: item.headerShown ?? true,
          }}
        />
      ))}
    </Tabs>
  );
}
