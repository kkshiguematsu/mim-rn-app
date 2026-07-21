import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useSetDefaultPaymentsCard } from '@/hooks/api/payment/useSetDefaultPaymentsCard';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { Star } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PaymentCardSetDefaultBottomSheet = () => {
  const insets = useSafeAreaInsets();

  const { modalData: paymentCardId } = useBottomSheetStore();
  const { mutate, isPending } = useSetDefaultPaymentsCard();

  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4 py-2">
        <Heading className="text-center" size="lg">
          Definir cartão como padrão
        </Heading>
        <Text className="text-center">
          Ao definir este cartão como padrão, ele será utilizado automaticamente em seus próximos
          pagamentos. Você poderá alterar essa configuração a qualquer momento.
        </Text>
        <Button
          className="h-14 rounded-2xl"
          action="primary"
          disabled={isPending}
          onPress={() => mutate(paymentCardId)}
        >
          {isPending && <ButtonSpinner color="white" />}
          <ButtonIcon as={Star} color="white" />
          <ButtonText>Definir cartão como padrão</ButtonText>
        </Button>
      </View>
    </BottomSheetWrapper>
  );
};
