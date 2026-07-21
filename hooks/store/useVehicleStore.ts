import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useVehicleStore = () => {
  return useAppStore(
    useShallow((state) => ({
      vehicles: state.vehicles,
      activeVehicle: state.activeVehicle,
      setVehicles: state.setVehicles,
      setActiveVehicle: state.setActiveVehicle,
      updateVehicle: state.updateVehicle,
      removeVehicle: state.removeVehicle,
    }))
  );
};
