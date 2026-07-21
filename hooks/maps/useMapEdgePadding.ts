import {
  MAP_BOTTOMSHEET_CONFIG,
  MapBottomSheetNames,
} from '@/types/bottomsheet/map/mapBottomSheetNames';
import { useMemo } from 'react';
import { Dimensions } from 'react-native';

export const useMapEdgePadding = (mapActiveModal: MapBottomSheetNames | null) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  return useMemo(() => {
    let bottomPadding = 200;

    if (mapActiveModal !== null) {
      const config = MAP_BOTTOMSHEET_CONFIG[mapActiveModal];

      if (config?.dynamic) {
        bottomPadding = SCREEN_HEIGHT * 0.5 + 80;
      } else if (config?.snapPoints && config.snapPoints.length > 0) {
        const maxSnapPoint = config.snapPoints[config.snapPoints.length - 1];
        if (typeof maxSnapPoint === 'string' && maxSnapPoint.includes('%')) {
          const percentage = parseFloat(maxSnapPoint) / 100;
          bottomPadding = SCREEN_HEIGHT * percentage + 80;
        }
      }
    }

    return {
      top: 150,
      right: 50,
      bottom: bottomPadding,
      left: 50,
    };
  }, [mapActiveModal, SCREEN_HEIGHT]);
};
