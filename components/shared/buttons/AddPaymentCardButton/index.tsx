import React from 'react';

import { BottomSheetTrigger } from '@/components/ui/bottomsheet';
import { Icon } from '@/components/ui/icon';
import { useModal } from '@/context/modalContext';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { ModalNames } from '@/types/modal/modalsComponents';
import { Plus } from 'lucide-react-native';
import Animated from 'react-native-reanimated';

export const AddPaymentCardButton = () => {
  const { enableModal } = useModal();
  const { animateRotation, animationStyle } = useRotationAnimation(180);

  const openModal = () => {
    animateRotation();
    enableModal(ModalNames.PaymenentCardAddModal);
  };

  return (
    <BottomSheetTrigger onPress={openModal}>
      <Animated.View style={animationStyle} className="">
        <Icon as={Plus} size="2xl" className="ml-1" />
      </Animated.View>
    </BottomSheetTrigger>
  );
};
