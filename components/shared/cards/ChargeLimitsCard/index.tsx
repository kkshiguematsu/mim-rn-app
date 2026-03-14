import { Text } from '@/components/ui/text';
import React from 'react';

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { DefaultCard } from '../DefaultCard';

const CHARGE_LIMIT_PRESETS = [60, 80, 90, 100] as const;
const DEFAULT_LIMIT = 100;

interface ChargeLimitCardProps {
  limit: number;
  onLimitChange: (value: number) => void;
}

export const ChargeLimitCard = ({ limit, onLimitChange }: ChargeLimitCardProps) => {
  const nativeGesture = Gesture.Native();

  return (
    <DefaultCard>
      <View className="mb-4 flex-row items-center justify-between">
        <Text size="lg" className="font-semibold">
          Limite de carga
        </Text>
        <Text size="lg" className="font-bold text-green-500">
          {limit} %
        </Text>
      </View>

      <GestureDetector gesture={nativeGesture}>
        <View>
          <Slider
            value={limit}
            defaultValue={100}
            size="lg"
            step={10}
            orientation="horizontal"
            maxValue={100}
            onChange={onLimitChange}
          >
            <SliderTrack>
              <SliderFilledTrack className="bg-green-500 data-[active=true]:bg-green-500 data-[focus=true]:bg-green-500" />
            </SliderTrack>
            <SliderThumb className="bg-green-500 data-[active=true]:bg-green-500 data-[focus=true]:bg-green-500" />
          </Slider>
        </View>
      </GestureDetector>

      <View className="mt-4 flex-row gap-2">
        {CHARGE_LIMIT_PRESETS.map((preset) => {
          const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

          return (
            <Animated.View
              key={preset}
              style={animatedStyle}
              className={`flex-1 items-center rounded-lg py-2 shadow-sm shadow-neutral-400/60 ${limit === preset ? 'bg-green-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            >
              <Pressable
                onPress={() => onLimitChange(preset)}
                onPressIn={pressInScale}
                onPressOut={pressOutScale}
              >
                <Text
                  size="md"
                  className={`font-semibold ${limit === preset ? 'text-white' : 'text-neutral-500 dark:text-neutral-100'}`}
                >
                  {preset}%
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      <Text className="mt-3 text-xs leading-relaxed text-neutral-400">
        Parar automaticamente em {limit}% preserva a saúde da bateria a longo prazo.
      </Text>
    </DefaultCard>
  );
};
