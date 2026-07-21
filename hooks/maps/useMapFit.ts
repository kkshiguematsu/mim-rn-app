import { useEffect } from 'react';
import MapView from 'react-native-maps';

interface MapEdgePadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

export const useMapFit = (
  mapRef: React.RefObject<MapView | null>,
  origin: Coordinate | null,
  destination: Coordinate | null,
  edgePadding: MapEdgePadding,
  activeRouting: boolean
) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (destination && origin && mapRef.current && !activeRouting) {
      timeoutId = setTimeout(() => {
        mapRef.current?.fitToCoordinates([origin, destination], {
          edgePadding,
          animated: true,
        });
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    origin?.latitude,
    origin?.longitude,
    destination?.latitude,
    destination?.longitude,
    edgePadding.top,
    edgePadding.right,
    edgePadding.bottom,
    edgePadding.left,
    activeRouting,
  ]);
};
