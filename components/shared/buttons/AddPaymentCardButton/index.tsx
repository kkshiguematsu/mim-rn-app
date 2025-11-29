import { Text } from '@/components/ui/text';
import React, { useContext } from 'react';

import { BottomSheetContext, BottomSheetTrigger } from '@/components/ui/bottomsheet';
import { Icon } from '@/components/ui/icon';
import { useModal } from '@/context/modalContext';
import { ModalNames } from '@/types/modal/modalsComponents';
import { CirclePlus } from 'lucide-react-native';
export const AddPaymentCardButton = () => {
  const { enableModal } = useModal();
  const { handleOpen } = useContext(BottomSheetContext);

  const openModal = () => {
    enableModal(ModalNames.PaymenentModal);
    handleOpen();
  };

  return (
    <BottomSheetTrigger onPress={openModal} className="flex-row items-center">
      <Text>Hello</Text>
      <Icon as={CirclePlus} size="xl" />
    </BottomSheetTrigger>
  );
};
