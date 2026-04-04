import {
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetContext,
  BottomSheetDragIndicator,
  BottomSheetPortal,
} from '@/components/ui/bottomsheet';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BOTTOMSHEET_COMPONENTS } from '@/types/modal/bottomSheetNames';
import { useContext, useEffect } from 'react';

import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheetRenderer = () => {
  const { activeModal, disableModal } = useBottomSheetStore();
  const insets = useSafeAreaInsets();

  const { handleOpen, handleClose } = useContext(BottomSheetContext);

  const avelableHeight = SCREEN_HEIGHT - insets.top;
  const maxSnap = ((avelableHeight / SCREEN_HEIGHT) * 100).toString() + '%';

  const BottomSheetComponent =
    activeModal !== null ? (BOTTOMSHEET_COMPONENTS[activeModal] as React.ElementType) : null;

  useEffect(() => {
    if (activeModal !== null) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [activeModal]);

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
      onClose={disableModal}
    >
      <BottomSheetContent style={{ paddingBottom: insets.bottom }}>
        {BottomSheetComponent && <BottomSheetComponent />}
      </BottomSheetContent>
    </BottomSheetPortal>
  );
};
