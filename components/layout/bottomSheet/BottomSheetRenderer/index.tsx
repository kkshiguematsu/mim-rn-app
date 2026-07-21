import {
  BottomSheetBackdrop,
  BottomSheetContext,
  BottomSheetDragIndicator,
  BottomSheetPortal,
} from '@/components/ui/bottomsheet';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BOTTOMSHEET_COMPONENTS, BOTTOMSHEET_CONFIG } from '@/types/bottomsheet/bottomSheetNames';
import { useContext, useEffect } from 'react';

import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheetRenderer = () => {
  const { activeModal, disableModal } = useBottomSheetStore();
  const insets = useSafeAreaInsets();

  const { bottomSheetRef } = useContext(BottomSheetContext);

  useEffect(() => {
    if (activeModal !== null) {
      setTimeout(() => {
        bottomSheetRef?.current?.snapToIndex(0);
      }, 100);
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [activeModal]);

  if (activeModal === null) {
    return;
  }

  const avelableHeight = SCREEN_HEIGHT - insets.top;
  const maxSnap = ((avelableHeight / SCREEN_HEIGHT) * 100).toString() + '%';

  const BottomSheetComponent = BOTTOMSHEET_COMPONENTS[activeModal] as React.ElementType;
  const bottomSheetConfig = BOTTOMSHEET_CONFIG[activeModal];
  const hasSnapPoints = !!bottomSheetConfig?.snapPoints.length;

  return (
    <BottomSheetPortal
      snapPoints={hasSnapPoints ? [...bottomSheetConfig?.snapPoints, maxSnap] : []}
      enableDynamicSizing={!hasSnapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backdropComponent={BottomSheetBackdrop}
      handleComponent={BottomSheetDragIndicator}
      onClose={disableModal}
      backgroundStyle={{
        backgroundColor: 'white',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          android: {
            elevation: 12,
          },
        }),
      }}
    >
      {BottomSheetComponent && <BottomSheetComponent />}
    </BottomSheetPortal>
  );
};
