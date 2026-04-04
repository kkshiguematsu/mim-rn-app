import { PaymentCardForm } from '@/components/form/PaymentCardForm';
import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';

export const PaymentCardAddBottomSheet = () => {
  return (
    <View className="flex-1 px-4">
      <Heading className="text-center" size="xl">
        Adicionar Cartão
      </Heading>
      <PaymentCardForm />
    </View>
  );
};
