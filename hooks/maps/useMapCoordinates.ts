import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useLocationStore } from '../store/useLocationStore';

export const useMapCoordinates = () => {
  const { currentLocation } = useLocationStore();
  const { selectedCharger } = useChargerStore();
  const { lat, lng } = useLocalSearchParams<{ lat: string; lng: string }>();

  const origin = useMemo(() => {
    return currentLocation
      ? {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        }
      : null;
  }, [currentLocation]);

  const destination = useMemo(() => {
    return selectedCharger && selectedCharger.address
      ? {
          latitude: selectedCharger.address.location.coordinates[1],
          longitude: selectedCharger.address.location.coordinates[0],
        }
      : lat && lng
        ? {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          }
        : null;
  }, [selectedCharger, lat, lng]);

  const initialRegion = useMemo(() => {
    return currentLocation
      ? {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : undefined;
  }, [currentLocation]);

  return { origin, destination, initialRegion, selectedCharger };
};
