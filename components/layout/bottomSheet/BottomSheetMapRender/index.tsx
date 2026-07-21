import {
  BottomSheetContent,
  BottomSheetContext,
  BottomSheetDragIndicator,
  BottomSheetPortal,
} from '@/components/ui/bottomsheet';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { usePlatform } from '@/hooks/utils/usePlatform';
import { MAP_BOTTOMSHEET_COMPONENTS } from '@/types/bottomsheet/map/mapBottomSheetComponents';
import { MAP_BOTTOMSHEET_CONFIG } from '@/types/bottomsheet/map/mapBottomSheetNames';
import { useContext, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MapBottomSheetRenderer = () => {
  const insets = useSafeAreaInsets();

  const { mapActiveModal, disableMapModal } = useMapBottomSheetStore();
  const { bottomSheetRef } = useContext(BottomSheetContext);
  const { isAndroid } = usePlatform();

  useEffect(() => {
    if (mapActiveModal !== null) {
      setTimeout(() => {
        bottomSheetRef?.current?.snapToIndex(hasSnapPoints ? 2 : 0);
      }, 500);
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [mapActiveModal]);

  if (mapActiveModal === null) {
    return null;
  }

  const maxPercentegeHeight = isAndroid ? 98 : 100;
  const avelableHeight = SCREEN_HEIGHT - insets.top;
  const maxSnap = ((avelableHeight / SCREEN_HEIGHT) * maxPercentegeHeight).toString() + '%';

  const BottomSheetComponent = MAP_BOTTOMSHEET_COMPONENTS[mapActiveModal] as React.ElementType;
  const bottomSheetConfig = MAP_BOTTOMSHEET_CONFIG[mapActiveModal];
  const hasSnapPoints = !!bottomSheetConfig?.snapPoints.length;

  return (
    <BottomSheetPortal
      snapPoints={hasSnapPoints ? [...bottomSheetConfig?.snapPoints, maxSnap] : []}
      enableDynamicSizing={bottomSheetConfig?.dynamic}
      enablePanDownToClose={false}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      enableBlurKeyboardOnGesture={true}
      handleComponent={BottomSheetDragIndicator}
      onClose={disableMapModal}
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
      <BottomSheetContent style={{ paddingBottom: insets.bottom }}>
        {BottomSheetComponent && <BottomSheetComponent />}
      </BottomSheetContent>
    </BottomSheetPortal>
  );
};
