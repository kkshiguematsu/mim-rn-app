import { ShareVehicleForm } from '@/components/form/vehicle/ShareVehicleForm';
import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ShareVehicleBottomSheet = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4 py-2">
        <Heading className="text-center" size="lg">
          Compartilhar veículo
        </Heading>
        <Text className="text-center">
          Digite o email do usuário que deseja compartilhar o veículo
        </Text>
        <ShareVehicleForm />
      </View>
    </BottomSheetWrapper>
  );
};
