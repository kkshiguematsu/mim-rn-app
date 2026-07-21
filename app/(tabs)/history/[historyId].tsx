import { Page } from '@/components/layout/page';
import { TintedButton } from '@/components/shared/buttons/TintedButton';
import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { SessionDetailsCard } from '@/components/shared/cards/SessionDetailsCard';
import { SessionHeroCard } from '@/components/shared/cards/SessionHeroCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Grid, GridItem } from '@/components/ui/grid';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSessionStore } from '@/hooks/store/useSessionStore';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatDuration, formatTimeToHM } from '@/utils/formatTime';
import { paymentStatusMap } from '@/utils/paymentCard';
import { calculateCO2Avoided } from '@/utils/Statistics.utils';
import { calculateDuration, calculateEnergyConsumed } from '@/utils/transaction.utils';
import { Car, Clock, DollarSign, Leaf, Share, Zap } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const SessionDetailPage = () => {
  const { selectedSession } = useSessionStore();

  if (!selectedSession) return;

  const dateFormatted = formatDateToDMY(new Date(selectedSession.startedAt).getTime());
  const startTime = formatTimeToHM(new Date(selectedSession.startedAt).getTime());
  const endTime = selectedSession.stoppedAt
    ? formatTimeToHM(new Date(selectedSession.stoppedAt).getTime())
    : undefined;

  const durationMs = calculateDuration(selectedSession.startedAt, selectedSession.stoppedAt);
  const duration = Math.floor(durationMs / 1000); // ms → s antes de formatar

  const kwhConsumed = calculateEnergyConsumed(
    selectedSession.meterStop,
    selectedSession.meterStart
  );
  // const vehicle = findVehicleByPlate(
  //   selectedSession.userId?.vehicles,
  //   selectedSession.vehiclePlate
  // );

  // const bagdeEndReason = END_REASON_BADGE[selectedSession.endReason];

  const handleExport = () => {};

  return (
    <Page.Scroll className="gap-5" needsPadding={false} needsSafeArea={false} hasHeader={false}>
      <Page.Header title="Detalhes da Recarga" hasBackButton />

      <DefaultCard className="mx-7">
        <View className="flex-row items-center gap-3">
          <TintedIcon icon={Zap} color="green" size="lg" />

          <VStack className="flex-1 gap-0">
            <Text
              size="md"
              className="font-semibold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {selectedSession.chargerId.address?.street}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {dateFormatted} · {startTime}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {selectedSession.chargerId.address?.city}
            </Text>
          </VStack>

          {/* <TintedBadge
            label={bagdeEndReason.label}
            icon={bagdeEndReason.icon}
            color={bagdeEndReason.color}
            size="xs"
          /> */}
        </View>
      </DefaultCard>

      <SessionHeroCard data={selectedSession} />

      <View className="mx-7">
        <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
          <GridItem _extra={{ className: 'col-span-1' }}>
            <StatusCard title="Energia" icon={Zap} color="green">
              <VStack className="gap-0">
                <Text size="2xl" className="font-bold">
                  {kwhConsumed.toFixed(1)}{' '}
                  <Text size="md" className="font-normal text-neutral-400/90">
                    kWh
                  </Text>
                </Text>
                {/* <Text size="xs" className="text-neutral-400">
                Potência máx {selectedSession.maxPowerKw} kW
              </Text> */}
              </VStack>
            </StatusCard>
          </GridItem>

          <GridItem _extra={{ className: 'col-span-1' }}>
            <StatusCard title="Custo total" icon={DollarSign} color="amber">
              <VStack className="gap-0">
                <Text size="2xl" className="font-bold" style={{ fontSize: 20 }}>
                  R$ {selectedSession.totalCost?.toFixed(2)}
                </Text>
                {/* <Text size="xs" className="text-neutral-400">
                R$ {selectedSession.price.perKwh.toFixed(2)} por kWh
              </Text> */}
              </VStack>
            </StatusCard>
          </GridItem>

          <GridItem _extra={{ className: 'col-span-1' }}>
            <StatusCard title="Duração" icon={Clock} color="blue">
              <VStack className="gap-0">
                <Text size="2xl" className="font-bold">
                  {formatDuration(duration)}
                </Text>
                <Text size="xs" className="text-neutral-400">
                  {startTime} → {endTime}
                </Text>
              </VStack>
            </StatusCard>
          </GridItem>

          <GridItem _extra={{ className: 'col-span-1' }}>
            <StatusCard title="Veículo" icon={Car} color="violet">
              <VStack className="gap-0">
                {/* <Text
                  size="2xl"
                  className="font-bold"
                  style={{ fontSize: 16, letterSpacing: -0.3 }}
                >
                  {vehicle?.vehicleId.model}
                </Text>
                <Text size="xs" className="text-neutral-400">
                  {vehicle?.licensePlate}
                </Text> */}
              </VStack>
            </StatusCard>
          </GridItem>
        </Grid>
      </View>

      <SessionDetailsCard
        className="mx-7"
        startTime={startTime}
        endTime={endTime}
        energyKwh={kwhConsumed}
        tariff={selectedSession.chargerId.pricePerKwh}
        location={selectedSession.chargerId.address}
        paymentLabel={paymentStatusMap[selectedSession.paymentStatus]}
      />

      <View className="mx-7 flex-row items-center gap-3 rounded-2xl bg-green-50 p-5 dark:bg-green-950">
        <TintedIcon icon={Leaf} color="green" size="xl" />

        <VStack className="flex-1 gap-0">
          <Text size="xs" className="font-medium text-green-700 dark:text-green-400">
            Impacto ambiental
          </Text>
          <Text size="2xl" className="font-bold text-green-900 dark:text-green-100">
            ~{calculateCO2Avoided(kwhConsumed)} kg{' '}
            <Text size="md" className="font-normal text-green-600 dark:text-green-400">
              CO₂
            </Text>
          </Text>
        </VStack>
      </View>

      <TintedButton
        label="Exportar comprovante"
        icon={Share}
        onPress={handleExport}
        className="mx-7"
      />
    </Page.Scroll>
  );
};

export default SessionDetailPage;
