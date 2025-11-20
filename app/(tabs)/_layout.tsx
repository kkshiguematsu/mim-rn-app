import { Tabs } from 'expo-router';
import React from 'react';

import { CustomAnimatedTabButton } from '@/components/Layout/BottomTabNavigator/CustomAnimatedTabButton';
import { useTheme } from '@/context/themeContext';
import { BlurView } from 'expo-blur';
import { CarFront, EvCharger, FileClock, Map, User } from 'lucide-react-native';
import { View } from 'react-native';

const tabs = [
  {
    name: 'charging/index',
    title: 'Carregar',
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
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          // backgroundColor: 'red',
          borderTopWidth: 0,
          paddingTop: 5,
          elevation: 0,
        },

        tabBarBackground: () => (
          <View
            // tint={theme}
            // intensity={60}
            className="bg-primary-600"
            style={{
              flex: 1,
              borderTopLeftRadius: 20,
              // backgroundColor: '#033045',
              borderTopRightRadius: 20,
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
            tabBarButton: (props) => <CustomAnimatedTabButton {...props} item={item} />,
            headerShown: item.headerShown ?? true,
            headerTransparent: true,
            headerBackground: () => (
              <BlurView
                tint={theme === 'dark' ? 'dark' : 'light'}
                intensity={50}
                style={{ flex: 1 }}
              />
            ),
            headerTitleStyle: {
              color: theme === 'dark' ? 'white' : 'black',
            },
          }}
        />
      ))}
    </Tabs>
  );
}
