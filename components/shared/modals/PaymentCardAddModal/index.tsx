import { PaymentCardAddForm } from '@/components/form/PaymentCardAddForm';
import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';

export const PaymentCardAddModal = () => {
  return (
    <View className="flex-1 px-4">
      <Heading className="text-center" size="xl">
        Adicionar Cartão
      </Heading>
      <PaymentCardAddForm />
    </View>
  );
};
