import { create } from 'zustand';
import { BottomSheetSlice, createBottomSheetSlice } from './slices/bottomSheetSlice';
import { ChargerSlice, createChargerSlice } from './slices/chargerSlice';
import { ChargingSlice, createChargingSlice } from './slices/chargingSlice';
import { createLocationSlice, LocationSlice } from './slices/locationSlice';
import { createMapBottomSheetSlice, MapBottomSheetSlice } from './slices/mapBottomSheetSlice';
import { createSessionSlice, SessionSlice } from './slices/sessionSlice';
import { createTicketSlice, TicketSlice } from './slices/ticketSlice';
import { createUserSlice, UserSlice } from './slices/userSlice';
import { createVehicleSlice, VehicleSlice } from './slices/vehicleSlice';

type AppStore = SessionSlice &
  VehicleSlice &
  UserSlice &
  BottomSheetSlice &
  MapBottomSheetSlice &
  ChargerSlice &
  ChargingSlice &
  LocationSlice &
  TicketSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createSessionSlice(...args),
  ...createVehicleSlice(...args),
  ...createUserSlice(...args),
  ...createBottomSheetSlice(...args),
  ...createMapBottomSheetSlice(...args),
  ...createChargerSlice(...args),
  ...createChargingSlice(...args),
  ...createTicketSlice(...args),
  ...createLocationSlice(...args),
}));
