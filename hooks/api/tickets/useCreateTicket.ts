import { useTicketStore } from '@/hooks/store/useTicketStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { TicketPriority, TicketStatus } from '@/types/ticket/ticket.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export interface CreateTicketBody {
  tenantId: string;
  subject: string;
  description: string;
  // priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  attachments: string[];
}

export interface CreateTicketResponse {
  _id: string;
  __v: number;
  tenantId: string;
  openedBy: string;
  status: TicketStatus;
  priority: TicketPriority;
  subject: string;
  description: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

const createTicketApi = async (body: CreateTicketBody): Promise<CreateTicketResponse> => {
  const response = await api.post<CreateTicketResponse>('/tickets', body);

  return response.data;
};

export const useCreateTicket = () => {
  const { user } = useUserStore();
  const { showToast } = useToastMessage();
  const { setTicket } = useTicketStore();

  const router = useRouter();

  return useMutation({
    mutationFn: createTicketApi,
    onSuccess: (data) => {
      const ticket = {
        _id: data._id,
        tenantId: data.tenantId,
        openedBy: {
          _id: data.openedBy,
          name: user?.name!,
          email: user?.email!,
        },
        status: data.status,
        priority: data.priority,
        subject: data.subject,
        description: data.description,
        attachments: data.attachments,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setTicket(ticket);

      showToast({
        type: 'success',
        title: 'Novo chamado criado!',
      });

      setTimeout(() => {
        router.push({ pathname: '/(chat)/[ticketId]', params: { ticketId: data._id } });
      }, 500);
    },
    onError: () => {
      showToast({
        type: 'error',
        title: 'Erro ao criar um novo chamado!',
      });
    },
  });
};
