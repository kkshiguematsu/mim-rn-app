import { Page } from '@/components/layout/page';
import { BatteryChargedCard } from '@/components/shared/cards/BatteryChargedCard';
import { GradientCard } from '@/components/shared/cards/GradientCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { Card } from '@/components/ui/card';
import { Grid, GridItem } from '@/components/ui/grid';
import { Icon } from '@/components/ui/icon';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { Text } from '@/components/ui/text';
import { HistoryResponse } from '@/types/history/historyResponse';
import { useNavigation } from 'expo-router';
import { Car, ChevronRight, Clock, Gauge, MapPin, Share2, Wallet } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

const formatDuration = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
};

/* ─────────────────────────────────────────────
   Small reusable stat card
───────────────────────────────────────────── */
type StatCardProps = {
  label: string;
  value: string;
  icon: React.ElementType;
  gradientColors: string[];
};

const StatCard = ({ label, value, icon: IconEl, gradientColors }: StatCardProps) => (
  <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="mb-3 h-10 w-10 items-center justify-center rounded-xl"
    >
      <IconEl color="white" size={24} />
    </LinearGradient>
    <Text size="xs" className="mb-1 font-medium text-neutral-500 dark:text-neutral-400">
      {label.toUpperCase()}
    </Text>
    <Text size="lg" className="font-bold text-neutral-900 dark:text-neutral-100">
      {value}
    </Text>
  </Card>
);

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
const HistoryDetailsCard = () => {
  const navigation = useNavigation();

  const session: HistoryResponse = {
    date: Date.now() - 86400000,
    id: 'CHG-2024-001234',
    duration: 7200,
    max_power: '150 kW',
    batteryPercent: 85,
    kwh: 45.8,
    location: {
      city: 'Foz do Iguaçu',
      address: 'Av. das Cataratas, 1234 - Centro',
    },
    price: {
      value: 137.4,
      token: 'R$',
    },
    car: {
      model: 'Tesla Model 3',
      license_plate: 'ABC-1D23',
    },
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable className="w-9 items-center justify-center">
          <Icon as={Share2} size="xl" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <Page.Scroll className="gap-5">
      <BatteryChargedCard session={session} />

      <Grid className="gap-4" _extra={{ className: 'grid-cols-4' }}>
        <GridItem _extra={{ className: 'col-span-2' }}>
          <StatusCard
            title="Duração"
            icon={Clock}
            content={formatDuration(session.duration)}
            color="blue"
          />
        </GridItem>

        <GridItem _extra={{ className: 'col-span-2' }}>
          <StatusCard
            title="Potência máx"
            icon={Gauge}
            content={session.max_power}
            color="purple"
          />
        </GridItem>
      </Grid>

      <Grid className="gap-4" _extra={{ className: 'grid-cols-6' }}>
        <GridItem _extra={{ className: 'col-span-6' }}>
          <GradientCard
            session={session}
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
                    {session.location.address}
                  </Text>
                  <Text size="sm" className="text-neutral-500 dark:text-neutral-400">
                    {session.location.city}
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
                <Text className="font-semibold">{session.car.model}</Text>
              </View>
              <View className="rounded-xl border border-neutral-500 bg-neutral-400 px-4 py-2 dark:bg-neutral-700">
                <Text size="sm" className="font-mono font-bold text-white">
                  {session.car.license_plate}
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
            <Text className="font-semibold">{formatDate(session.date)}</Text>
          </Card>
        </GridItem>

        <GridItem _extra={{ className: 'col-span-3' }}>
          <Card className="rounded-2xl p-4 shadow-sm shadow-neutral-400/60">
            <Text size="xs" className="mb-2 font-medium text-neutral-500 dark:text-neutral-400">
              HORÁRIO
            </Text>
            <Text className="font-semibold">{formatTime(session.date)}</Text>
          </Card>
        </GridItem>
      </Grid>
    </Page.Scroll>
  );
};

export default HistoryDetailsCard;
