import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { PaymentCardType } from '@/types/payment/paymentCard.type';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { PaymentIcon } from 'react-native-payment-icons';

interface ItemCardProps {
  paymentCard: PaymentCardType;
  onAction: (PaymentCard: PaymentCardType) => void;
}

export const PaymentCard = ({ paymentCard, onAction }: ItemCardProps) => {
  const onOpenPaymentCardViewBottomSheet = () => {
    onAction(paymentCard);
  };

  return (
    <TouchableOpacity onPress={onOpenPaymentCardViewBottomSheet}>
      <Card
        variant="elevated"
        className="flex flex-row items-center justify-between rounded-2xl p-5"
      >
        <View className="flex flex-row items-center justify-center gap-5">
          <PaymentIcon type={paymentCard.flag} />
          <Heading>{paymentCard.code}</Heading>
        </View>
        <Icon as={ChevronRight} size="lg" className="text-primary-400" />
      </Card>
    </TouchableOpacity>
  );
};
