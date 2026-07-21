import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useRequestLocationPermission = () => {
  const [initialLocation, setInitialLocation] = useState<Location.LocationObject | null>(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua localização para mostrar no mapa.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setInitialLocation(location);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter sua localização');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return { initialLocation };
};
