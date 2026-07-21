import { Text } from '@/components/ui/text';
import { config } from '@/constants/config';
import { PaymentMethod } from '@/hooks/api/transation/useStartChargingTransaction';
import { CreditCard, Zap } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { PixIcon } from '../../icon/PixIcon';
import { DefaultCard } from '../DefaultCard';

const appEnv = config.appEnv;

const PAYMENT_OPTIONS: {
  label: string;
  value: PaymentMethod;
  icon: any;
}[] = [
  { label: 'Crédito', value: 'credit-card', icon: CreditCard },
  { label: 'Débito', value: 'debit-card', icon: CreditCard },
  { label: 'PIX', value: 'pix', icon: PixIcon },
  ...(appEnv === 'development'
    ? [{ label: 'Simular', value: 'simulate' as PaymentMethod, icon: Zap }]
    : []),
];

interface PaymentMethodCardProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodCard = ({ selected, onSelect }: PaymentMethodCardProps) => {
  return (
    <DefaultCard className="gap-4">
      <Text size="lg" className="font-semibold text-black dark:text-white">
        Método de pagamento
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {PAYMENT_OPTIONS.map(({ label, value, icon: Icon }) => {
          const isActive = selected === value;
          return (
            <Pressable
              key={value}
              onPress={() => onSelect(value)}
              className="flex-1"
              style={{ minWidth: '30%' }}
            >
              <View
                className={`items-center gap-2 rounded-2xl border-2 p-4 ${
                  isActive
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                }`}
              >
                <Icon size={32} color={isActive ? '#22c55e' : '#a3a3a3'} />
                <Text
                  size="sm"
                  className={`font-medium ${
                    isActive ? 'text-green-600 dark:text-green-400' : 'text-neutral-500'
                  }`}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </DefaultCard>
  );
};
