import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { VehicleCatalog } from '@/types/vehicle/vehicle.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface VehiclesCatalogResponse {
  items: VehicleCatalog[];
  page: number;
  lastPage: number;
  total: number;
}

const fetchVehicleCatalog = async (): Promise<VehiclesCatalogResponse> => {
  const response = await api.get<VehiclesCatalogResponse>('/vehicle-catalogs?limit=100');
  return response.data;
};

export const useGetVehicleCatalog = () => {
  const { showToast } = useToastMessage();

  const query = useQuery({
    queryKey: ['vehicles', 'catalog'],
    queryFn: fetchVehicleCatalog,
    staleTime: 60_000,
    retry: 2,
  });

  useEffect(() => {
    if (!query.isError) return;
    showToast({
      type: 'error',
      description: 'Erro ao carregar catálogo de veículos',
    });
  }, [query.error]);

  return query;
};
