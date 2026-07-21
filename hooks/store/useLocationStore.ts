import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useLocationStore = () =>
  useAppStore(
    useShallow((state) => ({
      currentLocation: state.currentLocation,
      locationSubscription: state.locationSubscription,
      startWatching: state.startWatching,
      stopWatching: state.stopWatching,
    }))
  );
