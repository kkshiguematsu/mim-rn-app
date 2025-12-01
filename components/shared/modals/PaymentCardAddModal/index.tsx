import { PaymentCardAddForm } from '@/components/form/PaymentCardAddForm';
import { BottomSheetScrollView } from '@/components/ui/bottomsheet';
import { Heading } from '@/components/ui/heading';

export const PaymentCardAddModal = () => {
  return (
    <BottomSheetScrollView className="flex-1">
      <Heading className="text-center" size="xl">
        Adicionar Cartão
      </Heading>

      <Heading className="py-7" size="lg">
        Preencha os dados
      </Heading>
      <PaymentCardAddForm />
    </BottomSheetScrollView>
  );
};
