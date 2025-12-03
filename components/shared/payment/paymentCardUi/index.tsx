import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { formatCardNumber, getCardBrand } from '@/utils/paymentCard';
import { Wifi } from 'lucide-react-native';
import { FieldValues, UseFormWatch, useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { PaymentIcon } from 'react-native-payment-icons';

interface PaymentCardUiProps {
  watch: UseFormWatch<FieldValues>;
}

export const PaymentCardUi = ({}: PaymentCardUiProps) => {
  const { control } = useFormContext();

  const cardNumber = useWatch({ control, name: 'cardNumber' });
  const expireDate = useWatch({ control, name: 'expireDate' });
  const cvv = useWatch({ control, name: 'cvv' });
  const nameCard = useWatch({ control, name: 'nameCard' });

  const cardFlag = getCardBrand(cardNumber);

  return (
    <View className="relative my-7 aspect-video w-[80%] rounded-2xl bg-purple-600 p-5">
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
            {formatCardNumber(cardNumber.toString()) || '0000 0000 0000 0000'}
          </Text>
          <View className="flex flex-row justify-between">
            <Text size="xs" className="text-white">
              {expireDate || 'MM/AA'}
            </Text>
            <Text size="xs" className="text-white">
              {cvv || 'CVV'}
            </Text>
          </View>
          <Text size="sm" className="text-white">
            {nameCard || 'NOME COMPLETO'}
          </Text>
        </View>
      </View>
    </View>
  );
};
