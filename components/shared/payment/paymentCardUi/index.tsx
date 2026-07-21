import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PaymentFormData } from '@/types/form/payment/paymentCardForm.type';
import { formatCardNumber, getCardBrand } from '@/utils/paymentCard';
import { Wifi } from 'lucide-react-native';
import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { PaymentIcon } from 'react-native-payment-icons';

export const PaymentCardUi = () => {
  const { control } = useFormContext<PaymentFormData>();

  const [code, expiredDate, cvvCode, holderName] = useWatch<PaymentFormData>({
    control,
    name: ['code', 'expiredDate', 'cvvCode', 'holderName'],
  });

  const cardFlag = getCardBrand(code);

  return (
    <View className="relative my-2 aspect-video w-full rounded-2xl bg-primary-800 p-5">
      {cardFlag && (
        <View className="absolute left-4 top-7">
          <PaymentIcon type={cardFlag} />
        </View>
      )}

      <View className="absolute right-7 top-7 rotate-90">
        <Icon as={Wifi} size="xl" className="text-white" />
      </View>
      <View className="absolute bottom-4 left-4 w-[80%]">
        <View className="flex flex-col gap-2">
          <Text size="xl" className="text-white">
            {formatCardNumber(code.toString()) || '0000 0000 0000 0000'}
          </Text>
          <View className="flex flex-row justify-between">
            <Text size="xs" className="text-white">
              {expiredDate || 'MM/AA'}
            </Text>
            <Text size="xs" className="text-white">
              {cvvCode || 'CVV'}
            </Text>
          </View>
          <Text size="sm" className="text-white">
            {holderName || 'NOME COMPLETO'}
          </Text>
        </View>
      </View>
    </View>
  );
};
