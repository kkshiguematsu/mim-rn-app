import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const getVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const useQueryWithError = () => {
  const { showToast } = useToastMessage();

  const query = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  useEffect(() => {
    if (query.error) {
      showToast({
        title: 'Erro',
        description: query.error.message,
        action: 'error',
      });
    }
  }, [query.error]);

  return query;
};
