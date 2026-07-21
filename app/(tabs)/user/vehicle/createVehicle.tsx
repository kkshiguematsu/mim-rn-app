import { VehicleForm } from '@/components/form/vehicle/VehicleForm';
import { Page } from '@/components/layout/page';
import React from 'react';
import { View } from 'react-native';

export default function CreateVehiclePage() {
  return (
    <Page.Keyboard hasHeader={false} needsPadding={false}>
      <Page.Header title="Cadastro de veículo" hasBackButton />
      <View className="px-7">
        <VehicleForm />
      </View>
    </Page.Keyboard>
  );
}
