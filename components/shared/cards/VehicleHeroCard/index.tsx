import { Text } from '@/components/ui/text';

import { VehicleType } from '@/types/vehicle/vehicle.type';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TintedBadge } from '../../badge/TintedBadge';

interface Props {
  vehicle: VehicleType;
  onEditPress: () => void;
}

export function VehicleHeroCard({ vehicle, onEditPress }: Props) {
  const { brand, model, plate, batteryPct, rangeKm, connector, lastSessionDate, lastSessionKwh } =
    vehicle;
  return (
    <Animated.View entering={FadeInDown.delay(80).springify().damping(18)}>
      <View
        className="overflow-hidden rounded-[20px]"
        style={{
          backgroundColor: '#111110',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          elevation: 12,
        }}
      >
        <View
          className="b absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-primary-600"
          pointerEvents="none"
        />
        <BlurView
          intensity={80}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
          className="overflow-hidden"
        />

        <View className="p-4">
          <View className="mb-4 flex-row items-start justify-between">
            <View>
              <TintedBadge
                label="Veículo ativo"
                color="blue"
                className="self-start !bg-blue-500/15"
                animated
              />
              <Text
                size="xl"
                className="font-bold text-white"
                style={{
                  letterSpacing: -0.5,
                }}
              >
                {brand} {model}
              </Text>
              <View className="mt-1 self-start rounded border border-neutral-100/20 bg-neutral-100/10 px-2 py-[2px]">
                <Text
                  size="xs"
                  className="font-medium text-white/55"
                  style={{
                    letterSpacing: 1,
                  }}
                >
                  {plate}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={onEditPress}
              className="flex-row items-center gap-[5px] rounded-lg border border-primary-700 bg-primary-800 px-2.5 py-[6px] active:opacity-60"
            >
              <Text size="xs" className="font-medium text-primary-400">
                Editar
              </Text>
            </Pressable>
          </View>

          <View className="flex-row items-end justify-between">
            <View className="flex-row items-end gap-[2px]">
              <Text size="5xl" className="font-extrabold leading-[52px] tracking-[-2px] text-white">
                {batteryPct}
              </Text>
              <Text size="xl" className="mb-2 font-medium tracking-[-1] text-white/50">
                %
              </Text>
            </View>

            <View className="items-end pb-1.5">
              <Text size="lg" className="font-semibold tracking-[-0.5px] text-white">
                {rangeKm} km
              </Text>
              <Text size="sm" className="mt-0.5 text-white/40">
                autonomia restante
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
