import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useBottomSheetStore = () => {
  return useAppStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      modalData: state.modalData,
      enableModal: state.enableModal,
      disableModal: state.disableModal,
    }))
  );
};
