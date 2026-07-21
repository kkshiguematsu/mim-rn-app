import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { TicketMessage } from '@/types/ticket/ticketMessages.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type MessagePost = Pick<TicketMessage, 'message' | 'attachments' | 'isInternal'>;

type PostMessageParams = {
  ticketId: string;
  payload: MessagePost;
};

const postMessage = async ({ ticketId, payload }: PostMessageParams): Promise<TicketMessage> => {
  const response = await api.post<TicketMessage>(`/tickets/${ticketId}/messages`, payload);
  return response.data;
};

export const usePostMessage = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: postMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['ticket-messages', variables.ticketId],
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        title: 'Erro ao enviar mensagem!',
      });
    },
  });
};
