import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { TicketPriority, TicketStatus } from '@/types/ticket/ticket.type';
import { useMutation } from '@tanstack/react-query';

export interface TicketResponse {
  _id: string;
  tenantId: {
    _id: string;
    name: string;
  };
  openedBy: {
    _id: string;
    name: string;
    email: string;
  };
  status: TicketStatus;
  priority: TicketPriority;
  subject: string;
  description: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const fetchTicket = async (ticketId: string): Promise<TicketResponse> => {
  const response = await api.get<TicketResponse>(`/tickets/${ticketId}`);
  return response.data;
};

export const useCreateTicket = () => {
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: fetchTicket,
    onError: () => {
      showToast({
        type: 'error',
        title: 'Erro ao pegar dados do chamado!',
      });
    },
  });
};
