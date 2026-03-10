import { useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface UsePingAnimationOptions {
  maxScale?: number;
  duration?: number;
  pause?: number;
}

export const usePingAnimation = ({
  maxScale = 1.9,
  duration = 1800,
  pause = 600,
}: UsePingAnimationOptions = {}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withDelay(pause, withTiming(1, { duration, easing: Easing.out(Easing.ease) })),
      -1,
      false
    );
  }, []);

  const pingAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, maxScale]) }],
    opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
  }));

  return { pingAnimationStyle };
};
