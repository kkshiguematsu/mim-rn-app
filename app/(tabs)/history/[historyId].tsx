import { Page } from '@/components/layout/page';
import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { TintedButton } from '@/components/shared/buttons/TintedButton';
import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { SessionDetailsCard } from '@/components/shared/cards/SessionDetailsCard';
import { SessionHeroCard } from '@/components/shared/cards/SessionHeroCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Grid, GridItem } from '@/components/ui/grid';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useSessionStore } from '@/hooks/store/session/useSession';
import { END_REASON_BADGE } from '@/types/history/Session.type';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatDuration, formatTimeToHM } from '@/utils/formatTime';
import { calculateCO2Avoided } from '@/utils/Statistics.utils';
import { Car, Clock, DollarSign, Leaf, Share, Zap } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const SessionDetailPage = () => {
  const { selectedSession } = useSessionStore();

  if (!selectedSession) return;

  const bagdeEndReason = END_REASON_BADGE[selectedSession.endReason];

  const handleExport = () => {};

  return (
    <Page.Scroll className="gap-5">
      <DefaultCard>
        <View className="flex-row items-center gap-3">
          <TintedIcon icon={Zap} color="green" size="lg" />

          <VStack className="flex-1 gap-0">
            <Text
              size="md"
              className="font-semibold text-neutral-900 dark:text-neutral-100"
              numberOfLines={1}
            >
              {selectedSession.location.address}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {formatDateToDMY(selectedSession.date)} · {formatTimeToHM(selectedSession.date)}
            </Text>
            <Text size="sm" className="text-neutral-400">
              {selectedSession.location.city}
            </Text>
          </VStack>

          <TintedBadge
            label={bagdeEndReason.label}
            icon={bagdeEndReason.icon}
            color={bagdeEndReason.color}
            size="xs"
          />
        </View>
      </DefaultCard>

      <SessionHeroCard data={selectedSession} />

      <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard title="Energia" icon={Zap} color="green">
            <VStack className="gap-0">
              <Text size="2xl" className="font-bold">
                {selectedSession.energyKwh.toFixed(1)}{' '}
                <Text size="md" className="font-normal text-neutral-400/90">
                  kWh
                </Text>
              </Text>
              <Text size="xs" className="text-neutral-400">
                Potência máx {selectedSession.maxPowerKw} kW
              </Text>
            </VStack>
          </StatusCard>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard title="Custo total" icon={DollarSign} color="amber">
            <VStack className="gap-0">
              <Text size="2xl" className="font-bold" style={{ fontSize: 20 }}>
                R$ {selectedSession.price.value.toFixed(2)}
              </Text>
              <Text size="xs" className="text-neutral-400">
                R$ {selectedSession.price.perKwh.toFixed(2)} por kWh
              </Text>
            </VStack>
          </StatusCard>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard title="Duração" icon={Clock} color="blue">
            <VStack className="gap-0">
              <Text size="2xl" className="font-bold">
                {formatDuration(selectedSession.duration)}{' '}
              </Text>
              <Text size="xs" className="text-neutral-400">
                14h32 → 15h44
              </Text>
            </VStack>
          </StatusCard>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-1' }}>
          <StatusCard title="Veículo" icon={Car} color="violet">
            <VStack className="gap-0">
              <Text size="2xl" className="font-bold" style={{ fontSize: 16, letterSpacing: -0.3 }}>
                {selectedSession.car.model.replace('Tesla ', '')}
              </Text>
              <Text size="xs" className="text-neutral-400">
                {selectedSession.car.licensePlate}
              </Text>
            </VStack>
          </StatusCard>
        </GridItem>
      </Grid>

      <SessionDetailsCard
        startTime="14:23"
        endTime="15:51"
        energyKwh={selectedSession.energyKwh}
        tariff={0.63}
        location="Shopping Iguatemi · Vaga 42"
        locationSub="Rua Exemplo, 123"
        paymentLabel="Visa •••• 4321"
      />

      <View className="flex-row items-center gap-3 rounded-2xl bg-green-50 p-5 dark:bg-green-950">
        <TintedIcon icon={Leaf} color="green" size="xl" />

        <VStack className="flex-1 gap-0">
          <Text size="xs" className="font-medium text-green-700 dark:text-green-400">
            Impacto ambiental
          </Text>
          <Text size="2xl" className="font-bold text-green-900 dark:text-green-100">
            ~{calculateCO2Avoided(selectedSession.energyKwh)} kg{' '}
            <Text size="md" className="font-normal text-green-600 dark:text-green-400">
              CO₂
            </Text>
          </Text>
        </VStack>
      </View>

      <TintedButton label="Exportar comprovante" icon={Share} onPress={handleExport} />
    </Page.Scroll>
  );
};

export default SessionDetailPage;
