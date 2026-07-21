import { Text } from '@/components/ui/text';
import React from 'react';

import { MessagePosition, MessageType, TicketMessage } from '@/types/ticket/ticketMessages.type';
import { formatStringDateToHHMM } from '@/utils/Date.utils';
import { getMessagePosition, getMessageType } from '@/utils/message.utils';
import clsx from 'clsx';
import { View } from 'react-native';

interface MessageBubbleProps {
  message: TicketMessage;
  currentUserId: string;
  previousMessage?: TicketMessage;
  nextMessage?: TicketMessage;
}

const RADIUS_CLASSES = {
  sent: {
    [MessagePosition.SINGLE]: 'rounded-2xl ',
    [MessagePosition.FIRST]: 'rounded-2xl rounded-br-md ',
    [MessagePosition.MIDDLE]: 'rounded-2xl rounded-tr-md rounded-br-md ',
    [MessagePosition.LAST]: 'rounded-2xl rounded-tr-md',
  },
  received: {
    [MessagePosition.SINGLE]: 'rounded-2xl rounded-bl-md',
    [MessagePosition.FIRST]: 'rounded-2xl rounded-bl-md ',
    [MessagePosition.MIDDLE]: 'rounded-2xl rounded-tl-md rounded-bl-md',
    [MessagePosition.LAST]: 'rounded-2xl rounded-tl-md ',
  },
} as const;

export function MessageBubble({
  message,
  currentUserId,
  previousMessage,
  nextMessage,
}: MessageBubbleProps) {
  const messageType = getMessageType(message, currentUserId);
  const position = getMessagePosition(
    message,
    previousMessage || null,
    nextMessage || null,
    currentUserId
  );
  const isSent = messageType === MessageType.SENT;

  const isFirstMessage = position === MessagePosition.FIRST;
  const isLastMessage = position === MessagePosition.LAST;

  const bubbleRadius = RADIUS_CLASSES[isSent ? 'sent' : 'received'][position];

  if (messageType === MessageType.STATUS_CHANGE) {
    return (
      <View className="my-3 items-center">
        <View className="flex flex-row items-center gap-3 rounded-xl bg-neutral-100 px-3 py-1.5 shadow-sm dark:bg-neutral-700">
          <Text size="sm" className="text-center text-typography-600">
            {message.message}
          </Text>
          <Text size="sm" className="mt-0.5 text-center text-typography-600">
            {formatStringDateToHHMM(message.createdAt)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`my-0.5 flex-row px-1 ${isSent ? 'justify-end' : 'justify-start'}`}>
      {!isSent && isLastMessage && (
        <View className="flex justify-end">
          <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-primary-600">
            <Text size="sm" className="font-semibold text-white">
              {message.senderId.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      )}

      {!isSent && !isLastMessage && <View className="w-10" />}

      <View className="max-w-[70%]">
        {isFirstMessage && (
          <Text size="xs" className="mb-1 ml-3 text-typography-600">
            {message.senderId.name}
          </Text>
        )}

        <View
          className={clsx([
            'rounded-2xl px-3 py-2 pb-1',
            isSent ? 'bg-primary-700' : 'bg-neutral-100 dark:bg-neutral-800',
            bubbleRadius,
          ])}
        >
          <Text
            size="lg"
            className={`mb-1 leading-5 ${isSent ? 'text-white' : 'text-black dark:text-white'} `}
          >
            {message.message}
          </Text>

          <Text
            size="sm"
            className={`self-end ${isSent ? 'text-white/70 dark:text-white' : 'text-typography-500 dark:text-typography-400'} `}
          >
            {formatStringDateToHHMM(message.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}
