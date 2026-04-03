import { create } from 'zustand';
import { createSessionSlice, SessionSlice } from './slices/sessionSlice';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createVehicleSlice, VehicleSlice } from './slices/vehicleSlice';

type AppStore = SessionSlice & VehicleSlice & UserSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createSessionSlice(...args),
  ...createVehicleSlice(...args),
  ...createUserSlice(...args),
}));
