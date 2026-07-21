import { Stack } from 'expo-router';
import { CarFront, CreditCard, Headset, Settings, User } from 'lucide-react-native';
import React from 'react';

export const profileMenuLayout = {
  personalInfo: {
    label: 'Informações pessoais',
    name: '[userId]',
    icon: User,
    link: '/(tabs)/user/[userId]',
  },
  vehicles: {
    label: 'Meus veículos',
    name: 'vehicle',
    icon: CarFront,
    link: '/(tabs)/user/vehicle',
  },
  payments: {
    label: 'Cartões',
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
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: 'Perfil',
          headerShown: false,
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
    </Stack>
  );
}
