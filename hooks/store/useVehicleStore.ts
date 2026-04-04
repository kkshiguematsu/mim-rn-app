import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useVehicleStore = () => {
  return useAppStore(
    useShallow((state) => ({
      vehicles: state.vehicles,
      activeVehicle: state.vehicles.find((veh) => veh.id === state.activeVehicleId),
      setActiveVehicle: state.setActiveVehicle,
      addVehicle: state.addVehicle,
      setVehicles: state.setVehicles,
      updateVehicle: state.updateVehicle,
      removeVehicle: state.removeVehicle,
    }))
  );
};
