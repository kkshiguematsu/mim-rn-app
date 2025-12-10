import React, { useContext } from 'react';

import { BottomSheetContext, BottomSheetTrigger } from '@/components/ui/bottomsheet';
import { Icon } from '@/components/ui/icon';
import { useModal } from '@/context/modalContext';
import { useRotation } from '@/hooks/animations/useRotation';
import { ModalNames } from '@/types/modal/modalsComponents';
import { Plus } from 'lucide-react-native';
import Animated from 'react-native-reanimated';

export const AddPaymentCardButton = () => {
  const { enableModal } = useModal();
  const { handleOpen } = useContext(BottomSheetContext);
  const { animateRotation, animationStyle } = useRotation();

  const openModal = () => {
    animateRotation();
    enableModal(ModalNames.PaymenentModal);
    handleOpen();
  };

  return (
    <BottomSheetTrigger onPress={openModal}>
      <Animated.View style={animationStyle} className="">
        <Icon as={Plus} size="2xl" className="ml-1" />
      </Animated.View>
    </BottomSheetTrigger>
  );
};
