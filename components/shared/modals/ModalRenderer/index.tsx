import {
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
} from '@/components/ui/bottomsheet';
import { useModal } from '@/context/modalContext';
import { ModalNames } from '@/types/modal/modalsComponents';

import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PaymentCardAddModal } from '../payment/PaymentCardAddModal';
import { PaymentCardViewModal } from '../payment/PaymentCardViewModal';
import { VehicleViewModal } from '../vehicle/VehicleViewModal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MODAL_COMPONENTS = {
  [ModalNames.PaymenentCardAddModal]: PaymentCardAddModal,
  [ModalNames.PaymentCardViewModal]: PaymentCardViewModal,
  [ModalNames.VehicleViewModal]: VehicleViewModal,
};

export const ModalRenderer = () => {
  const { activeModal } = useModal();
  const insets = useSafeAreaInsets();

  const avelableHeight = SCREEN_HEIGHT - insets.top;
  const maxSnap = ((avelableHeight / SCREEN_HEIGHT) * 100).toString() + '%';

  const ModalComponent =
    activeModal !== null ? (MODAL_COMPONENTS[activeModal] as React.ElementType) : null;

  return (
    <BottomSheetPortal
      // snapPoints={['25%', '50%', '75%', maxSnap]}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={BottomSheetBackdrop}
      handleComponent={BottomSheetDragIndicator}
    >
      <BottomSheetContent style={{ paddingBottom: insets.bottom }}>
        {ModalComponent && <ModalComponent />}
      </BottomSheetContent>
    </BottomSheetPortal>
  );
};
