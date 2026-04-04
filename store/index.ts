import { create } from 'zustand';
import { BottomSheetSlice, createBottomSheetSlice } from './slices/bottomSheetSlice';
import { createSessionSlice, SessionSlice } from './slices/sessionSlice';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createVehicleSlice, VehicleSlice } from './slices/vehicleSlice';

type AppStore = SessionSlice & VehicleSlice & UserSlice & BottomSheetSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createSessionSlice(...args),
  ...createVehicleSlice(...args),
  ...createUserSlice(...args),
  ...createBottomSheetSlice(...args),
}));
