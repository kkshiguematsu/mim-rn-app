import { Page } from '@/components/layout/page';
import { HeaderChat } from '@/components/shared/chat/HeaderChat';
import { InputChat } from '@/components/shared/chat/InputChat';
import { MessageBubble } from '@/components/shared/chat/MessageBubble';
import { useTicketMessages } from '@/hooks/api/tickets/useTicketMessages';
import { useTicketStore } from '@/hooks/store/useTicketStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { TicketMessage } from '@/types/ticket/ticketMessages.type';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler(
    {
      onMove: (event) => {
        'worklet';
        height.value = Math.max(event.height, 0);
      },
    },
    []
  );
  return { height };
};

export default function TicketDetailsPage() {
  const flatListRef = useRef<FlatList<TicketMessage>>(null);

  const { user } = useUserStore();
  const { ticket } = useTicketStore();
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();

  const { height } = useGradualAnimation();

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd();
  };

  useAnimatedReaction(
    () => height.value,
    (curr, prev) => {
      if (curr !== prev) {
        runOnJS(scrollToEnd)();
      }
    },
    [height]
  );

  const fakeView = useAnimatedStyle(() => ({
    height: Math.abs(height.value),
  }));

  const { data: messages, isLoading } = useTicketMessages(ticketId);

  const descriptionMessage: TicketMessage | null = ticket && {
    _id: ticket._id,
    ticketId: ticket._id,
    senderId: {
      _id: ticket.openedBy._id,
      name: ticket.openedBy.name,
      email: ticket.openedBy.email,
    },
    message: ticket.description,
    attachments: ticket.attachments,
    isInternal: false,
    isStatusChange: false,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    __v: 0,
  };

  const newMessages = messages && descriptionMessage && [descriptionMessage, ...messages];
  const filteredMessages = newMessages?.filter((message) => !message.isInternal);

  const handleContentSizeChange = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Page>
      <Page.Header content={<HeaderChat />} />

      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={filteredMessages}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <MessageBubble
              message={item}
              currentUserId={user?._id!}
              previousMessage={filteredMessages?.[index - 1]}
              nextMessage={filteredMessages?.[index + 1]}
            />
          )}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          onContentSizeChange={handleContentSizeChange}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={20}
        />

        <InputChat />
        <Animated.View style={fakeView} />
      </View>
    </Page>
  );
}
