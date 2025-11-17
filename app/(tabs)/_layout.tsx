import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '@/context/themeContext';
import { BlurView } from 'expo-blur';
import { CarFront, EvCharger, FileClock, Map, User } from 'lucide-react-native';

const tabs = [
  {
    name: 'charging/index',
    title: 'Carregamento',
    icon: EvCharger,
  },
  {
    name: 'vehicle/index',
    title: 'Veículos',
    icon: CarFront,
  },
  {
    name: 'map/index',
    title: 'Map',
    icon: Map,
  },
  {
    name: 'history/index',
    title: 'Histórico',
    icon: FileClock,
  },
  {
    name: 'user',
    title: 'Perfil',
    icon: User,
    headerShown: false,
  },
];

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarBackground: () => (
          <BlurView
            tint={theme}
            intensity={60}
            style={{
              flex: 1,
              borderRadius: 30,
              overflow: 'hidden',
            }}
          />
        ),
      }}
    >
      {tabs.map((item) => (
        <Tabs.Screen
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ color, size }) => {
              const IconComponent = item.icon;
              return <IconComponent color={color} size={size} />;
            },
            headerShown: item.headerShown ?? true,
          }}
        />
      ))}
    </Tabs>
  );
}
