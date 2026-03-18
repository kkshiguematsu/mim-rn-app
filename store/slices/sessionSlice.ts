import { Session } from '@/types/history/Session.type';
import { StateCreator } from 'zustand';

export interface SessionSlice {
  selectedSession: Session | null;
  setSelectedSession: (session: Session) => void;
  clearSelectedSession: () => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  selectedSession: null,
  setSelectedSession: (session) => set({ selectedSession: session }),
  clearSelectedSession: () => set({ selectedSession: null }),
});
