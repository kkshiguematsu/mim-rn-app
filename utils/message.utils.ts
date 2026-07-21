import { MessagePosition, MessageType, TicketMessage } from '@/types/ticket/ticketMessages.type';

export const isStatusChangeMessage = (message: TicketMessage): boolean => {
  return message.isStatusChange;
};

export const getMessageType = (message: TicketMessage, currentUserId: string): MessageType => {
  if (message.isStatusChange) {
    return MessageType.STATUS_CHANGE;
  }

  return message.senderId._id === currentUserId ? MessageType.SENT : MessageType.RECEIVED;
};

export function getMessagePosition(
  currentMessage: TicketMessage,
  previousMessage: TicketMessage | null,
  nextMessage: TicketMessage | null,
  currentUserId: string
): MessagePosition {
  const currentType = getMessageType(currentMessage, currentUserId);

  const isSameAsPrevious =
    !!previousMessage &&
    !previousMessage.isStatusChange &&
    getMessageType(previousMessage, currentUserId) === currentType &&
    previousMessage.senderId._id === currentMessage.senderId._id;

  const isSameAsNext =
    !!nextMessage &&
    !nextMessage.isStatusChange &&
    getMessageType(nextMessage, currentUserId) === currentType &&
    nextMessage.senderId._id === currentMessage.senderId._id;

  if (!isSameAsPrevious && !isSameAsNext) {
    return MessagePosition.SINGLE;
  }

  if (!isSameAsPrevious && isSameAsNext) {
    return MessagePosition.FIRST;
  }

  if (isSameAsPrevious && isSameAsNext) {
    return MessagePosition.MIDDLE;
  }

  return MessagePosition.LAST;
}
