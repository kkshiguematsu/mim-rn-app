import { Stack } from 'expo-router';
import React from 'react';

export default function VehicleStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Meus veículos',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="createVehicle"
        options={{
          title: 'Adicionar veículo',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[vehicleId]"
        options={{
          title: 'Detalhes do veículo',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
