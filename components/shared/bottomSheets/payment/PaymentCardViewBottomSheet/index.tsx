import { PaymentCardForm } from '@/components/form/PaymentCardForm';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { PaymentCardType } from '@/types/payment/paymentCard.type';
import { Edit } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export const PaymentCardViewBottomSheet = () => {
  const [isDisableForm, setIsDisableForm] = useState(true);

  const { modalData } = useBottomSheetStore();
  const data: PaymentCardType = modalData;

  const toogleEditPaymentCard = () => {
    setIsDisableForm((old) => !old);
  };

  return (
    <View className="flex-1 px-4">
      <View className="flex flex-row justify-between">
        <View></View>
        <Heading className="text-center" size="xl">
          Cartão
        </Heading>
        <Pressable className="ml-1" onPress={toogleEditPaymentCard}>
          <Icon as={Edit} size="2xl" />
        </Pressable>
      </View>

      <PaymentCardForm paymentCard={data} isDisableForm={isDisableForm} />
    </View>
  );
};
