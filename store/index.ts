import { create } from 'zustand';
import { createSessionSlice, SessionSlice } from './slices/sessionSlice';

type AppStore = SessionSlice;

export const useAppStore = create<AppStore>((...args) => ({
  ...createSessionSlice(...args),
}));
