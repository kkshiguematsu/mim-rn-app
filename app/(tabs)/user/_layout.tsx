import { HeaderTab } from '@/components/Layout/HeaderTab';
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
          title: 'Minha Conta',
          header: ({ options }) => <HeaderTab title={options.title} />,
          headerTransparent: true,
        }}
      />
      {userMenuList.map((menuItem) => (
        <Stack.Screen
          name={menuItem.name}
          options={{
            title: menuItem.label,
            // header: ({ options }) => <HeaderTab title={options.title} />,
            // headerTransparent: true,
            headerShown: true,

            // Transparência e Blur para o cabeçalho padrão
            headerTransparent: true,
            headerBlurEffect: theme,
            headerTitleStyle: { color: theme === 'light' ? 'text-black' : 'text-white' },
          }}
        />
      ))}
    </Stack>
  );
}
