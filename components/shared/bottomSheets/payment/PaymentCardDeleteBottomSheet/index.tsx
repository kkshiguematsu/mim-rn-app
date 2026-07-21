import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useDeletePaymentCard } from '@/hooks/api/payment/useDeletePaymentCard';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PaymentCardDeleteBottomSheet = () => {
  const insets = useSafeAreaInsets();

  const { modalData: paymentCardId } = useBottomSheetStore();
  const { mutate, isPending } = useDeletePaymentCard();

  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4 py-2" style={{ paddingBottom: insets.bottom }}>
        <Heading className="text-center" size="lg">
          Excluir Cartão
        </Heading>
        <Text className="text-center">Tem certeza que deseja excluir este cartão?</Text>
        <Button
          className="h-14 rounded-2xl"
          action="negative"
          disabled={isPending}
          onPress={() => mutate(paymentCardId)}
        >
          {isPending && <ButtonSpinner color="white" />}
          <ButtonIcon as={Trash2} color="white" />
          <ButtonText>Deletar</ButtonText>
        </Button>
      </View>
    </BottomSheetWrapper>
  );
};
