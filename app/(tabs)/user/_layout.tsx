import { MenuItemProps } from '@/components/shared/MenuList/MenuItem';
import { AddPaymentCardButton } from '@/components/shared/buttons/AddPaymentCardButton';
import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';
import { CarFront, CreditCard, Headset, Settings, User } from 'lucide-react-native';
import React from 'react';

export const userMenuList: MenuItemProps[] = [
  {
    label: 'Informações pessoais',
    name: '[userId]',
    icon: User,
    link: '/user/[userId]',
  },
  {
    label: 'Meus veículos',
    name: 'vehicle',
    icon: CarFront,
    link: '/user/vehicle',
  },
  {
    label: 'Pagamento',
    name: 'payments',
    icon: CreditCard,
    link: '/(tabs)/user/payments',
    rightButton: <AddPaymentCardButton />,
  },
  {
    label: 'Suporte',
    name: 'support',
    icon: Headset,
    link: '/(tabs)/user/support',
  },
  {
    label: 'Configurações',
    name: 'settings',
    icon: Settings,
    link: '/user/settings',
  },
];

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
            headerRight: () => menuItem.rightButton ?? undefined,
          }}
        />
      ))}
    </Stack>
  );
}
