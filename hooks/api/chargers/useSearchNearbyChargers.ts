import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useLocationStore } from '@/hooks/store/useLocationStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { Charger } from '@/types/charger/charger.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export interface SearchNearbyChargersParams {
  latitude: number;
  longitude: number;
  radius?: number;
}

const searchNearbyChargers = async (params: SearchNearbyChargersParams) => {
  const response = await api.get<Charger[]>('/chargers/nearby', {
    params: {
      lat: params.latitude,
      lng: params.longitude,
      radius: params.radius,
    },
  });
  return response.data;
};

export const useSearchNearbyChargers = (radius?: number, enabled = true) => {
  const { showToast } = useToastMessage();
  const { setNearbyChargers } = useChargerStore();
  const { currentLocation } = useLocationStore();

  const params = {
    latitude: currentLocation?.coords.latitude || 0,
    longitude: currentLocation?.coords.longitude || 0,
    radius,
  };

  const query = useQuery({
    queryKey: [
      'chargers-nearby',
      currentLocation?.coords.latitude,
      currentLocation?.coords.longitude,
      radius,
    ],
    queryFn: () => searchNearbyChargers(params),
    enabled: !!currentLocation && enabled,
    staleTime: 30 * 1000,
    refetchInterval: 2 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (!query.data) return;

    const nearbyChargers = query.data.slice(0, 3);
    setNearbyChargers(nearbyChargers);
  }, [query.data, setNearbyChargers]);

  useEffect(() => {
    if (query.error) {
      showToast({
        title: 'Erro ao buscar chargers próximos',
        description: query.error instanceof Error ? query.error.message : 'Erro desconhecido',
        type: 'error',
      });
    }
  }, [query.error, showToast]);

  return query;
};
