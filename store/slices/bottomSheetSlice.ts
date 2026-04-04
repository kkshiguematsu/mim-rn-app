import { BottomSheetNames } from '@/types/modal/bottomSheetNames';
import { StateCreator } from 'zustand';

export interface BottomSheetSlice {
  activeModal: BottomSheetNames | null;
  modalData: any;
  enableModal: (name: BottomSheetNames, modalData?: any) => void;
  disableModal: () => void;
}

export const createBottomSheetSlice: StateCreator<BottomSheetSlice> = (set, get) => ({
  activeModal: null,
  modalData: null,
  enableModal: (name, modalData) => set({ activeModal: name, modalData }),
  disableModal: () => set({ activeModal: null, modalData: null }),
});
