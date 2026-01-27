import { Page } from '@/components/shared/Page';
import { BatteryChargedCard } from '@/components/shared/cards/BatteryChargedCard';
import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { GradientCard } from '@/components/shared/cards/GradientCard';
import { PressableCard } from '@/components/shared/cards/PressableCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { contentStyle, titleStyles } from '@/components/shared/cards/StatusCard/styles';
import { Icon } from '@/components/ui/icon';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { Text } from '@/components/ui/text';
import { HistoryResponse } from '@/types/history/historyResponse';
import { useNavigation } from 'expo-router';
import { Car, ChevronRight, Clock, Gauge, MapPin, Share2, Wallet } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable className="w-9 items-center justify-center">
            <Icon as={Share2} size="xl" className="" />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  return (
    <Page componentRender="scrollview" className="gap-2">
      <ScrollView
        className="flex-1"
        contentContainerClassName=" gap-5"
        showsVerticalScrollIndicator={false}
      >
        <BatteryChargedCard session={session} />

        <View className="flex-row flex-wrap gap-4">
          <StatusCard
            title="Duração"
            icon={Clock}
            content={formatDuration(session.duration)}
            color="blue"
          />
          <StatusCard
            title="Potência máx"
            icon={Gauge}
            content={session.max_power}
            color="purple"
          />
        </View>

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

        <PressableCard onPress={() => {}}>
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
              <Text size="xs" className={titleStyles({ class: 'mb-1' })}>
                LOCALIZAÇÃO
              </Text>
              <Text size="lg" className={contentStyle({ class: 'mb-1' })}>
                {session.location.address}
              </Text>
              <Text size="sm">{session.location.city}</Text>
            </View>
            <Icon as={ChevronRight} size="lg" />
          </View>
        </PressableCard>

        <View className="flex-row flex-wrap gap-4">
          <DefaultCard size="full">
            <View className="flex-row items-center gap-4">
              <View className="items-center justify-center rounded-xl border border-neutral-500 bg-neutral-400 p-2 dark:bg-neutral-700">
                <Icon as={Car} className="text-white" size="2xl" />
              </View>
              <View className="flex-1">
                <Text size="xs" className="mb-1">
                  VEÍCULO
                </Text>
                <Text className="font-semibold">{session.car.model}</Text>
              </View>
              <View className="rounded-xl border border-neutral-500 bg-neutral-400 p-2 px-4 py-2 dark:bg-neutral-700">
                <Text size="sm" className="font-mono font-bold text-white">
                  {session.car.license_plate}
                </Text>
              </View>
            </View>
          </DefaultCard>

          <DefaultCard size="md">
            <Text size="xs" className="mb-2">
              DATA
            </Text>
            <Text className="font-semibold">{formatDate(session.date)}</Text>
          </DefaultCard>

          <DefaultCard size="md">
            <Text size="xs" className="mb-2">
              HORÁRIO
            </Text>
            <Text className="font-semibold">{formatTime(session.date)}</Text>
          </DefaultCard>
        </View>
      </ScrollView>
    </Page>
  );
};

export default HistoryDetailsCard;
