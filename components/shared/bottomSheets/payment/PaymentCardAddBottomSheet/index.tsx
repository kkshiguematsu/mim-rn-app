import { PaymentForm } from '@/components/form/PaymentForm';
import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { DeleteConfirmationModal } from '@/components/shared/modals/DeleteConfirmationModal';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { useDeletePaymentCard } from '@/hooks/api/payment/useDeletePaymentCard';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { UserPaymentCard } from '@/types/payment/userPaymentCard.type';
import { Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PaymentCardAddBottomSheet = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const insets = useSafeAreaInsets();

  const { modalData, disableModal } = useBottomSheetStore();
  const { mutate: deleteCard, isPending } = useDeletePaymentCard();

  const handleDeleteCard = () => {
    if (!modalData) return;

    deleteCard(modalData._id as UserPaymentCard['_id'], {
      onSuccess: () => {
        setShowDeleteModal(false);
        disableModal();
      },
    });
  };

  return (
    <BottomSheetWrapper>
      <View className="relative flex-1 px-4">
        <Heading className="my-2 text-center" size="lg">
          Adicionar Cartão
        </Heading>
        {modalData && (
          <Pressable
            className="absolute right-4 rounded-full bg-red-200/50 p-2"
            onPress={() => setShowDeleteModal(true)}
            disabled={isPending}
          >
            <Icon as={Trash2} className="text-red-500" />
          </Pressable>
        )}
        <PaymentForm paymentCard={modalData as UserPaymentCard} />

        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCard}
          title="Remover cartão"
          description="Tem certeza que deseja remover este cartão? Esta ação não pode ser desfeita."
          isLoading={isPending}
        />
      </View>
    </BottomSheetWrapper>
  );
};
