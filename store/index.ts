import { create } from 'zustand';
import { createSessionSlice, SessionSlice } from './slices/sessionSlice';
import { createVehicleSlice, VehicleSlice } from './slices/vehicleSlice';

type AppStore = SessionSlice & VehicleSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createSessionSlice(...args),
  ...createVehicleSlice(...args),
}));
