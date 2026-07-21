import { UserVehicle, Vehicle } from '@/types/vehicle/vehicle.type';
import { StateCreator } from 'zustand';
import { UserSlice } from './userSlice';

export interface VehicleSlice {
  vehicles: UserVehicle[];
  activeVehicle: UserVehicle | null;

  setVehicles: (vehicles: UserVehicle[]) => void;
  setActiveVehicle: (id: string) => void;
  updateVehicle: (id: string, data: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
}

export const createVehicleSlice: StateCreator<VehicleSlice & UserSlice, [], [], VehicleSlice> = (
  set,
  get
) => ({
  vehicles: [],
  activeVehicle: null,

  setVehicles: (vehicles: UserVehicle[]) => {
    const activeVehicle = vehicles.find((v) => v.vehicle.isActive === true);

    set({ vehicles, activeVehicle });
  },

  setActiveVehicle: (id: string) => {
    const activeVehicle = get().vehicles.find((v) => v.vehicle._id === id);

    set({ activeVehicle });
  },

  updateVehicle: (id: string, data: Partial<Vehicle>) => {
    const updatedVehicles = get().vehicles.map((v) =>
      v.vehicle._id === id ? { ...v, vehicle: { ...v.vehicle, ...data } } : v
    );

    set({
      vehicles: updatedVehicles,
    });
  },

  removeVehicle: (id: string) => {
    const remaining = get().vehicles.filter((v) => v.vehicle._id !== id);

    set({
      vehicles: remaining,
      activeVehicle: get().activeVehicle?.vehicle._id === id ? null : get().activeVehicle,
    });
  },
});
