import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useRotation = (degree: number) => {
  const rotation = useSharedValue(0);

  const animateRotation = () => {
    rotation.value = withTiming(rotation.value === degree ? 0 : degree, {
      duration: 500,
    });
  };

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return {
    animateRotation,
    animationStyle,
  };
};
