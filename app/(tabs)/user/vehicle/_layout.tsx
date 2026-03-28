import { HeaderBackButtonIcon } from '@/components/shared/buttons/HeaderBackButtonIcon';
import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function VehicleStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Meus veículos',
          headerShown: false,
          headerTransparent: true,
          headerTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        }}
      />

      <Stack.Screen
        name="createVehicle"
        options={{
          title: 'Adicionar veículo',
          headerShown: true,
          headerLeft: () => <HeaderBackButtonIcon />,
        }}
      />

      <Stack.Screen
        name="[vehicleId]"
        options={{
          title: 'Detalhes do veículo',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
