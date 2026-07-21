import { useVehicleStore } from '@/hooks/store/useVehicleStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { UserVehicle } from '@/types/vehicle/vehicle.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchMyVehicles = async (): Promise<UserVehicle[]> => {
  const response = await api.get<UserVehicle[]>('/vehicles/my');
  return response.data;
};

export const useGetVehicle = (enabled: boolean = true) => {
  const { showToast } = useToastMessage();
  const { setVehicles } = useVehicleStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['vehicles', 'my'],
    queryFn: fetchMyVehicles,
    enabled,
    staleTime: 60_000,
    retry: 2,
  });

  useEffect(() => {
    setVehicles(data || []);
  }, [data, setVehicles]);

  useEffect(() => {
    if (!isError) return;

    setVehicles([]);

    showToast({
      type: 'error',
      title: 'Erro ao carregar veículos',
    });
  }, [isError, showToast]);

  return {
    vehicles: data,
    isLoading,
    isError,
    error,
  };
};

export default useGetVehicle;
