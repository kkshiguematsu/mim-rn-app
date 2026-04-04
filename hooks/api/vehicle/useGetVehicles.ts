import { useVehicleStore } from '@/hooks/store/useVehicleStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const getVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const useGetVehicles = () => {
  const { showToast } = useToastMessage();
  const { setVehicles } = useVehicleStore();

  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  useEffect(() => {
    if (query.error) {
      showToast({
        title: 'Erro',
        description: query.error.message,
        type: 'error',
      });
    }
  }, [query.error]);

  useEffect(() => {
    if (query.data?.items?.length) {
      setVehicles(query.data.items);
    }
  }, [query.data]);

  return query;
};
