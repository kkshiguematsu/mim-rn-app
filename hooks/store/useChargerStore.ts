import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useChargerStore = () => {
  return useAppStore(
    useShallow((state) => ({
      selectedCharger: state.selectedCharger,
      selectedRoute: state.selectedRoute,
      nearbyChargers: state.nearbyChargers,
      chargerFavorites: state.chargerFavorites,

      setSelectedCharger: state.setSelectedCharger,
      setSelectedRoute: state.setSelectedRoute,
      setNearbyChargers: state.setNearbyChargers,
      clearSelectedCharger: state.clearSelectedCharger,

      toggleFavorite: state.toggleFavorite,
      setChargerFavorites: state.setChargerFavorites,
    }))
  );
};
