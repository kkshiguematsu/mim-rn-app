import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { TicketMessage } from '@/types/ticket/ticketMessages.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchTicketMessages = async (ticketId: string): Promise<TicketMessage[]> => {
  const response = await api.get<TicketMessage[]>(`/tickets/${ticketId}/messages`);
  return response.data;
};

export const useTicketMessages = (ticketId: string | null, enabled: boolean = true) => {
  const { showToast } = useToastMessage();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ticket-messages', ticketId],
    queryFn: () => fetchTicketMessages(ticketId!),
    enabled: !!ticketId && enabled,
    refetchInterval: 5000,
    staleTime: 0,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (!isError) return;

    showToast({
      type: 'error',
      title: 'Erro ao carregar mensagens',
    });
  }, [data, isError]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
