import { Ticket } from '@/types/ticket/ticket.type';
import { StateCreator } from 'zustand';

export interface TicketSlice {
  ticket: Ticket | null;
  isLoading: boolean;
  setTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  clearTicket: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const createTicketSlice: StateCreator<TicketSlice> = (set) => ({
  ticket: null,
  tickets: [],
  isLoading: false,

  setTicket: (ticket: Ticket) => {
    set({ ticket });
  },

  updateTicket: (ticket: Ticket) => {
    set((state) => ({
      ticket: state.ticket?._id === ticket._id ? ticket : state.ticket,
    }));
  },

  removeTicket: (ticketId: string) => {
    set((state) => ({
      ticket: state.ticket?._id === ticketId ? null : state.ticket,
    }));
  },

  clearTicket: () => {
    set({ ticket: null });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
});
