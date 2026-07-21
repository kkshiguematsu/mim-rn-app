import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useTicketStore } from '@/hooks/store/useTicketStore';
import { formatStringDateToDMY } from '@/utils/Date.utils';
import { View, ViewStyle } from 'react-native';
import { TintedBadge } from '../../badge/TintedBadge';
import { HeaderBackButtonIcon } from '../../buttons/HeaderBackButtonIcon';
import { getTicketPriorityStyle } from '../../cards/TicketCard';

interface Props {
  style?: ViewStyle;
}

export const HeaderChat = ({ style }: Props) => {
  const { ticket } = useTicketStore();
  if (!ticket) return;

  const priority = getTicketPriorityStyle(ticket.priority);

  return (
    <View className="flex-row justify-center bg-white px-7 py-2 dark:bg-neutral-950" style={style}>
      <HeaderBackButtonIcon containerStyle="mr-4" />

      <VStack className="flex-1">
        <Heading size="md" numberOfLines={1}>
          {ticket.subject}
        </Heading>
        <Text size="xs" className="text-typography-600">
          {formatStringDateToDMY(ticket.createdAt)}
        </Text>
      </VStack>

      <TintedBadge
        className="self-center"
        label={priority.label}
        icon={priority.icon}
        color={priority.color}
      />

      {/* <Pressable>
        <Icon className="ml-4" as={MoreHorizontal} size="xl" />
      </Pressable> */}
    </View>
  );
};
