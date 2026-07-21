import { Tabs } from 'expo-router';
import React from 'react';

import { BottomTabNavigator } from '@/components/layout/BottomTabNavigator';
import { useTheme } from '@/context/themeContext';
import { TabConfig } from '@/types/layout/TabType';
import { BlurView } from 'expo-blur';
import { EvCharger, FileClock, Home, User } from 'lucide-react-native';

const tabs: TabConfig[] = [
  {
    name: 'home',
    options: {
      title: 'Inicio',
      tabBarIcon: Home,
      headerShown: false,
    },
  },
  {
    name: 'charging/index',
    options: {
      title: 'Carregar',
      tabBarIcon: EvCharger,
      headerShown: false,
    },
  },
  {
    name: 'history',
    options: {
      title: 'Histórico',
      tabBarIcon: FileClock,
      headerShown: false,
    },
  },
  {
    name: 'user',
    options: {
      title: 'Perfil',
      tabBarIcon: User,
      headerShown: false,
      lazy: false,
    },
  },
];

export default function TabLayout() {
  const { isDark } = useTheme();

  const titleColor = isDark ? 'white' : 'black';
  return (
    <Tabs
      tabBar={(props) => <BottomTabNavigator {...props} />}
      screenOptions={{
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          paddingTop: 5,
          elevation: 0,
        },
      }}
    >
      {tabs.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            ...item.options,

            headerTitleStyle: {
              color: titleColor,
            },

            headerBackground: () => (
              <BlurView tint={isDark ? 'dark' : 'light'} intensity={50} style={{ flex: 1 }} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
