import React from 'react';

import { PaymentCardType } from '@/types/payment/paymentCard.type';

import { Page } from '@/components/layout/page';
import { PaymentCard } from '@/components/shared/cards/PaymentCard';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { useModal } from '@/context/modalContext';
import { ModalNames } from '@/types/modal/modalsComponents';
import { View } from 'react-native';

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
  const { enableModal } = useModal();

  const showPaymentCardDetails = (paymentCard: PaymentCardType) => {
    enableModal(ModalNames.PaymentCardViewModal, paymentCard);
  };

  return (
    <Page.Scroll>
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
    </Page.Scroll>
  );
}
