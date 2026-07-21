import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  PaymentMethod,
  useStartChargingTransaction,
} from '@/hooks/api/transation/useStartChargingTransaction';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useVehicleStore } from '@/hooks/store/useVehicleStore';
import { StartChargingTransactionPayload } from '@/types/transaction/chargingTransaction.type';
import { Play } from 'lucide-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { ChargeLimitCard, TabOptions } from '../../cards/ChargeLimitsCard';
import { PaymentMethodCard } from '../../cards/PaymentMethodCard';

interface ChargeLimitState {
  limit: number;
  type: TabOptions;
}

export const TransactionPaymentMethodBottomSheet = () => {
  const [chargeLimits, setChargeLimits] = useState<Record<TabOptions, number>>({
    value: 100,
    kwh: 10,
  });
  const [limitType, setLimitType] = useState<TabOptions>('value');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('simulate');

  const { user } = useUserStore();
  const { activeVehicle } = useVehicleStore();
  const { selectedCharger } = useChargerStore();
  const { modalData: chargerId } = useBottomSheetStore();
  const { mutate: startChargingTransatcionMutate, isPending } = useStartChargingTransaction();

  const currentLimit = chargeLimits[limitType];

  const handleLimitChange = (limit: number) => {
    setChargeLimits((prev) => ({ ...prev, [limitType]: limit }));
  };

  const confirmationStartTransaction = () => {
    Alert.alert('Iniciar carregamento', 'Deseja iniciar o carregamento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Iniciar',
        style: 'default',
        onPress: () => {
          if (!user) return;

          const limitKwh =
            limitType === 'kwh'
              ? chargeLimits.kwh
              : chargeLimits.value / (selectedCharger?.pricePerKwh ?? 1);

          const payload: StartChargingTransactionPayload = {
            tenantId: user.tenantId._id || '',
            chargerId,
            userId: user._id || '',
            connectorId: 1,
            limitKwh,
            skipPayment: true,
          };

          if (activeVehicle) {
            payload.vehicleId = activeVehicle.vehicle._id || '';
            payload.vehiclePlate = activeVehicle.vehicle.licensePlate || '';
          }

          startChargingTransatcionMutate({ data: payload, method: paymentMethod });
        },
      },
    ]);
  };

  return (
    <BottomSheetWrapper contentContainerClassName="gap-5 px-4 py-2" scrollable>
      <Heading className="text-center" size="lg">
        Iniciar carregamento
      </Heading>

      <ChargeLimitCard
        limit={currentLimit}
        limitType={limitType}
        onLimitChange={handleLimitChange}
        onLimitTypeChange={setLimitType}
      />

      <PaymentMethodCard selected={paymentMethod} onSelect={setPaymentMethod} />

      <Button
        className="h-14 rounded-2xl"
        action="primary"
        disabled={isPending}
        onPress={confirmationStartTransaction}
      >
        {isPending && <ButtonSpinner color="white" />}
        <ButtonText>Iniciar Carregamento</ButtonText>
        <ButtonIcon as={Play} color="white" />
      </Button>
    </BottomSheetWrapper>
  );
};
