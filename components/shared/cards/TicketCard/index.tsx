import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTicketStore } from '@/hooks/store/useTicketStore';
import { Ticket, TicketPriority, TicketStatus } from '@/types/ticket/ticket.type';
import { formatStringDateToDMY } from '@/utils/Date.utils';
import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Circle,
  CircleDashed,
  Clock3,
  LucideIcon,
  MessageSquareMore,
  Minus,
  ShieldAlert,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { TintedBadge } from '../../badge/TintedBadge';
import { TintedIcon } from '../../icon/TintedIcon';
import { TailwindColor } from '../../icon/TintedIcon/styles';
import { DefaultCard } from '../DefaultCard';

export type TicketStyle = {
  icon: LucideIcon;
  label: string;
  color: TailwindColor;
};

export const getTicketStatusStyle = (status: TicketStatus): TicketStyle => {
  switch (status) {
    case 'OPEN':
      return {
        icon: AlertTriangle,
        label: 'ABERTO',
        color: 'blue',
      };

    case 'IN_PROGRESS':
      return {
        icon: Clock3,
        label: 'EM ANDAMENTO',
        color: 'orange',
      };

    case 'CLOSED':
      return {
        icon: CheckCircle2,
        label: 'RESOLVIDO',
        color: 'green',
      };

    case 'ESCALATED':
      return {
        icon: ShieldAlert,
        label: 'ESCALADO',
        color: 'red',
      };

    case 'WAITING_CUSTOMER':
      return {
        icon: MessageSquareMore,
        label: 'AGUARDANDO CLIENTE',
        color: 'purple',
      };

    default:
      return {
        icon: Circle,
        label: status,
        color: 'blue',
      };
  }
};

export const getTicketPriorityStyle = (priority: TicketPriority): TicketStyle => {
  switch (priority) {
    case 'URGENT':
      return {
        icon: AlertTriangle,
        label: 'Urgente',
        color: 'red',
      };

    case 'HIGH':
      return {
        icon: ShieldAlert,
        label: 'Alta',
        color: 'orange',
      };

    case 'MEDIUM':
      return {
        icon: Minus,
        label: 'Média',
        color: 'blue',
      };

    case 'LOW':
      return {
        icon: CircleDashed,
        label: 'Baixa',
        color: 'gray',
      };

    default:
      return {
        icon: Circle,
        label: priority,
        color: 'gray',
      };
  }
};

interface Props {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: Props) => {
  const { setTicket } = useTicketStore();

  const router = useRouter();

  const status = getTicketStatusStyle(ticket.status);
  const priority = getTicketPriorityStyle(ticket.priority);

  const navigateToTicketDetails = () => {
    setTicket(ticket);

    router.push({
      pathname: '/(chat)/[ticketId]',
      params: { ticketId: ticket._id },
    });
  };

  return (
    <Pressable onPress={navigateToTicketDetails}>
      <DefaultCard className="flex flex-row items-center gap-2">
        <TintedIcon icon={priority.icon} color={priority.color} size="lg" />

        <View className="flex flex-1">
          <Text className="font-medium" numberOfLines={1}>
            {ticket.subject}
          </Text>
          <Text size="xs" className="text-typography-600">
            {formatStringDateToDMY(ticket.createdAt)}
          </Text>
        </View>

        <TintedBadge label={status.label} color={status.color} className="self-center" />

        <Icon as={ChevronRight} />
      </DefaultCard>
    </Pressable>
  );
};
