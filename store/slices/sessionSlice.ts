import { Transaction } from '@/types/transaction/transaction.type';
import { StateCreator } from 'zustand';

export interface SessionSlice {
  selectedSession: Transaction | null;
  setSelectedSession: (session: Transaction) => void;
  clearSelectedSession: () => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  selectedSession: null,
  setSelectedSession: (session) => set({ selectedSession: session }),
  clearSelectedSession: () => set({ selectedSession: null }),
});
