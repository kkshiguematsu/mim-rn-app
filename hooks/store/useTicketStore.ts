import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useTicketStore = () => {
  return useAppStore(
    useShallow((state) => ({
      ticket: state.ticket,
      isLoading: state.isLoading,
      setTicket: state.setTicket,
      updateTicket: state.updateTicket,
      clearTicket: state.clearTicket,
      setLoading: state.setLoading,
    }))
  );
};
