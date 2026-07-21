import { haversineDistance } from '@/utils/Map.utils';
import { useEffect, useState } from 'react';
import { useChargerStore } from '../store/useChargerStore';
import { useLocationStore } from '../store/useLocationStore';

const ARRIVAL_THRESHOLD_METERS = 50;

export const useArrivalDetection = () => {
  const { selectedCharger } = useChargerStore();
  const { currentLocation } = useLocationStore();

  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    if (!selectedCharger?.address || !currentLocation) return;

    const distance =
      haversineDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        selectedCharger.address.location.coordinates[1],
        selectedCharger.address.location.coordinates[0]
      ) * 1000; // converte pra metros

    if (distance <= ARRIVAL_THRESHOLD_METERS) {
      setHasArrived(true);
    }
  }, [currentLocation]);

  return { hasArrived };
};
