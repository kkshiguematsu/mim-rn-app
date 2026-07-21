import React from 'react';

import { Page } from '@/components/layout/page';
import { PaymentCard } from '@/components/shared/cards/PaymentCard';
import { BottomSheetTrigger } from '@/components/ui/bottomsheet';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { BottomSheetNames } from '@/types/bottomsheet/bottomSheetNames';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function PaymentsPage() {
  const { user } = useUserStore();
  const { enableModal } = useBottomSheetStore();
  const { animateRotation, animationStyle } = useRotationAnimation(180);

  const openBottomSheet = () => {
    animateRotation();
    enableModal(BottomSheetNames.PaymenentCardAddBottomSheet);
  };

  return (
    <Page.Scroll hasHeader={false} needsPadding={false}>
      <Page.Header
        hasBackButton
        title="Pagamento"
        rightAction={
          <BottomSheetTrigger onPress={openBottomSheet}>
            <Animated.View
              style={animationStyle}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 shadow"
            >
              <Icon as={Plus} size="2xl" className="text-white" />
            </Animated.View>
          </BottomSheetTrigger>
        }
      />
      <View className="px-7">
        <View className="gap-3">
          <Heading className="mt-5">Cartões</Heading>
          <VStack className="gap-2">
            {user?.cards.map((card) => (
              <PaymentCard key={`card-${card._id}`} paymentCard={card} />
            ))}
          </VStack>
        </View>
      </View>
    </Page.Scroll>
  );
}
