import { Page } from '@/components/layout/page';
import { HistorySectionWidget } from '@/components/widget/HistorySectionWidget';
import { useCharging } from '@/context/ChargingContext';
import { BellOff, BellRing, Clock, CreditCard, Square, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { ArcBatteryCard } from '@/components/shared/cards/ArcBatteryCard';
import { ChargeLimitCard } from '@/components/shared/cards/ChargeLimitsCard';
import { SessionDetailsCard } from '@/components/shared/cards/SessionDetailsCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { Grid, GridItem } from '@/components/ui/grid';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useBellAnimation } from '@/hooks/animations/useBellAnimation';
import { formatTimeToMinutes } from '@/utils/formatTime';
import Animated from 'react-native-reanimated';

function StopButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center gap-2 rounded-[20px] bg-[rgba(255,59,48,0.10)] py-4"
      style={({ pressed }) => pressed && { opacity: 0.7 }}
    >
      <Icon as={Square} size="sm" className="text-[#ff3b30]" />
      <Text className="text-[16px] font-semibold text-[#ff3b30]">Encerrar sessão</Text>
    </Pressable>
  );
}

export default function ChargingMonitorPage() {
  const [notifyOnComplete, setNotifyOnComplete] = useState(false);

  const { activeSession, updateSession, stopCharging } = useCharging();
  const { animatedStyle, ring, unring } = useBellAnimation();

  if (!activeSession) return null;

  const batteryLevel = activeSession?.batteryLevel;
  const timeRemaining = activeSession?.time?.remaining;

  const powerKw = 7.4;
  const energyKwh = 12.4;
  const costBrl = 12.5;
  const rangeKm = 85;

  useEffect(() => {
    if (!activeSession) return;
    const id = setInterval(() => {
      updateSession({
        batteryLevel: activeSession.batteryLevel + 1,
        time: {
          remaining: activeSession.time.remaining - 1,
          elapsed: (activeSession.time.elapsed ?? 0) + 1,
        },
      });
    }, 3000);
    return () => clearInterval(id);
  }, [activeSession]);

  const handleStop = () =>
    Alert.alert('Parar Carregamento', 'Deseja finalizar o carregamento agora?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Parar', style: 'destructive', onPress: stopCharging },
    ]);

  const setChargeLimit = (limit: number) => {
    updateSession({ chargeLimit: limit });
  };

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
            </View>
            <View className="items-end gap-1.5">
              <Pressable
                onPress={handleToggleNotification}
                className={`items-center justify-center rounded-full p-2.5 ${
                  notifyOnComplete
                    ? 'bg-primary-100 dark:bg-primary-900/30'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                <Animated.View style={animatedStyle}>
                  <Icon
                    as={notifyOnComplete ? BellRing : BellOff}
                    size="lg"
                    className={notifyOnComplete ? 'text-primary-500' : 'text-neutral-400'}
                  />
                </Animated.View>
              </Pressable>
              <Text size="xs" className="text-neutral-400">
                {activeSession.connector.id} · {activeSession.connector.name}
              </Text>
            </View>
          </View>
        }
      />

      <ArcBatteryCard
        batteryLevel={batteryLevel}
        stationName={activeSession.stationName}
        stationAddress={activeSession.location}
        connectorLabel={`${activeSession.connector.name} - ${activeSession.connector.type}`}
        powerKw={powerKw}
        energyAddedKwh={energyKwh}
        costBrl={costBrl}
        timeRemainingMin={timeRemaining}
      />

      <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard
            title="Tempo Restante"
            content={formatTimeToMinutes(timeRemaining)}
            unit="min"
            icon={Clock}
            color="blue"
          />
        </GridItem>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard
            title="Tempo Decorrido"
            content={formatTimeToMinutes(activeSession.time?.elapsed)}
            unit="min"
            icon={Clock}
            color="violet"
          />
        </GridItem>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard
            title="Autonomia"
            content={`+${Math.round(rangeKm)}`}
            unit="km"
            icon={Zap}
            color="green"
          />
        </GridItem>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard title="Custo por kWh" content="R$ 0,63" icon={CreditCard} color="amber" />
        </GridItem>
      </Grid>

      <ChargeLimitCard limit={activeSession.chargeLimit} onLimitChange={setChargeLimit} />

      <SessionDetailsCard
        startTime="14:23"
        endTime="15:51"
        energyKwh={energyKwh}
        tariff={0.63}
        location="Shopping Iguatemi · Vaga 42"
        locationSub="Rua Exemplo, 123"
        paymentLabel="Visa •••• 4321"
      />

      {/* ── 6. Stop button ── */}
      <View className="">
        <StopButton onPress={handleStop} />
      </View>

      {/* ── 7. History ── */}
      <HistorySectionWidget />

      <View style={{ height: 8 }} />
    </Page.Scroll>
  );
}
