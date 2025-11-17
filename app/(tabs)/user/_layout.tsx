import { userMenuList } from '@/components/page/user/userMenuList';
import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function UserStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Perfil',
          headerTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        }}
      />
      {userMenuList.map((menuItem) => (
        <Stack.Screen
          name={menuItem.name}
          options={{
            title: menuItem.label,
            headerTitleStyle: {
              color: theme === 'dark' ? 'white' : 'black',
            },
            headerShown: true,
            headerTransparent: true,
            headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
          }}
        />
      ))}
    </Stack>
  );
}
