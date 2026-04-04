import React from 'react';

import { PaymentCardType } from '@/types/payment/paymentCard.type';

import { Page } from '@/components/layout/page';
import { PaymentCard } from '@/components/shared/cards/PaymentCard';
import { BottomSheetTrigger } from '@/components/ui/bottomsheet';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BottomSheetNames } from '@/types/modal/bottomSheetNames';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

const mockPaymentCards: PaymentCardType[] = [
  {
    userName: 'Kassiano Shiguematsu',
    code: '1234 5678 9012',
    flag: 'visa',
    expiredDate: '10/10/2026',
    cvvCode: '241',
  },
  {
    userName: 'Kassiano Shiguematsu',
    code: '4321  8765 1234',
    flag: 'mastercard',
    expiredDate: '10/10/2026',
    cvvCode: '241',
  },
];

const mockOthersPaymentsMethods: PaymentCardType[] = [
  {
    userName: 'Kassiano Shiguematsu',
    code: '1234 5678 9012',
    flag: 'paypal',
    expiredDate: '10/10/2026',
    cvvCode: '241',
  },
  // {
  //   userName: 'Kassiano Shiguematsu',
  //   code: '4321  8765 1234',
  //   flag: '',
  //   expiredDate: '10/10/2026',
  //   cvvCode: '241',
  // },
  // {
  //   userName: 'Kassiano Shiguematsu',
  //   code: '4321  8765 1234',
  //   flag: 'mastercard',
  //   expiredDate: '10/10/2026',
  //   cvvCode: '241',
  // },
];

export default function PaymentsPage() {
  const { enableModal } = useBottomSheetStore();
  const { animateRotation, animationStyle } = useRotationAnimation(180);

  const openModal = () => {
    animateRotation();
    enableModal(BottomSheetNames.PaymenentCardAddBottomSheet);
  };

  const showPaymentCardDetails = (paymentCard: PaymentCardType) => {
    enableModal(BottomSheetNames.PaymentCardViewBottomSheet, paymentCard);
  };

  return (
    <Page.Scroll hasHeader={false} needsPadding={false}>
      <Page.Header
        hasBackButton
        title="Pagamento"
        rightAction={
          <BottomSheetTrigger onPress={openModal}>
            <Animated.View
              style={animationStyle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 shadow"
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
            {mockPaymentCards.map((card, index) => (
              <PaymentCard
                key={`card-${card.flag}-${index}`}
                paymentCard={card}
                onAction={showPaymentCardDetails}
              />
            ))}
          </VStack>
        </View>
        <View className="mt-5 gap-2">
          <Heading className="">Outros meios de pagamento</Heading>
          <VStack className="gap-2">
            {mockOthersPaymentsMethods.map((card, index) => (
              <PaymentCard
                key={`card-${card.flag}-${index}`}
                paymentCard={card}
                onAction={showPaymentCardDetails}
              />
            ))}
          </VStack>
        </View>
      </View>
    </Page.Scroll>
  );
}
