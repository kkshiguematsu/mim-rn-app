import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const useBellAnimation = () => {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const ring = () => {
    rotate.value = withSequence(
      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(-10, { duration: 70 }),
      withTiming(10, { duration: 70 }),
      withTiming(-5, { duration: 60 }),
      withTiming(0, { duration: 60 })
    );
    scale.value = withSequence(
      withSpring(1.1, { damping: 12, stiffness: 200 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
  };

  const unring = () => {
    scale.value = withSequence(withTiming(0.85, { duration: 100 }), withSpring(1, { damping: 15 }));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  return { animatedStyle, ring, unring };
};
