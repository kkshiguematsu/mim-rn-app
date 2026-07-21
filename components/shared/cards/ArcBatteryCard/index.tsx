import { Text } from '@/components/ui/text';
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { formatTimeToMinutes } from '@/utils/formatTime';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { TintedBadge } from '../../badge/TintedBadge';
import { DefaultCard } from '../DefaultCard';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const FULL_BATTERY = 100;
const ARC_RADIUS = 80;
const ARC_CENTER = 100;
const ARC_STROKE_WIDTH = 12;
// Half-circle path: left (20,100) → right (180,100) clockwise
const ARC_PATH = `M 20,100 A ${ARC_RADIUS},${ARC_RADIUS} 0 0 1 180,100`;
// Circumference of a half circle ≈ π * r
const ARC_CIRCUMFERENCE = Math.PI * ARC_RADIUS; // ≈ 251.3

interface ArcBatteryCardProps {
  batteryLevel: number;
  stationName: string;
  stationAddress: string;
  connectorLabel: string;
  powerKw: number;
  energyAddedKwh: number;
  costPerKwh: number;
  timeRemainingMin: number;
}
export const ArcBatteryCard = ({
  batteryLevel,
  stationName,
  stationAddress,
  connectorLabel,
  powerKw,
  energyAddedKwh,
  costPerKwh,
  timeRemainingMin,
}: ArcBatteryCardProps) => {
  const filledLength = (batteryLevel / FULL_BATTERY) * ARC_CIRCUMFERENCE;
  const targetOffset = batteryLevel >= FULL_BATTERY ? 0 : ARC_CIRCUMFERENCE - filledLength;

  const dashOffset = useSharedValue(ARC_CIRCUMFERENCE);

  useEffect(() => {
    dashOffset.value = withDelay(
      300,
      withTiming(targetOffset, {
        duration: 1200,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [batteryLevel]);

  const animatedArcProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  return (
    <DefaultCard className=" ">
      <View className="mb-5 flex-row items-start justify-between">
        <View className="flex-1">
          <Text size="xl" className="font-bold tracking-tight text-black dark:text-white">
            {stationName}
          </Text>
          <Text size="sm" className="text-neutral-500 dark:text-neutral-400">
            {stationAddress}
          </Text>
        </View>
        <TintedBadge label={connectorLabel} color="green" />
      </View>

      <View className="mb-5 items-center">
        <View
          style={{
            width: 200,
            height: 110,
            overflow: 'hidden',
          }}
        >
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <Defs>
              <LinearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#30d158" />
                <Stop offset="100%" stopColor="#34c759" />
              </LinearGradient>
            </Defs>
            <Path
              d={ARC_PATH}
              fill="none"
              stroke="rgba(120,120,128,0.16)"
              strokeWidth={ARC_STROKE_WIDTH}
              strokeLinecap="round"
            />
            <AnimatedPath
              d={ARC_PATH}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth={ARC_STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={ARC_CIRCUMFERENCE}
              animatedProps={animatedArcProps}
            />
          </Svg>

          <View
            style={{
              position: 'absolute',
              bottom: 4,
              left: 0,
              right: 0,
            }}
            className="items-center"
          >
            <Heading size="4xl" className="text-black dark:text-white">
              {batteryLevel.toFixed(0)}
              <Text size="xl" className="text-neutral-400 dark:text-neutral-400">
                %
              </Text>
            </Heading>
          </View>
        </View>

        <View className="mt-1.5 flex-row items-center gap-1.5">
          <Text className="text-[15px] font-semibold text-[#34c759]">
            ~{formatTimeToMinutes(timeRemainingMin)} min restantes
          </Text>
          <Text className="text-sm text-neutral-400">para 100%</Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        {[
          {
            label: 'Potência',
            value: `${powerKw.toFixed(1)} kW`,
          },
          {
            label: 'Adicionado',
            value: `${energyAddedKwh.toFixed(1)} kWh`,
          },
          {
            label: 'Custo kWh',
            value: `R$ ${costPerKwh.toFixed(2)}`,
          },
        ].map(({ label, value }) => (
          <View
            key={label}
            className="flex-1 items-center rounded-2xl bg-neutral-200 py-3 dark:bg-neutral-700"
          >
            <Text size="md" className="font-bold tracking-tight">
              {value}
            </Text>
            <Text size="sm" className="text-neutral-500 dark:text-neutral-100">
              {label}
            </Text>
          </View>
        ))}
      </View>
    </DefaultCard>
  );
};
