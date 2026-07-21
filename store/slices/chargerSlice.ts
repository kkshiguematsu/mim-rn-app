import { RouteResult } from '@/hooks/api/map/useGoogleRouteDirections';
import { Charger } from '@/types/charger/charger.type';
import { StateCreator } from 'zustand';

export interface ChargerSlice {
  selectedCharger: Charger | null;
  selectedRoute: RouteResult | null;

  chargerFavorites: string[];
  nearbyChargers: Charger[] | null;

  setSelectedCharger: (charger: Charger | null) => void;
  setSelectedRoute: (route: RouteResult | null) => void;

  setNearbyChargers: (chargers: Charger[] | null) => void;
  clearSelectedCharger: () => void;

  setChargerFavorites: (chargerIds: string[]) => void;
  toggleFavorite: (chargerId: string) => void;
}

export const createChargerSlice: StateCreator<ChargerSlice, [], [], ChargerSlice> = (set, get) => ({
  selectedCharger: null,
  selectedRoute: null,
  chargerFavorites: [],
  nearbyChargers: null,

  setSelectedCharger: (charger) => set({ selectedCharger: charger }),

  setSelectedRoute: (route) => set({ selectedRoute: route }),

  clearSelectedCharger: () => set({ selectedCharger: null }),

  setNearbyChargers: (chargers) => set({ nearbyChargers: chargers }),

  setChargerFavorites: (ids: string[]) => set({ chargerFavorites: ids }),

  toggleFavorite: (chargerId) =>
    set((state) => {
      const isFav = state.chargerFavorites.includes(chargerId);
      return {
        chargerFavorites: isFav
          ? state.chargerFavorites.filter((id) => id !== chargerId)
          : [...state.chargerFavorites, chargerId],
      };
    }),
});
