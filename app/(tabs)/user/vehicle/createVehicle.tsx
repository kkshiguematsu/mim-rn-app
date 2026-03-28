import { VehicleForm } from '@/components/form/VehicleForm';
import { Page } from '@/components/layout/page';
import React from 'react';

export default function CreateVehiclePage() {
  return (
    <Page.Keyboard contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 48 }}>
      <VehicleForm />
    </Page.Keyboard>
  );
}
