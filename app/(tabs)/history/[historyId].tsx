import { Page } from '@/components/layout/page';
import { GradientCard } from '@/components/shared/cards/GradientCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { Card } from '@/components/ui/card';
import { Grid, GridItem } from '@/components/ui/grid';
import { Icon } from '@/components/ui/icon';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { Text } from '@/components/ui/text';
import { useSelectedSession } from '@/hooks/store/session/useSession';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatTimeToHM } from '@/utils/formatTime';
import { Car, ChevronRight, Clock, Gauge, MapPin, Wallet } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

const SessionDetailPage = () => {
  const selectedSession = useSelectedSession();

  if (!selectedSession) return;

  return (
    <Page.Scroll className="gap-5">
      <Grid className="gap-4" _extra={{ className: 'grid-cols-4' }}>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <StatusCard
            title="Duração"
            icon={Clock}
            content={formatTimeToHM(selectedSession.duration)}
            color="blue"
          />
        </GridItem>

        <GridItem _extra={{ className: 'col-span-2' }}>
          <StatusCard
            title="Potência máx"
            icon={Gauge}
            content={selectedSession.maxPowerKw.toString()}
            color="purple"
          />
        </GridItem>
      </Grid>

      <Grid className="gap-4" _extra={{ className: 'grid-cols-6' }}>
        <GridItem _extra={{ className: 'col-span-6' }}>
          <GradientCard
            session={selectedSession}
            gradient={{
              color: 'blue',
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            }}
            icon={{
              element: Wallet,
              gradient: {
                color: 'blue',
                start: { x: 0, y: 0 },
                end: { x: 1, y: 1 },
              },
            }}
          />
        </GridItem>
      </Grid>

      <Grid className="gap-4" _extra={{ className: 'grid-cols-6' }}>
        <GridItem _extra={{ className: 'col-span-6' }}>
          <Pressable>
            <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
              <View className="flex-row items-start gap-4">
                <LinearGradient
                  colors={['#ef4444', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="h-12 w-12 items-center justify-center rounded-xl"
                >
                  <MapPin color="white" size={24} />
                </LinearGradient>
                <View className="flex-1">
                  <Text
                    size="xs"
                    className="mb-1 font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    LOCALIZAÇÃO
                  </Text>
                  <Text size="lg" className="font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedSession.location.address}
                  </Text>
                  <Text size="sm" className="text-neutral-500 dark:text-neutral-400">
                    {selectedSession.location.city}
                  </Text>
                </View>
                <Icon as={ChevronRight} size="lg" />
              </View>
            </Card>
          </Pressable>
        </GridItem>
      </Grid>

      <Grid className="gap-4" _extra={{ className: 'grid-cols-6' }}>
        <GridItem _extra={{ className: 'col-span-6' }}>
          <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
            <View className="flex-row items-center gap-4">
              <View className="items-center justify-center rounded-xl border border-neutral-500 bg-neutral-400 p-2 dark:bg-neutral-700">
                <Icon as={Car} className="text-white" size="2xl" />
              </View>
              <View className="flex-1">
                <Text size="xs" className="mb-1 font-medium text-neutral-500 dark:text-neutral-400">
                  VEÍCULO
                </Text>
                <Text className="font-semibold">{selectedSession.car.model}</Text>
              </View>
              <View className="rounded-xl border border-neutral-500 bg-neutral-400 px-4 py-2 dark:bg-neutral-700">
                <Text size="sm" className="font-mono font-bold text-white">
                  {selectedSession.car.licensePlate}
                </Text>
              </View>
            </View>
          </Card>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-3' }}>
          <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
            <Text size="xs" className="mb-2 font-medium text-neutral-500 dark:text-neutral-400">
              DATA
            </Text>
            <Text className="font-semibold">{formatDateToDMY(selectedSession.date)}</Text>
          </Card>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-3' }}>
          <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
            <Text size="xs" className="mb-2 font-medium text-neutral-500 dark:text-neutral-400">
              HORÁRIO
            </Text>
            <Text className="font-semibold">{formatDateToDMY(selectedSession.date)}</Text>
          </Card>
        </GridItem>
      </Grid>
    </Page.Scroll>
  );
};

export default SessionDetailPage;
