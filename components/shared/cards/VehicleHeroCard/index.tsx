import { Text } from '@/components/ui/text';

import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { Vehicle } from '@/types/vehicle/vehicle.type';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TintedBadge } from '../../badge/TintedBadge';

interface Props {
  vehicle: Vehicle;
  onEditPress: () => void;
}

export function VehicleHeroCard({ vehicle, onEditPress }: Props) {
  const animationFadeIn = useFadeInAnimation({
    direction: 'up',
    duration: 300,
  });

  return (
    <Animated.View entering={animationFadeIn}>
      <View className="overflow-hidden rounded-3xl bg-neutral-900 dark:bg-neutral-800">
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
            <View className="gap-2">
              <TintedBadge
                label="Veículo ativo"
                color="blue"
                className="self-start !bg-blue-500/15"
                animated
              />
              <View>
                <Text
                  size="xl"
                  className="font-bold text-white"
                  style={{
                    letterSpacing: -0.5,
                  }}
                >
                  {vehicle.catalogId.brand} {vehicle.catalogId.model}
                </Text>
                <View className="mt-1 self-start rounded border border-neutral-100/20 bg-neutral-100/10 px-2 py-[2px]">
                  <Text
                    size="xs"
                    className="font-medium text-white/55"
                    style={{
                      letterSpacing: 1,
                    }}
                  >
                    {vehicle.licensePlate}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={onEditPress}
              className="flex-row items-center gap-[5px] rounded-lg border border-primary-400 bg-primary-600 px-2.5 py-[6px] active:opacity-60"
            >
              <Text size="xs" className="font-medium text-primary-200">
                Editar
              </Text>
            </Pressable>
          </View>

          <View className="flex-row items-end justify-between">
            <View className="flex-row items-start gap-4">
              {vehicle.catalogId.connectors.map((connector, index) => (
                <TintedBadge key={index} label={connector.type as string} color="secondary" />
              ))}
            </View>

            <View className="items-end pb-1.5">
              <Text size="lg" className="font-semibold tracking-[-0.5px] text-white">
                {vehicle.catalogId.batteryCapacityKwh} kwH
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
