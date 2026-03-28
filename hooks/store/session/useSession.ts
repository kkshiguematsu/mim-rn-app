import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useSessionStore = () => {
  return useAppStore(
    useShallow((state) => ({
      selectedSession: state.selectedSession,
      setSelectedSession: state.setSelectedSession,
      clearSelectedSession: state.clearSelectedSession,
    }))
  );
};
