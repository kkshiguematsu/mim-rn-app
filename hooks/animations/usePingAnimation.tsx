import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(maxScale, { duration, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 0 }),
        withTiming(1, { duration: pause })
      ),
      -1,
      false
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration, easing: Easing.out(Easing.ease) }),
        withTiming(0.5, { duration: 0 }),
        withTiming(0.5, { duration: pause })
      ),
      -1,
      false
    );
  }, []);

  const pingAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { pingAnimationStyle };
};
