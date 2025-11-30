import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useRotation = () => {
  const rotation = useSharedValue(0);

  const animateRotation = () => {
    rotation.value = withTiming(rotation.value + 180, {
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
