import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const usePressableScale = () => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressInScale = () => {
    scale.value = withSpring(0.95);
  };

  const pressOutScale = () => {
    scale.value = withSpring(1);
  };

  return {
    animatedStyle,
    pressInScale,
    pressOutScale,
  };
};
