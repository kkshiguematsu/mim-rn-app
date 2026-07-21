import * as Location from 'expo-location';
import { StateCreator } from 'zustand';

export interface LocationSlice {
  currentLocation: Location.LocationObject | null;
  locationSubscription: Location.LocationSubscription | null;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
}

export const createLocationSlice: StateCreator<LocationSlice> = (set, get) => ({
  currentLocation: null,
  locationSubscription: null,

  startWatching: async () => {
    if (get().locationSubscription) return;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({});
    set({ currentLocation: location });

    const locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5 * 1000,
        distanceInterval: 10,
      },
      (newLocation) => set({ currentLocation: newLocation })
    );

    set({ locationSubscription });
  },

  stopWatching: () => {
    get().locationSubscription?.remove();
    set({ locationSubscription: null });
  },
});
