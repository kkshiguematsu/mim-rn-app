import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { Charger } from '@/types/charger/charger.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchFavoriteChargers = async () => {
  const response = await api.get<Charger[]>('/users/favorites');
  return response.data;
};

export const useGetFavoriteChargers = () => {
  const { showToast } = useToastMessage();
  const { setChargerFavorites } = useChargerStore();

  const query = useQuery({
    queryKey: ['favoriteChargers'],
    queryFn: fetchFavoriteChargers,
  });

  useEffect(() => {
    if (!query.error) return;

    showToast({
      type: 'error',
      title: 'Erro',
      description: 'Não foi possível carregar os carregadores favoritos',
    });
  }, [query.error]);

  useEffect(() => {
    if (!query.data) return;

    setChargerFavorites(query.data.map((charger) => charger._id));
  }, [query.data]);

  return query;
};
