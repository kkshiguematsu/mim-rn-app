import { config } from '@/constants/config';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import polyline from '@mapbox/polyline';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RouteResult {
  coordinates: Coordinate[];
  distance: number;
  duration: string;
  polylineEncoded: string;
}

const GOOGLE_ROUTES_API_KEY = config.googleApiKey;

async function fetchGoogleRoute(origin: Coordinate, destination: Coordinate): Promise<RouteResult> {
  try {
    const response = await axios.post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: {
          location: {
            latLng: {
              latitude: origin.latitude,
              longitude: origin.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: 'pt-BR',
        units: 'METRIC',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_ROUTES_API_KEY,
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    if (!data.routes || data.routes.length === 0) {
      throw new Error('Nenhuma rota encontrada');
    }

    const routeData = data.routes[0];

    const coordinates: Coordinate[] = polyline
      .decode(routeData.polyline.encodedPolyline)
      .map(([lat, lng]: [number, number]) => ({
        latitude: lat,
        longitude: lng,
      }));

    return {
      coordinates,
      distance: routeData.distanceMeters,
      duration: routeData.duration,
      polylineEncoded: routeData.polyline.encodedPolyline,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: { message?: string } }>;

      if (error.code === 'ECONNABORTED') {
        throw new Error('Tempo limite excedido ao calcular rota');
      }

      if (axiosError.response?.data?.error?.message) {
        throw new Error(axiosError.response.data.error.message);
      }

      if (error.message === 'Network Error') {
        throw new Error('Sem conexão com a internet');
      }

      throw new Error(error.message || 'Erro ao calcular rota');
    }

    throw error;
  }
}

export function useGoogleRouteDirections(
  origin: Coordinate | null,
  destination: Coordinate | null
) {
  const { showToast } = useToastMessage();
  const { setSelectedRoute } = useChargerStore();

  const query = useQuery({
    queryKey: [
      'google-route',
      origin?.latitude,
      origin?.longitude,
      destination?.latitude,
      destination?.longitude,
    ],
    queryFn: () => {
      if (!origin || !destination) {
        throw new Error('Origin e destination são obrigatórios');
      }
      return fetchGoogleRoute(origin, destination);
    },
    enabled: !!origin && !!destination,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (!query.error) return;
    showToast({
      title: 'Erro na busca da rota',
      description: query.error.message,
      type: 'error',
    });
  }, [query.error]);

  useEffect(() => {
    if (!query.data) return;

    setSelectedRoute(query.data);
  }, [query.data]);

  return { ...query };
}
