import { Text } from '@/components/ui/text';
import React from 'react';

import { useTheme } from '@/context/themeContext';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
interface Props {
  preset: number;
  unit?: string;
  isActive: boolean;
  onPress: () => void;
}
export const PresetButton = ({ preset, unit, isActive, onPress }: Props) => {
  const { isDark } = useTheme();
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isActive ? '#22c55e' : isDark ? '#404040' : '#e5e5e5', {
      duration: 200,
    }),
  }));

  return (
    <Animated.View
      style={[animatedStyle, bgStyle]}
      className="flex-1 items-center rounded-lg py-2 shadow-sm shadow-neutral-400/60"
    >
      <Pressable onPress={onPress} onPressIn={pressInScale} onPressOut={pressOutScale}>
        <Text
          size="md"
          className={`font-semibold ${isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-100'}`}
        >
          {preset} {unit}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
