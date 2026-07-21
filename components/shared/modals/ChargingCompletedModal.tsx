import { Page } from '@/components/layout/page';
import { TintedButton } from '@/components/shared/buttons/TintedButton';
import { SessionDetailsCard } from '@/components/shared/cards/SessionDetailsCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Grid, GridItem } from '@/components/ui/grid';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { formatDuration, formatTimeToHM } from '@/utils/formatTime';
import { paymentStatusMap } from '@/utils/paymentCard';
import { calculateCO2Avoided } from '@/utils/Statistics.utils';
import { calculateDuration } from '@/utils/transaction.utils';
import { CheckCircle, ChevronLeft, Clock, DollarSign, Leaf, Share, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

export const ChargingCompletedModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { lastActiveTransaction, clearSession } = useChargingTransactionStore();

  useEffect(() => {
    if (!lastActiveTransaction) return;

    setIsVisible(true);
  }, [lastActiveTransaction]);

  if (!lastActiveTransaction) return null;

  const startTime = formatTimeToHM(new Date(lastActiveTransaction.startedAt).getTime());
  const endTime = lastActiveTransaction.stoppedAt
    ? formatTimeToHM(new Date(lastActiveTransaction.stoppedAt).getTime())
    : undefined;

  const durationMs = calculateDuration(
    lastActiveTransaction.startedAt,
    lastActiveTransaction.stoppedAt
  );
  const durationSec = Math.floor(durationMs / 1000);

  const energyKwh = lastActiveTransaction.energyAdded ?? 0;
  const totalCost = lastActiveTransaction.totalCost ?? 0;
  const tariff = energyKwh > 0 ? totalCost / energyKwh : 0;

  const handleExport = () => {
    // TODO: implementar exportação de comprovante
  };

  const handleCloseModal = () => {
    clearSession();
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <Page needsPadding={false} needsBottomTabBar={false}>
        <Page.Header
          title="Recarga concluída"
          leftAction={
            <Pressable
              onPress={handleCloseModal}
              className="h-5 w-5 items-center justify-center p-5"
            >
              <Icon as={ChevronLeft} size="2xl" className="text-black dark:text-white" />
            </Pressable>
          }
        />

        <Page.Scroll className="gap-5" needsPadding={false} needsSafeArea={false} hasHeader={false}>
          <View className="items-center gap-2 px-7 pb-2 pt-4">
            <View className="mb-1 h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Icon as={CheckCircle} size="2xl" className="text-green-500" />
            </View>
            <Heading size="2xl" className="text-black dark:text-white">
              Sessão finalizada
            </Heading>
            <Text size="sm" className="text-center text-neutral-400">
              {lastActiveTransaction.chargerId?.address?.street ?? 'Endereço não disponível'}
            </Text>
          </View>

          <View className="px-7">
            <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
              <GridItem _extra={{ className: 'col-span-1' }}>
                <StatusCard title="Energia adicionada" icon={Zap} color="green">
                  <VStack className="gap-0">
                    <Text size="2xl" className="font-bold">
                      {energyKwh.toFixed(1)}{' '}
                      <Text size="md" className="font-normal text-neutral-400/90">
                        kWh
                      </Text>
                    </Text>
                  </VStack>
                </StatusCard>
              </GridItem>

              <GridItem _extra={{ className: 'col-span-1' }}>
                <StatusCard title="Custo total" icon={DollarSign} color="amber">
                  <VStack className="gap-0">
                    <Text size="2xl" className="font-bold" style={{ fontSize: 20 }}>
                      R$ {totalCost.toFixed(2)}
                    </Text>
                  </VStack>
                </StatusCard>
              </GridItem>

              <GridItem _extra={{ className: 'col-span-1' }}>
                <StatusCard title="Duração" icon={Clock} color="blue">
                  <VStack className="gap-0">
                    <Text size="2xl" className="font-bold">
                      {formatDuration(durationSec)}
                    </Text>
                    <Text size="xs" className="text-neutral-400">
                      {startTime} → {endTime ?? '--:--'}
                    </Text>
                  </VStack>
                </StatusCard>
              </GridItem>

              <GridItem _extra={{ className: 'col-span-1' }}>
                <StatusCard title="Nível final" icon={Zap} color="violet">
                  <VStack className="gap-0">
                    <Text size="2xl" className="font-bold">
                      {lastActiveTransaction.batteryLevel?.toFixed(0) ?? '--'}
                      <Text size="md" className="font-normal text-neutral-400/90">
                        {' '}
                        %
                      </Text>
                    </Text>
                  </VStack>
                </StatusCard>
              </GridItem>
            </Grid>
          </View>

          <View className="mx-7 flex-row items-center gap-3 rounded-2xl bg-green-50 p-5 dark:bg-green-950">
            <TintedIcon icon={Leaf} color="green" size="xl" />
            <VStack className="flex-1 gap-0">
              <Text size="xs" className="font-medium text-green-700 dark:text-green-400">
                Impacto ambiental evitado
              </Text>
              <Text size="2xl" className="font-bold text-green-900 dark:text-green-100">
                ~{calculateCO2Avoided(energyKwh)} kg{' '}
                <Text size="md" className="font-normal text-green-600 dark:text-green-400">
                  CO₂
                </Text>
              </Text>
            </VStack>
          </View>

          <SessionDetailsCard
            className="mx-7"
            startTime={startTime}
            endTime={endTime}
            energyKwh={energyKwh}
            tariff={tariff}
            location={lastActiveTransaction.chargerId?.address}
            paymentLabel={paymentStatusMap[lastActiveTransaction.paymentStatus]}
          />

          <View className="gap-3 px-7">
            <TintedButton label="Exportar comprovante" icon={Share} onPress={handleExport} />
            <TintedButton label="Fechar" color="red" onPress={handleCloseModal} />
          </View>
        </Page.Scroll>
      </Page>
    </Modal>
  );
};
