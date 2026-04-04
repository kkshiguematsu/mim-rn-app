import { VehicleType } from '@/types/vehicle/vehicle.type';
import { StateCreator } from 'zustand';

export interface VehicleSlice {
  vehicles: VehicleType[];
  activeVehicleId: string;

  readonly activeVehicle?: VehicleType;

  setActiveVehicle: (id: string) => void;
  addVehicle: (data: Omit<VehicleType, 'id'>) => void;
  setVehicles: (vehicles: VehicleType[]) => void;
  updateVehicle: (id: string, data: Partial<VehicleType>) => void;
  removeVehicle: (id: string) => void;
}

export const createVehicleSlice: StateCreator<VehicleSlice, [], [], VehicleSlice> = (set, get) => ({
  vehicles: [],
  activeVehicleId: 'v1',

  setActiveVehicle: (id) => set({ activeVehicleId: id }),

  addVehicle: (data) => {
    const newVehicle: VehicleType = {
      ...data,
      id: `v${Date.now()}`,
      batteryPct: 0,
      lastSessionDate: '—',
      lastSessionKwh: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      vehicles: [...state.vehicles, newVehicle],
    }));
  },

  setVehicles: (vehicles) => set({ vehicles }),

  updateVehicle: (id, data) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...data } : v)),
    })),

  removeVehicle: (id) =>
    set((state) => {
      const remaining = state.vehicles.filter((v) => v.id !== id);

      return {
        vehicles: remaining,
        activeVehicleId:
          state.activeVehicleId === id ? (remaining[0]?.id ?? '') : state.activeVehicleId,
      };
    }),
});
