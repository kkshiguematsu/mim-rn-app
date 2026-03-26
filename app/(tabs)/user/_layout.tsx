import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';
import { CarFront, CreditCard, Headset, Settings, User } from 'lucide-react-native';
import React from 'react';

export const profileMenuLayout = {
  personalInfo: {
    label: 'Informações pessoais',
    name: '[userId]',
    icon: User,
    link: '/user/[userId]',
  },
  vehicles: {
    label: 'Meus veículos',
    name: 'vehicle',
    icon: CarFront,
    link: '/user/vehicle',
  },
  payments: {
    label: 'Pagamento',
    name: 'payments',
    icon: CreditCard,
    link: '/(tabs)/user/payments',
  },
  support: {
    label: 'Suporte',
    name: 'support',
    icon: Headset,
    link: '/(tabs)/user/support',
  },
  settings: {
    label: 'Configurações',
    name: 'settings',
    icon: Settings,
    link: '/user/settings',
  },
} as const;

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
      {Object.values(profileMenuLayout).map((menuItem) => (
        <Stack.Screen
          key={menuItem.name}
          name={menuItem.name}
          options={{
            headerShown: false,
          }}
        />
      ))}
      ;
    </Stack>
  );
}
