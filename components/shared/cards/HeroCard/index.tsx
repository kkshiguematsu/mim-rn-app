import { GridTexture } from '@/components/layout/background/GridTexture';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { BatteryBar } from '../../bar/BaterryBar';
import { DefaultCard } from '../DefaultCard';

const SEGMENTS = 10;

interface HeroCardProps {
  model: string;
  plate: string;
  connector: string;
  batteryPct: number;
  rangeKm: number;
  maxPowerKw: number;
  minsToFull: number;
  bestPricePerKwh: number;
  currency?: string;
}

export const heroCardMock: HeroCardProps = {
  model: 'Tesla Model 3',
  plate: 'ABC-1D23',
  connector: 'CCS2',
  batteryPct: 78,
  rangeKm: 245,
  maxPowerKw: 150,
  minsToFull: 38,
  bestPricePerKwh: 0.63,
  currency: 'R$',
};

export const HeroCard = ({
  model,
  plate,
  connector,
  batteryPct,
  rangeKm,
  maxPowerKw,
  minsToFull,
  bestPricePerKwh,
  currency = 'R$',
}: HeroCardProps) => {
  const filledSegments = Math.round((batteryPct / 100) * SEGMENTS);

  return (
    <DefaultCard
      size="lg"
      className="overflow-hidden rounded-2xl bg-primary-800 dark:bg-primary-700"
    >
      <GridTexture width={500} height={200} />

      <View className="gap-4">
        <View className="flex-row items-start justify-between">
          <View className="gap-1">
            <Text className="font-bold text-white" size="xl">
              {model}
            </Text>
            <View className="self-start rounded border border-neutral-400/50 bg-neutral-400/20 px-2 py-0.5">
              <Text className="font-medium text-neutral-400" size="xs">
                {plate}
              </Text>
            </View>
          </View>

          <View className="rounded-full border border-green-400/50 bg-green-400/20 px-3 py-1">
            <Text className="text-xs font-semibold text-green-400">{connector}</Text>
          </View>
        </View>

        <View className="flex-row items-end justify-between">
          <View className="flex-row items-end gap-1">
            <Text className="font-black text-white" size="6xl">
              {batteryPct}
              <Text className="font-medium text-neutral-400" size="2xl">
                %
              </Text>
            </Text>
          </View>

          <View className="items-end gap-0.5 pb-1">
            <Text className="font-semibold text-white" size="lg">
              {rangeKm} km
            </Text>
            <Text size="xs" className="text-neutral-400">
              autonomia restante
            </Text>
          </View>
        </View>

        <BatteryBar batteryPct={batteryPct} />
      </View>
    </DefaultCard>
  );
};
