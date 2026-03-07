import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const PingDot = ({ color }: { color: string }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    const animation = withRepeat(
      withSequence(
        withTiming(2.2, { duration: 900, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 0 }),
        withDelay(400, withTiming(1, { duration: 0 }))
      ),
      -1,
      false
    );

    const opacityAnimation = withRepeat(
      withSequence(
        withTiming(0, { duration: 900, easing: Easing.out(Easing.ease) }),
        withTiming(0.8, { duration: 0 }),
        withDelay(400, withTiming(0.8, { duration: 0 }))
      ),
      -1,
      false
    );

    scale.value = animation;
    opacity.value = opacityAnimation;
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          inset: 0,
          borderRadius: 99,
          borderWidth: 1.5,
          borderColor: color,
        },
        animStyle,
      ]}
    />
  );
};
