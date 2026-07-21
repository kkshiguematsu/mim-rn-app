import { Text } from '@/components/ui/text';
import React from 'react';

import { Page } from '@/components/layout/page';
import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { TintedButton } from '@/components/shared/buttons/TintedButton';
import { ArcBatteryCard } from '@/components/shared/cards/ArcBatteryCard';
import { ArcBatteryCardSkeleton } from '@/components/shared/cards/ArcBatteryCard/SkeletonArcBatteryCard';
import { SessionDetailsCard } from '@/components/shared/cards/SessionDetailsCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { Grid, GridItem } from '@/components/ui/grid';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { useBellAnimation } from '@/hooks/animations/useBellAnimation';
import { useChargingTransactionPolling } from '@/hooks/api/transation/useChargingTransactionPolling';
import { useStopChargingTransaction } from '@/hooks/api/transation/useStopChargingTransaction';
import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { formatTimeToMinutes } from '@/utils/formatTime';
import { BellOff, BellRing, Clock, CreditCard, Square } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function ChargingMonitorPage() {
  const [notifyOnComplete, setNotifyOnComplete] = useState(false);

  const { activeTransaction } = useChargingTransactionStore();
  const { animatedStyle, ring, unring } = useBellAnimation();
  const { isError: pollingError } = useChargingTransactionPolling(
    activeTransaction?._id ? true : false
  );
  const { mutate: stopChargingTransaction } = useStopChargingTransaction();

  if (!activeTransaction) return null;

  const batteryLevel = activeTransaction.batteryLevel;
  const timeRemaining = activeTransaction?.estimatedTimeRemaining;

  const handleStop = () =>
    Alert.alert('Parar Carregamento', 'Deseja finalizar o carregamento agora?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Parar',
        style: 'destructive',
        onPress: () => {
          if (!activeTransaction) return;
          stopChargingTransaction(activeTransaction._id);
        },
      },
    ]);

  // const setChargeLimit = (limit: number) => {
  //   TODO: Implement API call to set charge limit
  // };

  const handleToggleNotification = () => {
    if (!notifyOnComplete) ring();
    else unring();
    setNotifyOnComplete((prev) => !prev);
  };
  return (
    <Page.Scroll
      className="relative gap-4"
      needsPadding
      hasHeader={false}
      stickyHeaderIndices={[0]}
    >
      <Page.Header
        applyInsetsTo="content"
        content={
          <View className="fixed -mx-2 flex-row items-center justify-between bg-neutral-200 pb-4 pt-2 dark:bg-neutral-900">
            <View>
              <TintedBadge label="Sessão ativa" size="xs" color="green" animated />
              <Heading size="2xl" className="mt-1 text-black dark:text-white">
                Carregando
              </Heading>
              <Text size="xs" className="text-neutral-400">
                {activeTransaction.chargerId?.address?.street ?? 'Endereço não disponível'} ·{' '}
                {activeTransaction._id}
              </Text>
            </View>
            <View className="items-end gap-1.5">
              <Pressable
                onPress={handleToggleNotification}
                className={`items-center justify-center rounded-full p-2.5 ${notifyOnComplete ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-neutral-100 dark:bg-neutral-800'}`}
              >
                <Animated.View style={animatedStyle}>
                  <Icon
                    as={notifyOnComplete ? BellRing : BellOff}
                    size="lg"
                    className={notifyOnComplete ? 'text-primary-500' : 'text-neutral-400'}
                  />
                </Animated.View>
              </Pressable>
            </View>
          </View>
        }
      />

      {batteryLevel === 0 ? (
        <ArcBatteryCardSkeleton />
      ) : (
        <ArcBatteryCard
          batteryLevel={batteryLevel}
          stationName="Estação"
          stationAddress="Endereço"
          connectorLabel="Conector"
          powerKw={activeTransaction.currentPower ? activeTransaction.currentPower / 1000 : 0}
          energyAddedKwh={activeTransaction.energyAdded}
          costPerKwh={activeTransaction.totalCost || 0}
          timeRemainingMin={timeRemaining}
        />
      )}

      <Grid
        className="gap-2"
        _extra={{
          className: 'grid-cols-3',
        }}
      >
        <GridItem
          _extra={{
            className: 'col-span-1',
          }}
        >
          <StatusCard
            title="Valor Atual"
            content={activeTransaction.totalCost?.toFixed(2)}
            unit="R$"
            icon={CreditCard}
            color="green"
          />
        </GridItem>
        {/* <GridItem
          _extra={{
            className: 'col-span-1',
          }}
        >
          <StatusCard
            title="Tempo Restante"
            content={formatTimeToMinutes(timeRemaining)}
            unit="min"
            icon={Clock}
            color="blue"
          />
        </GridItem> */}
        <GridItem
          _extra={{
            className: 'col-span-1',
          }}
        >
          <StatusCard
            title="Tempo Decorrido"
            content={formatTimeToMinutes(activeTransaction.elapsedTime)}
            unit="min"
            icon={Clock}
            color="violet"
          />
        </GridItem>
      </Grid>

      <SessionDetailsCard
        startTime={new Date(activeTransaction.startedAt).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
        endTime={
          activeTransaction.stoppedAt
            ? new Date(activeTransaction.stoppedAt).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : undefined
        }
        energyKwh={activeTransaction.energyAdded}
        tariff={
          activeTransaction.totalCost
            ? activeTransaction.totalCost / activeTransaction.energyAdded
            : 0
        }
        location={activeTransaction.chargerId.address}
        paymentLabel="Cartão de débito"
      />

      <View className="">
        <TintedButton label="Encerrar sessão" color="red" icon={Square} onPress={handleStop} />
      </View>
    </Page.Scroll>
  );
}
