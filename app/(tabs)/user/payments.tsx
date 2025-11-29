import React from 'react';

import { PaymentCardType } from '@/types/payment/paymentCard.type';

import { Page } from '@/components/shared/Page';
import { PaymentCard } from '@/components/shared/cards/PaymentCard';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { View } from 'react-native';

const mockPaymentCards: PaymentCardType[] = [
  {
    user_name: 'Kassiano Shiguematsu',
    code: '1234 5678 9012',
    flag: 'visa',
    expired_date: '10/10/2026',
    vcc_code: '241',
  },
  {
    user_name: 'Kassiano Shiguematsu',
    code: '4321  8765 1234',
    flag: 'mastercard',
    expired_date: '10/10/2026',
    vcc_code: '241',
  },
];

const mockOthersPaymentsMethods: PaymentCardType[] = [
  {
    user_name: 'Kassiano Shiguematsu',
    code: '1234 5678 9012',
    flag: 'paypal',
    expired_date: '10/10/2026',
    vcc_code: '241',
  },
  // {
  //   user_name: 'Kassiano Shiguematsu',
  //   code: '4321  8765 1234',
  //   flag: '',
  //   expired_date: '10/10/2026',
  //   vcc_code: '241',
  // },
  // {
  //   user_name: 'Kassiano Shiguematsu',
  //   code: '4321  8765 1234',
  //   flag: 'mastercard',
  //   expired_date: '10/10/2026',
  //   vcc_code: '241',
  // },
];

export default function PaymentsPage() {
  const showPaymentCardDetails = () => {};

  return (
    <Page>
      <View className="gap-3">
        <Heading className="mt-5">Cartões</Heading>
        <VStack className="gap-2">
          {mockPaymentCards.map((card, index) => (
            <PaymentCard
              key={`card-${card.flag}-${index}`}
              code={card.code}
              flag={card.flag}
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
              code={card.code}
              flag={card.flag}
              onAction={showPaymentCardDetails}
            />
          ))}
        </VStack>
      </View>
    </Page>
  );
}
