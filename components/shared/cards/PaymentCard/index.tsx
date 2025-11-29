import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { PaymentIcon } from 'react-native-payment-icons';

interface ItemCardProps {
  code: string;
  flag:
    | 'alipay'
    | 'amex'
    | 'code'
    | 'cvv'
    | 'diners'
    | 'discover'
    | 'elo'
    | 'generic'
    | 'hiper'
    | 'hipercard'
    | 'jcb'
    | 'maestro'
    | 'mastercard'
    | 'master'
    | 'mir'
    | 'paypal'
    | 'unionpay'
    | 'visa';
  onAction?: () => void;
}

export const PaymentCard = ({ code, flag, onAction }: ItemCardProps) => {
  return (
    <TouchableOpacity onPress={onAction}>
      <Card
        variant="elevated"
        className="flex flex-row items-center justify-between rounded-2xl p-5"
      >
        <View className="flex flex-row items-center justify-center gap-5">
          <PaymentIcon type={flag} />
          <Heading>{code}</Heading>
        </View>
        <Icon as={ChevronRight} size="lg" className="text-primary-400" />
      </Card>
    </TouchableOpacity>
  );
};
