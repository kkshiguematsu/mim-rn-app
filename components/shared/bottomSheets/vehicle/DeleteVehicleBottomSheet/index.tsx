import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useDeleteVehicle } from '@/hooks/api/vehicle/useDeleteVehicle';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DeleteVehicleBottomSheet = () => {
  const insets = useSafeAreaInsets();

  const { modalData } = useBottomSheetStore();
  const { mutate, isPending } = useDeleteVehicle();

  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4 py-2">
        <Heading className="text-center" size="lg">
          Excluir veículo
        </Heading>
        <Text className="text-center">Tem certeza que deseja excluir este veículo?</Text>
        <Button
          className="h-14 rounded-2xl"
          action="negative"
          disabled={isPending}
          onPress={() => mutate(modalData)}
        >
          {isPending && <ButtonSpinner color="white" />}
          <ButtonIcon as={Trash2} color="white" />
          <ButtonText>Deletar</ButtonText>
        </Button>
      </View>
    </BottomSheetWrapper>
  );
};
